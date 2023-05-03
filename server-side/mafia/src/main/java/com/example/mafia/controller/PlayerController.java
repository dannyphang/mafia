package com.example.mafia.controller;

import com.example.mafia.entity.Player;
import com.example.mafia.service.PlayerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/player")
public class PlayerController {

    @Autowired
    public PlayerService playerService;

    @PostMapping("")
    public Player createNewPlayer(@RequestBody Player player) {
        return playerService.createPlayer(player);
    }

    @GetMapping("/{id}")
    public Player getPlayerById(@PathVariable("id") String id) {
        return playerService.getPlayerById(id);
    }

    @GetMapping("/getPlayerListByRoomId/{id}")
    public List<Player> getPlayerListByRoomId(@PathVariable("id") String id) {
        return playerService.getPlayerListByRoomId(id);
    }

    @DeleteMapping("/{id}")
    public String deletePlayerById(@PathVariable("id") String id) {
        return playerService.deletePlayerById(id);
    }

    @PutMapping("/{id}")
    public Player updatePlayer(@PathVariable("id") String id, @RequestBody Player player) {
        return playerService.updatePlayer(id, player);
    }
}
