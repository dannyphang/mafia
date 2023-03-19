package com.example.mafia.entity;

import java.util.List;

public class Room {
    private String RoomId;
    private List<String> PlayerId;
    private int RoomSize;

    public Room(String roomId) {
        RoomId = roomId;
        PlayerId = null;
    }

    public Room(String roomId, List<String> playerId) {
        RoomId = roomId;
        PlayerId = playerId;
    }

    public String getRoomId() {
        return RoomId;
    }

    public void setRoomId(String roomId) {
        RoomId = roomId;
    }

    public List<String> getPlayerId() {
        return PlayerId;
    }

    public void setPlayerId(List<String> playerId) {
        PlayerId = playerId;
    }

    @Override
    public String toString() {
        return "Room{" +
                "RoomId='" + RoomId + '\'' +
                ", PlayerId=" + PlayerId +
                '}';
    }
}
