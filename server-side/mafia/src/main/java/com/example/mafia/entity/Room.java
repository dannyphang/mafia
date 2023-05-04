package com.example.mafia.entity;

import java.util.*;

public class Room {
    private String RoomId;
    private ArrayList<String> PlayerIdList;
    private boolean IsNightTime;
    private boolean IsDayTime;
    private boolean IsGameStart;
    private boolean IsPreparationTime;
    private int GameTurn;

    public Room() {
    }

    public Room(String roomId, ArrayList<String> playerIdList, boolean isNightTime, boolean isDayTime, boolean isGameStart, boolean isPreparationTime, int gameTurn) {
        RoomId = roomId;
        PlayerIdList = playerIdList;
        IsNightTime = isNightTime;
        IsDayTime = isDayTime;
        IsGameStart = isGameStart;
        IsPreparationTime = isPreparationTime;
        GameTurn = gameTurn;
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

    public boolean isNightTime() {
        return IsNightTime;
    }

    public void setNightTime(boolean nightTime) {
        IsNightTime = nightTime;
    }

    public boolean isDayTime() {
        return IsDayTime;
    }

    public void setDayTime(boolean dayTime) {
        IsDayTime = dayTime;
    }

    public boolean isGameStart() {
        return IsGameStart;
    }

    public void setGameStart(boolean gameStart) {
        IsGameStart = gameStart;
    }

    public boolean isPreparationTime() {
        return IsPreparationTime;
    }

    public void setPreparationTime(boolean preparationTime) {
        IsPreparationTime = preparationTime;
    }

    public int getGameTurn() {
        return GameTurn;
    }

    public void setGameTurn(int gameTurn) {
        GameTurn = gameTurn;
    }

    @Override
    public String toString() {
        return "Room{" +
                "RoomId='" + RoomId + '\'' +
                ", PlayerIdList=" + PlayerIdList +
                ", IsNightTime=" + IsNightTime +
                ", IsDayTime=" + IsDayTime +
                ", IsGameStart=" + IsGameStart +
                ", IsPreparationTime=" + IsPreparationTime +
                ", GameTurn=" + GameTurn +
                '}';
    }
}

