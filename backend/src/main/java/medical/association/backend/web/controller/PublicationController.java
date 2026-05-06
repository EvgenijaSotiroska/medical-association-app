package medical.association.backend.web.controller;

import medical.association.backend.enumeration.PublicationType;
import medical.association.backend.model.dto.CreatePublicationRequestDto;
import medical.association.backend.model.dto.PublicationResponseDto;
import medical.association.backend.service.PublicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/publications")
public class PublicationController {

    private final PublicationService publicationService;

    public PublicationController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    @GetMapping
    public ResponseEntity<List<PublicationResponseDto>> findAll(
            @RequestParam(required = false) PublicationType type) {
        if (type != null) {
            return ResponseEntity.ok(publicationService.findByType(type));
        }
        return ResponseEntity.ok(publicationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicationResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(publicationService.findById(id));
    }

    @PostMapping
    public ResponseEntity<PublicationResponseDto> create(@RequestBody CreatePublicationRequestDto request) {
        return ResponseEntity.ok(publicationService.create(request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        publicationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<PublicationResponseDto> update(@PathVariable Long id,
                                                         @RequestBody CreatePublicationRequestDto request) {
        return ResponseEntity.ok(publicationService.update(id, request));
    }
}