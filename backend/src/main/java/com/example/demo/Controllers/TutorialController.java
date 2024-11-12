package com.example.demo.Controllers;

import com.example.demo.Entities.TutorialCover;
import com.example.demo.Entities.TutorialRequest;
import com.example.demo.Entities.TutorialResponse;
import com.example.demo.Services.TutorialService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/tutorials")
@RequiredArgsConstructor
public class TutorialController {
    private final TutorialService tutorialService;

    @PostMapping("/save")
    public ResponseEntity<Integer> saveTutorial(@Valid @RequestBody TutorialRequest tutorialRequest, Authentication connectedUser) {
        return ResponseEntity.ok(tutorialService.save(tutorialRequest, connectedUser));
    }

    @GetMapping("/id/{tutorial-id}")
    public ResponseEntity<TutorialResponse> getTutorialById(@PathVariable("tutorial-id") Integer tutorialId) {
        return ResponseEntity.ok(tutorialService.findById(tutorialId));
    }

    @GetMapping("/all/{tutorial-query}")
    public ResponseEntity<List<TutorialCover>> getTutorials(@PathVariable("tutorial-query") String query) {
        return ResponseEntity.ok(tutorialService.findAllTutorials(query));
    }
}
