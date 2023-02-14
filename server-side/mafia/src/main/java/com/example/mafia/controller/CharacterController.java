package com.example.mafia.controller;

import com.example.mafia.service.CharacterService;
import com.example.mafia.entity.Character;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/character")
public class CharacterController {

    @Autowired
    public CharacterService characterService;

    @PostMapping("")
    public Character createCharacter(@RequestBody Character character) {
        return characterService.createCharacter(character);
    }

    @DeleteMapping("/{id}")
    public String deleteCharacter(@PathVariable("id") String id) {
        return characterService.deleteCharacter(id);
    }

    @PutMapping("/{id}")
    public Character updateCharacter(@PathVariable("id") String id, @RequestBody Character character) {
        return characterService.updateCharacter(id, character);
    }

    @GetMapping("")
    public List<Character> getAllCharacters() {
        return characterService.getAllCharacters();
    }

    @GetMapping("/{id}")
    public Character getCharacterById(@PathVariable("id") String id) {
        return characterService.getCharacterById(id);
    }
}
