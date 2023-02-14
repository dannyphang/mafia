package com.example.mafia.entity;

public class Player {
    private String PlayerId;
    private String UserId;
    private String CharacterId;
    private boolean IsAlive;
    private boolean IsSpeakTurn;
    private float VoteCount;
    private String VotePlayerId;

    public Player() {
    }

    public Player(String playerId, String userId, String characterId, boolean isAlive, boolean isSpeakTurn, float voteCount, String votePlayerId) {
        PlayerId = playerId;
        UserId = userId;
        CharacterId = characterId;
        IsAlive = isAlive;
        IsSpeakTurn = isSpeakTurn;
        VoteCount = voteCount;
        VotePlayerId = votePlayerId;
    }

    public String getPlayerId() {
        return PlayerId;
    }

    public void setPlayerId(String playerId) {
        PlayerId = playerId;
    }

    public String getUserId() {
        return UserId;
    }

    public void setUserId(String userId) {
        UserId = userId;
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

    public float getVoteCount() {
        return VoteCount;
    }

    public void setVoteCount(float voteCount) {
        VoteCount = voteCount;
    }

    public String getVotePlayerId() {
        return VotePlayerId;
    }

    public void setVotePlayerId(String votePlayerId) {
        VotePlayerId = votePlayerId;
    }

    @Override
    public String toString() {
        return "Player{" +
                "PlayerId='" + PlayerId + '\'' +
                ", UserId='" + UserId + '\'' +
                ", CharacterId='" + CharacterId + '\'' +
                ", IsAlive=" + IsAlive +
                ", IsSpeakTurn=" + IsSpeakTurn +
                ", VoteCount=" + VoteCount +
                ", VotePlayerId='" + VotePlayerId + '\'' +
                '}';
    }
}
