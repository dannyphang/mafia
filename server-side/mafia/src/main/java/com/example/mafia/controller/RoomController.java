package com.example.mafia.controller;

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
    public String createNewRoom() {
        return roomService.createNewRoom();
    }

    @PostMapping("/delete/{id}")
    public String deleteRoomById(@PathVariable("id") String roomId) {
        return roomService.deleteRoomById(roomId);
    }

    @GetMapping("/{id}")
    public String getRoomById(@PathVariable("id") String roomId) {
        return roomService.getRoomById(roomId).toString();
    }

//    @PutMapping("/addNewPlayerByIdToRoom/{id}")
//    public String addNewPlayerByIdToRoom(@PathVariable("id") String roomId, @RequestBody String playerId) {
//        return roomService.addNewPlayerByIdToRoom(roomId, playerId);
//    }
//
//    @PutMapping("/removePlayerByIdFromRoom/{id}")
//    public String removePlayerByIdFromRoom(@PathVariable("id") String roomId, @RequestBody String playerId) {
//        return roomService.removePlayerByIdFromRoom(roomId, playerId);
//    }
//
//    @PostMapping("/addNewCharacterToRoom")
//    public String addNewCharacterByIdToRoom(@RequestBody String body) {
//        String[] split = body.split(" ");
//        return roomService.addNewCharacterByIdToRoom(split[0], split[1]);
//    }

}
