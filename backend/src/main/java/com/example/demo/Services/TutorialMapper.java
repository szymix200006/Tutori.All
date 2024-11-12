package com.example.demo.Services;

import com.example.demo.Entities.Tutorial;
import com.example.demo.Entities.TutorialCover;
import com.example.demo.Entities.TutorialRequest;
import com.example.demo.Entities.TutorialResponse;
import org.springframework.stereotype.Service;

@Service
public class TutorialMapper {
    public Tutorial toBook(TutorialRequest tutorialRequest) {
        return Tutorial.builder()
                .title(tutorialRequest.title())
                .cover(tutorialRequest.cover())
                .contents(tutorialRequest.contents())
                .mediaList(tutorialRequest.files())
                .build();
    }

    public TutorialResponse toTutorialResponse(Tutorial tutorial) {
        return TutorialResponse
                .builder()
                .id(tutorial.getId())
                .user(tutorial.getUser())
                .contents(tutorial.getContents())
                .cover(tutorial.getCover())
                .createdAt(tutorial.getCreatedDate())
                .title(tutorial.getTitle())
                .build();
    }

    public TutorialCover toTutorialCover(Tutorial tutorial) {
        return TutorialCover.builder()
                .cover(tutorial.getCover())
                .id(tutorial.getId())
                .title(tutorial.getTitle())
                .user(tutorial.getUser())
                .build();
    }
}
