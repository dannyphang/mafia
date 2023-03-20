package com.example.mafia.entity;

import java.util.ArrayList;

public class JoinerPlayer {
    private ArrayList<Player> Players;
    private String RoomId;
    private Character Characters;

    public JoinerPlayer() {
    }

    public JoinerPlayer(String roomId, ArrayList<Player> players, Character characters) {
        Players = players;
        RoomId = roomId;
        Characters = characters;
    }

    public JoinerPlayer(String roomId, ArrayList<Player> players) {
        Players = players;
        RoomId = roomId;
    }

    public ArrayList<Player> getPlayers() {
        return Players;
    }

    public void setPlayers(ArrayList<Player> players) {
        Players = players;
    }

    public String getRoomId() {
        return RoomId;
    }

    public void setRoomId(String roomId) {
        RoomId = roomId;
    }

    public Character getCharacters() {
        return Characters;
    }

    public void setCharacters(Character characters) {
        Characters = characters;
    }

    @Override
    public String toString() {
        return "JoinerPlayer{" +
                "Players=" + Players +
                ", RoomId='" + RoomId + '\'' +
                ", Characters=" + Characters +
                '}';
    }
}
