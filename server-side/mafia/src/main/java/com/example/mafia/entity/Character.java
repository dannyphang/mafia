package com.example.mafia.entity;

import java.util.Map;

public class Character {
    private String CharacterId;
    private String CharacterName;
    private String CharacterDescription;
    private int CharacterOrder;
    private String CharacterSide;
    private Map<String, Boolean> CharacterAbility;

    public Character() {
    }

    public Character(String characterName, String characterDescription, int characterOrder, String characterSide, Map<String, Boolean> characterAbility) {
        CharacterName = characterName;
        CharacterDescription = characterDescription;
        CharacterOrder = characterOrder;
        CharacterSide = characterSide;
        CharacterAbility = characterAbility;
    }

    public String getCharacterId() {
        return CharacterId;
    }

    public void setCharacterId(String characterId) {
        CharacterId = characterId;
    }

    public String getCharacterName() {
        return CharacterName;
    }

    public void setCharacterName(String characterName) {
        CharacterName = characterName;
    }

    public String getCharacterDescription() {
        return CharacterDescription;
    }

    public void setCharacterDescription(String characterDescription) {
        CharacterDescription = characterDescription;
    }

    public int getCharacterOrder() {
        return CharacterOrder;
    }

    public void setCharacterOrder(int characterOrder) {
        CharacterOrder = characterOrder;
    }

    public String getCharacterSide() {
        return CharacterSide;
    }

    public void setCharacterSide(String characterSide) {
        CharacterSide = characterSide;
    }

    public Map<String, Boolean> getCharacterAbility() {
        return CharacterAbility;
    }

    public void setCharacterAbility(Map<String, Boolean> characterAbility) {
        CharacterAbility = characterAbility;
    }

    @Override
    public String toString() {
        return "Character{" +
                "CharacterId='" + CharacterId + '\'' +
                ", CharacterName='" + CharacterName + '\'' +
                ", CharacterDescription='" + CharacterDescription + '\'' +
                ", CharacterOrder=" + CharacterOrder +
                ", CharacterSide=" + CharacterSide +
                ", CharacterAbility=" + CharacterAbility +
                '}';
    }
}