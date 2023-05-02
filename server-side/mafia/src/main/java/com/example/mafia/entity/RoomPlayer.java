package com.example.mafia.entity;

import java.util.ArrayList;

public class RoomPlayer {
    private String PlayerId;
    private String RoomId;

    public RoomPlayer() {
    }

    public RoomPlayer(String playerId, String roomId) {
        PlayerId = playerId;
        RoomId = roomId;
    }

    public String getPlayerId() {
        return PlayerId;
    }

    public void setPlayerId(String playerId) {
        PlayerId = playerId;
    }

    public String getRoomId() {
        return RoomId;
    }

    public void setRoomId(String roomId) {
        RoomId = roomId;
    }

    @Override
    public String toString() {
        return "RoomPlayer{" +
                "PlayerId='" + PlayerId + '\'' +
                ", RoomId='" + RoomId + '\'' +
                '}';
    }
}
