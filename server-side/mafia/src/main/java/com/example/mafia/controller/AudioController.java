package com.example.mafia.controller;

import com.example.mafia.service.AudioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/audio")
public class AudioController {

    @Autowired
    private AudioService audioService;

    @GetMapping("/mp3/{fileName}")
    public ResponseEntity<Resource> getMp3(@PathVariable String fileName) throws IOException {
        Resource mp3File = new ClassPathResource("src/main/resources/static/" + fileName);

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + mp3File.getFilename() + "\"")
                .body(mp3File);
    }

}
