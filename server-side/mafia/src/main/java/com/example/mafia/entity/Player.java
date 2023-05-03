package com.example.mafia.entity;

public class Player {
    private String PlayerId;
    private String Name;
    private String CharacterId;
    private boolean IsAlive;
    private boolean IsKilled;
    private boolean IsProtected;

    public Player() {
    }

    public Player(String playerId, String name, String characterId, boolean isAlive, boolean isKilled, boolean isProtected) {
        PlayerId = playerId;
        Name = name;
        CharacterId = characterId;
        IsAlive = isAlive;
        IsKilled = isKilled;
        IsProtected = isProtected;
    }

    public String getPlayerId() {
        return PlayerId;
    }

    public void setPlayerId(String playerId) {
        PlayerId = playerId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getCharacterId() {
        return CharacterId;
    }

    public void setCharacterId(String characterId) {
        CharacterId = characterId;
    }

    public boolean isAlive() {
        return IsAlive;
    }

    public void setAlive(boolean alive) {
        IsAlive = alive;
    }

    public boolean isKilled() {
        return IsKilled;
    }

    public void setKilled(boolean killed) {
        IsKilled = killed;
    }

    public boolean isProtected() {
        return IsProtected;
    }

    public void setProtected(boolean aProtected) {
        IsProtected = aProtected;
    }

    @Override
    public String toString() {
        return "Player{" +
                "PlayerId='" + PlayerId + '\'' +
                ", Name='" + Name + '\'' +
                ", CharacterId='" + CharacterId + '\'' +
                ", IsAlive=" + IsAlive +
                ", IsKilled=" + IsKilled +
                ", IsProtected=" + IsProtected +
                '}';
    }
}
