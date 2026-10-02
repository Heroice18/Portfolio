package com.example.portfolio;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.net.URI;

@RestController
@RequestMapping("/api/contact")
@Tag(name = "Contact")
public class ContactMessageController {

    private final ContactMessageRepository repository;

    public ContactMessageController(ContactMessageRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    @Operation(summary = "Submit a portfolio contact message")
    public ResponseEntity<Void> submit(@Valid @RequestBody ContactMessageRequest request) {
        ContactMessage saved = repository.save(
                new ContactMessage(request.name(), request.email(), request.message()));
        return ResponseEntity.created(URI.create("/api/contact/" + saved.getId())).build();
    }
}