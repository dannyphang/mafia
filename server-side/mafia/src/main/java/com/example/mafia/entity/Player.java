package com.example.mafia.entity;

public class Player {
    private String PlayerId;
    private String Name;
    private String CharacterId;
    private boolean IsAlive;
    private boolean IsSpeakTurn;
    private double VoteCount;
    private String VotePlayerId;

    public Player() {
    }

    @Override
    public String toString() {
        return "Player{" +
                "PlayerId='" + PlayerId + '\'' +
                ", Name='" + Name + '\'' +
                ", CharacterId='" + CharacterId + '\'' +
                ", IsAlive=" + IsAlive +
                ", IsSpeakTurn=" + IsSpeakTurn +
                ", VoteCount=" + VoteCount +
                ", VotePlayerId='" + VotePlayerId + '\'' +
                '}';
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

    public boolean isSpeakTurn() {
        return IsSpeakTurn;
    }

    public void setSpeakTurn(boolean speakTurn) {
        IsSpeakTurn = speakTurn;
    }

    public double getVoteCount() {
        return VoteCount;
    }

    public void setVoteCount(double voteCount) {
        VoteCount = voteCount;
    }

    public String getVotePlayerId() {
        return VotePlayerId;
    }

    public void setVotePlayerId(String votePlayerId) {
        VotePlayerId = votePlayerId;
    }

    public Player(String playerId, String name, String characterId, boolean isAlive, boolean isSpeakTurn, double voteCount, String votePlayerId) {
        PlayerId = playerId;
        Name = name;
        CharacterId = characterId;
        IsAlive = isAlive;
        IsSpeakTurn = isSpeakTurn;
        VoteCount = voteCount;
        VotePlayerId = votePlayerId;
    }
}
