package com.projekt.statki.api;

import com.projekt.statki.model.Statek;
import com.projekt.statki.service.StatekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

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

    @GetMapping(path = "{id}")
    public Statek getStatekById(@PathVariable("id") UUID id){
        return statekService.getStatekById(id)
                .orElse(null);

    }
    @DeleteMapping(path = "{id}")
    public void deleteStatekById(@PathVariable("id")UUID id){
        statekService.deleteStatek(id);
    }
    @PutMapping(path = "{id}")
    public  void updateStatek(@PathVariable("id") UUID id, @Validated @NonNull @RequestBody Statek statekToUpdate){
        statekService.updateStatek(id,statekToUpdate);
    }
    //TODO zmiana koloru
//    @PutMapping(path = "{id}")
//    public  void updateStatekColor(@PathVariable("id") UUID id, @Validated @NonNull @RequestBody Statek statekToUpdate){
//        statekService.updateStatekColor(id,statekToUpdate);
//    }

}
