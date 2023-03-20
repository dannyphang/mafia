package com.example.mafia.entity;

import java.util.*;

public class Room {
    private String RoomId;
    private ArrayList<String> PlayerIdList;
    private int RoomSize;

    public Room() {
    }

    public Room(String roomId, ArrayList<String> playerIdList) {
        RoomId = roomId;
        PlayerIdList = playerIdList;
    }

    public String getRoomId() {
        return RoomId;
    }

    public void setRoomId(String roomId) {
        RoomId = roomId;
    }

    public ArrayList<String> getPlayerIdList() {
        return PlayerIdList;
    }

    public void setPlayerIdList(ArrayList<String> playerIdList) {
        PlayerIdList = playerIdList;
    }

    @Override
    public String toString() {
        return "Room{" +
                "RoomId='" + RoomId + '\'' +
                ", PlayerIdList=" + PlayerIdList +
                ", RoomSize=" + RoomSize +
                '}';
    }
}

