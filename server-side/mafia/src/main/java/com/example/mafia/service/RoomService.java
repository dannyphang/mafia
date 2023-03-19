package com.example.mafia.service;

import com.example.mafia.entity.Character;
import com.example.mafia.entity.Room;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.FieldValue;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

@Service
public class RoomService {

    public String createNewRoom(){
        String id = UUID.randomUUID().toString().replace("-", "").substring(0, 6);
        Firestore db = FirestoreClient.getFirestore();
        db.collection("Room").document(id).create(new Room(id));
        return "New room with id " + id + " has been created.";
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

    public Room getRoomById(String roomId) {
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Room").document(roomId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();
            if(document.exists()) {
                return document.toObject(Room.class);
            }
            else {
                return null;
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public String addNewPlayerByIdToRoom(String roomId, String playerId){
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Room").document(roomId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if(document.exists()) {
                db.collection("Room").document(roomId).update("PlayerId", FieldValue.arrayUnion(playerId));
                return "Player Id " + playerId + " has been added to Room Id with " + roomId + ".";
            }
            else {
                return "Room Id with " + roomId + " is not exist.";
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

    public String removePlayerByIdFromRoom(String roomId, String playerId){
        try {
            Firestore db = FirestoreClient.getFirestore();
            DocumentReference docRef = db.collection("Room").document(roomId);
            ApiFuture<DocumentSnapshot> future = docRef.get();
            DocumentSnapshot document = future.get();

            if(document.exists()) {
                db.collection("Room").document(roomId).update("PlayerId", FieldValue.arrayRemove(playerId));
                return "Player Id " + playerId + " has been removed from Room Id with " + roomId + ".";
            }
            else {
                return "Room Id with " + roomId + " is not exist.";
            }
        } catch (ExecutionException | InterruptedException e) {
            throw new RuntimeException(e);
        }
    }

//    public String assignCharacterToPlayer(String roomId, String playerId, String characterId){
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
