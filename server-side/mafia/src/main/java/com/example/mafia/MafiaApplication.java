package com.example.mafia;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
public class MafiaApplication {

	public static void main(String[] args) {
		firebaseInit();
		SpringApplication.run(MafiaApplication.class, args);
	}

	private static void firebaseInit() {
		FileInputStream serviceAccount =
				null;
		try {
			serviceAccount = new FileInputStream("src/main/resources/serviceAccountKey.json");
			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(serviceAccount))
					.setProjectId("mafia-9e3cf")
					.setStorageBucket("mafia-9e3cf.appspot.com")
					.build();

			FirebaseApp.initializeApp(options);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

}
