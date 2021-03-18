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
        model.addAttribute("userList", userRepository.findAllByOrderByIdAsc());
        return "users";
    }

    @GetMapping("/stats/score")
    public String score(Model model) {
        model.addAttribute("userList", userRepository.findTop5ByOrderByHighScoreDesc());
        return "score";
    }

    @GetMapping("/stats/deaths")
    public String deaths(Model model) {
        model.addAttribute("userList", userRepository.findTop5ByOrderByDeathsCountDesc());
        return "deaths";
    }

    @GetMapping("/stats/playtime")
    public String playtime(Model model) {
        model.addAttribute("userList", userRepository.findTop5ByOrderByPlayTimeDesc());
        return "playtime";
    }
}
