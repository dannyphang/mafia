package com.example.mafia.service;

import com.example.mafia.entity.Character;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class CharacterService {

    public Character createCharacter(Character character) {
        String uuid = UUID.randomUUID().toString();
        character.setCharacterId(uuid);
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Character").document(uuid).set(character);
        return character;
    }

    public String deleteCharacter(String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Character").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                db.collection("Character").document(id).delete();
            }
            else {
                return "Character not found";
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

        return "Deleted Character with id: " + id;
    }

    public Character updateCharacter(String id, Character character) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Character").document(id).set(character);
        return character;
    }

    public List<Character> getAllCharacters() {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection("Character").get();

        try {
            return future.get().toObjects(Character.class);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        return null;
    }

    public Character getCharacterById(String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Character").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                return document.toObject(Character.class);
            }
            else {
                return null;
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }


}
