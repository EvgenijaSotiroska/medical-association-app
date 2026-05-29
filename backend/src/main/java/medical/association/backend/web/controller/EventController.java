package medical.association.backend.web.controller;

import medical.association.backend.enumeration.EventType;
import medical.association.backend.model.dto.CreateEventRequestDto;
import medical.association.backend.model.dto.EventResponseDto;
import medical.association.backend.service.EventService;
import medical.association.backend.service.impl.SupabaseStorageServiceImpl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    private final SupabaseStorageServiceImpl supabaseStorageService;

    public EventController(EventService eventService, SupabaseStorageServiceImpl supabaseStorageService) {
        this.eventService = eventService;
        this.supabaseStorageService = supabaseStorageService;
    }
    @GetMapping
    public ResponseEntity<List<EventResponseDto>> findAll(
            @RequestParam(required = false) EventType type) {
        if (type != null) {
            return ResponseEntity.ok(eventService.findByType(type));
        }
        return ResponseEntity.ok(eventService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EventResponseDto> findById(@PathVariable Long id) {
        return ResponseEntity.ok(eventService.findById(id));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventResponseDto> create(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("eventDate") String eventDate,
            @RequestParam("location") String location,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("type") EventType type
    ) throws Exception {
        String finalImageUrl = imageUrl;
        if (image != null && !image.isEmpty()) {
            String key = supabaseStorageService.uploadImage(image);
            finalImageUrl = supabaseStorageService.getPublicUrl(key);
        }

        CreateEventRequestDto request = new CreateEventRequestDto(
                title, description,
                LocalDate.parse(eventDate),
                location, finalImageUrl, type
        );

        return ResponseEntity.ok(eventService.create(request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<EventResponseDto> update(
            @PathVariable Long id,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("eventDate") String eventDate,
            @RequestParam("location") String location,
            @RequestParam(value = "imageUrl", required = false) String imageUrl,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("type") EventType type
    ) throws Exception {
        String finalImageUrl = imageUrl;
        if (image != null && !image.isEmpty()) {
            String key = supabaseStorageService.uploadImage(image);
            finalImageUrl = supabaseStorageService.getPublicUrl(key);
        }

        CreateEventRequestDto request = new CreateEventRequestDto(
                title, description,
                LocalDate.parse(eventDate),
                location, finalImageUrl, type
        );

        return ResponseEntity.ok(eventService.update(id, request));
    }
}