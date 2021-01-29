package com.projekt.statki.api;

import com.projekt.statki.model.User;
import com.projekt.statki.repository.UserRepository;
import com.projekt.statki.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/User")
@RestController
public class UserRestController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServiceImpl userService;

    @PostMapping
    public void addUser(@RequestBody User user) {
        userRepository.save(user);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping(path = "/{id}")
    public User getUserById(@PathVariable("id") Long id) {
        return userRepository.getUserById(id)
                .orElse(null);

    }
    @Transactional
    @DeleteMapping(path = "{id}")
    public void deleteUserById(@PathVariable("id") Long id) {
        userRepository.deleteUserById(id);
    }

    //    @PatchMapping(path = "{id}")
//    public void updateUser(@PathVariable("id") Long id, @Validated @NonNull @RequestBody Long highScore){
//        User userToFind = userRepository.findById(id).orElseThrow(null);
//        userService.updateScore(userToFind,highScore);
//    }


//    @PatchMapping(path = "{id}")
//    public void updateUser(@PathVariable("id") Long id, @Validated @NonNull @RequestBody User user) {
//
//        User userToFind = userRepository.findById(id).orElseThrow(null);
//        userService.updateScore(userToFind, user.getActualScore());
//    }
@PatchMapping(path = "{mail}")
public void updateUser(@PathVariable("mail") String mail, @Validated @NonNull @RequestBody User user) {

    User userToFind = userRepository.findByEmail(mail);
    userService.updateScore(userToFind, user.getActualScore());
}
}
