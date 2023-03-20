package com.example.mafia.service;

import com.example.mafia.entity.Player;
import com.example.mafia.entity.Room;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class PlayerService {
    Logger logger = Logger.getLogger(PlayerService.class.getName());

    public Player createPlayer(Player player) {
        String uuid = UUID.randomUUID().toString();
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Player").document(uuid).set(player);
        return player;
    }

    public String deletePlayer(String id) {

        return null;
    }

    public Player updatePlayer(String id, Player player) {

        return null;
    }

    public Player getPlayerById(String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Player").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                return document.toObject(Player.class);
            }
            else {
                return null;
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
