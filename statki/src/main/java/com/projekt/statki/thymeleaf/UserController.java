package com.projekt.statki.thymeleaf;

import com.projekt.statki.model.Role;
import com.projekt.statki.repository.UserRepository;
import com.projekt.statki.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class UserController {
    private UserService userService;
    private UserRepository userRepository;

    @Autowired
    public void wireUserRepository(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @GetMapping("/users")
    public String home(Model model) {
        model.addAttribute("roleAttribute", getRole());
        model.addAttribute("userList", userRepository.findAllByOrderByIdAsc());
        return "users";
    }

    @GetMapping("/stats/score")
    public String score(Model model) {
        model.addAttribute("roleAttribute", getRole());
        model.addAttribute("userList", userRepository.findTop5ByOrderByHighScoreDesc());
        return "score";
    }

    @GetMapping("/stats/deaths")
    public String deaths(Model model) {
        model.addAttribute("roleAttribute", getRole());
        model.addAttribute("userList", userRepository.findTop5ByOrderByDeathsCountDesc());
        return "deaths";
    }

    @GetMapping("/stats/playtime")
    public String playtime(Model model) {
        model.addAttribute("roleAttribute", getRole());
        model.addAttribute("userList", userRepository.findTop5ByOrderByPlayTimeDesc());
        return "playtime";
    }

    public String getRole() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Role> roles = (List<Role>) userRepository.findByEmail(userDetails.getUsername()).getRoles();
        String roleAttribute = "user";
        for (Role role : roles) {
            if (role.getName().equals("ROLE_ADMIN"))
                roleAttribute = "admin";
        }
        return roleAttribute;
    }
}
