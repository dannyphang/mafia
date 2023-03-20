package com.example.mafia.controller;

import com.example.mafia.entity.JoinerPlayer;
import com.example.mafia.entity.Room;
import com.example.mafia.service.RoomService;
import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/room")
public class RoomController {
    @Autowired
    public RoomService roomService;

    @PostMapping("")
    public Room createNewRoom() {
        return roomService.createNewRoom();
    }

    @PostMapping("/delete/{id}")
    public String deleteRoomById(@PathVariable("id") String roomId) {
        return roomService.deleteRoomById(roomId);
    }

    @GetMapping("/{id}")
    public JoinerPlayer getRoomById(@PathVariable("id") String roomId) {
        return roomService.getRoomById(roomId);
    }

//    @PutMapping("/addNewPlayerToRoom")
//    public String addNewPlayerToRoom(@RequestBody JoinerPlayer player) {
//        return roomService.addNewPlayerToRoom(player);
//    }
//
//    @PutMapping("/removePlayerFromRoom")
//    public String removePlayerFromRoom(@RequestBody JoinerPlayer player) {
//        return roomService.removePlayerFromRoom(player);
//    }
//
//    @PostMapping("/assignCharacterToPlayer")
//    public String assignCharacterToPlayer(@RequestBody JoinerPlayer player) {
//        return roomService.assignCharacterToPlayer(player);
//    }

}
