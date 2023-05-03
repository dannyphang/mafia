package com.example.mafia.service;

import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.storage.*;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AudioService {

    public List<Blob> getAudio(){
        try {
            // Get a reference to the Firebase Storage instance.
            Storage storage = StorageOptions.getDefaultInstance().getService();

            // List all the blobs in the bucket
            List<Blob> blobs = new ArrayList<>();
            Page<Blob> page = storage.list("mafia-9e3cf.appspot.com");
            for (Blob blob : page.iterateAll()) {
                blobs.add(blob);
            }

            // Filter the blobs to only get the ones with the ".mp3" extension
            List<Blob> mp3Files = new ArrayList<>();
            for (Blob blob : blobs) {
                String name = blob.getName();
                if (name.endsWith(".mp3")) {
                    mp3Files.add(blob);
                }
            }

            return mp3Files;
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return null;
        }
    }
}
