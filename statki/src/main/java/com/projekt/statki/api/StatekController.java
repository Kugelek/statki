package com.projekt.statki.api;

import com.projekt.statki.model.Statek;
import com.projekt.statki.service.StatekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("api/v1/statek")
@RestController
public class StatekController {
    private final StatekService statekService;

    @Autowired
    public StatekController(StatekService statekService) {
        this.statekService = statekService;
    }
    @PostMapping
    public void addStatek(@RequestBody Statek statek){
        statekService.addStatek(statek);
    }
    @GetMapping
    public List<Statek> getAllStateks(){
        return statekService.getAllStateks();
    }
}
