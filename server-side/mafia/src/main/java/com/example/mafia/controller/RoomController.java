package com.example.mafia.controller;

import com.example.mafia.entity.RoomPlayer;
import com.example.mafia.entity.Room;
import com.example.mafia.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/room")
@CrossOrigin(origins = "http://localhost:3000")
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
    public Room getRoomById(@PathVariable("id") String roomId) {
        return roomService.getRoomById(roomId);
    }

    @PutMapping("/addPlayerToRoom")
    public String addPlayerToRoom(@RequestBody RoomPlayer rm) {
        return roomService.addNewPlayerToRoom(rm.getRoomId(), rm.getPlayerId());
    }

    @PutMapping("/deletePlayerFromRoom")
    public String deletePlayerFromRoom(@RequestBody RoomPlayer rm) {
        return roomService.deletePlayerFromRoom(rm.getRoomId(), rm.getPlayerId());
    }

    @PutMapping("")
    public Room updateRoom(@RequestBody Room room) {
        return roomService.updateRoom(room);
    }
}
