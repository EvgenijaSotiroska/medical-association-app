package medical.association.backend.web.controller;

import medical.association.backend.enumeration.PublicationType;
import medical.association.backend.model.dto.CreatePublicationRequestDto;
import medical.association.backend.model.dto.PublicationResponseDto;
import medical.association.backend.service.PublicationService;
import medical.association.backend.service.impl.SupabaseStorageServiceImpl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/publications")
public class PublicationController {

    private final PublicationService publicationService;
    private final SupabaseStorageServiceImpl supabaseStorageService;

    public PublicationController(PublicationService publicationService, SupabaseStorageServiceImpl supabaseStorageService) {
        this.publicationService = publicationService;
        this.supabaseStorageService = supabaseStorageService;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PublicationResponseDto> create(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam("type") PublicationType type,
            @RequestParam(value = "document", required = false) MultipartFile document
    ) {
        try {

            String documentUrl = null;
            if (document != null && !document.isEmpty()) {
                String key = supabaseStorageService.upload(document);
                documentUrl = supabaseStorageService.getPublicUrl(key);
            }

            CreatePublicationRequestDto request = new CreatePublicationRequestDto(
                    title, description, imageUrl, documentUrl, type
            );

            PublicationResponseDto result = publicationService.create(request);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
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