package com.example.demo.Services;

import com.example.demo.Entities.*;
import com.example.demo.Repositories.TutorialRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TutorialService {
    private final TutorialMapper tutorialMapper;
    private final TutorialRepository tutorialRepository;
    public Integer save(TutorialRequest tutorialRequest, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Tutorial tutorial = tutorialMapper.toBook(tutorialRequest);
        tutorial.setUser(user);
        return tutorialRepository.save(tutorial).getId();
    }

    public TutorialResponse findById(Integer tutorialId) {
        return tutorialRepository.findById(tutorialId).map(tutorialMapper::toTutorialResponse).orElseThrow(() -> new EntityNotFoundException("No tutorial matches provided id"));
    }

    public List<TutorialCover> findAllTutorials(String query) {
        return tutorialRepository.findAllWithQuery(query).stream().map(tutorialMapper::toTutorialCover).toList();
    }
}
