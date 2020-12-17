package com.projekt.statki.api;

import com.projekt.statki.model.Statek;
import com.projekt.statki.service.StatekService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

//@RequestMapping("api/v1/statek")
@Controller
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

    @GetMapping("/ships")
    public String home(Model model) {
        model.addAttribute("shipList", statekService.getAllStateks());
        return "ships";
    }

    @GetMapping("/ship-add")
    public String newStatek(Model model) {
        model.addAttribute("ship", new Statek());
        return "ship-add";
    }

    @PostMapping("/ship-add-error")
    public String addStatek(Statek statek, Errors errors) {
        if(errors.hasErrors())
            return "ship-add";
        statekService.addStatek(statek);
        return "redirect:/ships";
    }

    @GetMapping("/ship-delete/{id}")
    public String deleteStatek(@PathVariable("id") UUID id) {
        statekService.deleteStatek(id);
        return "redirect:/ships";
    }

    @GetMapping("/ship-edit/{id}")
    public String newEditedStatek(@PathVariable("id") UUID id, Model model) {
        model.addAttribute("ship", statekService.getStatekById(id));
        return "ship-edit";
    }

    @PostMapping("/ship-edit")
    public String editStatek(Statek statek, Errors errors) {
        if(errors.hasErrors())
            return "ships-edit";
        statekService.updateStatek(statek.getId(),statek);
        return "redirect:/ships";
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
