package com.projekt.statki.thymeleaf;

import com.projekt.statki.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    private UserRepository userRepository;

    @Autowired
    public void wireUserRepository(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public String home(Model model) {
        model.addAttribute("userList", userRepository.findAll());
        return "users";
    }
}
