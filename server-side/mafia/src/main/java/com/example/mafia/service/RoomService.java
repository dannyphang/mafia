package com.example.mafia.service;

import com.example.mafia.entity.JoinerPlayer;
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
import java.util.logging.Logger;

@Service
public class RoomService {

    public PlayerService playerService;
    Logger logger = Logger.getLogger(RoomService.class.getName());

    public Room createNewRoom(){
        String id = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Room").document(id).create(new Room(id, new ArrayList<>()));
        return new Room(id, new ArrayList<>());
    }

    public String deleteRoomById(String roomId) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Room").document(roomId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                db.collection("Room").document(roomId).delete();
                return "Deleted Room with id: " + roomId;
            }
            else {
                return "Room not found";
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }

    }

    public JoinerPlayer getRoomById(String roomId) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Room").document(roomId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                return new JoinerPlayer(
                        roomId,
                        getPlayersInRoom(roomId));
            }
            else {
                return new JoinerPlayer(null, null);
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public ArrayList<Player> getPlayersInRoom(String roomId) {
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

//    public String addNewPlayerToRoom(JoinerPlayer player){
//        String roomId = player.getRoomId();
//        String playerId = player.getPlayerId();
//        try {
//            Firestore db = FirestoreClient.getFirestore();
//            DocumentReference docRef = db.collection("Room").document(roomId);
//            ApiFuture<DocumentSnapshot> future = docRef.get();
//            DocumentSnapshot document = future.get();
//
//            if(document.exists()) {
//                db.collection("Room").document(roomId).update("PlayerId", FieldValue.arrayUnion(playerId));
//                return "Player Id " + playerId + " has been added to Room Id with " + roomId + ".";
//            }
//            else {
//                return "Room Id with " + roomId + " is not exist.";
//            }
//        } catch (ExecutionException | InterruptedException e) {
//            throw new RuntimeException(e);
//        }
//    }
//
//    public String removePlayerFromRoom(JoinerPlayer player){
//        String roomId = player.getRoomId();
//        String playerId = player.getPlayerId();
//
//        try {
//            Firestore db = FirestoreClient.getFirestore();
//            DocumentReference docRef = db.collection("Room").document(roomId);
//            ApiFuture<DocumentSnapshot> future = docRef.get();
//            DocumentSnapshot document = future.get();
//
//            if(document.exists()) {
//                db.collection("Room").document(roomId).update("PlayerId", FieldValue.arrayRemove(playerId));
//                return "Player Id " + playerId + " has been removed from Room Id with " + roomId + ".";
//            }
//            else {
//                return "Room Id with " + roomId + " is not exist.";
//            }
//        } catch (ExecutionException | InterruptedException e) {
//            throw new RuntimeException(e);
//        }
//    }

//    public String assignCharacterToPlayer(JoinerPlayer player){
//        String roomId = player.getRoomId();
//        String playerId = player.getPlayerId();
//        String characterId = player.getCharacterId();
//        try {
//            Firestore db = FirestoreClient.getFirestore();
//            DocumentReference docRef = db.collection("Room").document(roomId);
//            ApiFuture<DocumentSnapshot> future = docRef.get();
//            DocumentSnapshot document = future.get();
//
//            if(document.exists()) {
//                db.collection("Room").document(roomId).update("PlayerId", FieldValue.arrayUnion(playerId));
//                return "Player Id " + playerId + " has been added to Room Id with " + roomId + ".";
//            }
//            else {
//                return "Room Id with " + roomId + " is not exist.";
//            }
//        } catch (ExecutionException | InterruptedException e) {
//            throw new RuntimeException(e);
//        }
//    }
}
