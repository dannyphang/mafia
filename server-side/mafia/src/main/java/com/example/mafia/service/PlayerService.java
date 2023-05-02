package com.example.mafia.service;

import com.example.mafia.entity.Player;
import com.example.mafia.entity.Room;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Objects;
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
        player.setPlayerId(uuid);
        db.collection("Player").document(uuid).set(player);
        return player;
    }

    public String deletePlayerById(String id) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Player").document(id);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                db.collection("Player").document(id).delete();
                return "Player deleted";
            }
            else {
                return "Player not found";
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
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
                String PlayerId = document.getId();
                String CharacterId = Objects.requireNonNull(document.getData()).get("characterId").toString();
                String Name = document.getData().get("name").toString();
                boolean IsAlive = (boolean) document.getData().get("alive");
                boolean IsSpeakTurn = (boolean) document.getData().get("speakTurn");
                double VoteCount = (double) document.getData().get("voteCount");
                String VotePlayerId = document.getData().get("votePlayerId").toString();
                return new Player(PlayerId, Name, CharacterId, IsAlive, IsSpeakTurn, VoteCount, VotePlayerId);
            }
            else {
                return null;
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public ArrayList<Player> getPlayerListByRoomId(String roomId) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Room").document(roomId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                ArrayList<String> getPlayerLists = Objects.requireNonNull(document.toObject(Room.class)).getPlayerIdList();
                ArrayList<Player> playerList = new ArrayList<>();

                if(getPlayerLists != null) {
                    for(String playerId : getPlayerLists){
                        playerList.add(getPlayerById(playerId));
                    }
                };
                return playerList;
            }
            else {
                return null;
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }
}
