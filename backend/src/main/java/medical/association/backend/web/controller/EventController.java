package medical.association.backend.web.controller;

import medical.association.backend.enumeration.EventType;
import medical.association.backend.model.dto.CreateEventRequestDto;
import medical.association.backend.model.dto.EventResponseDto;
import medical.association.backend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
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

    @PostMapping
    public ResponseEntity<EventResponseDto> create(@RequestBody CreateEventRequestDto request) {
        return ResponseEntity.ok(eventService.create(request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        eventService.delete(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/{id}")
    public ResponseEntity<EventResponseDto> update(@PathVariable Long id,
                                                   @RequestBody CreateEventRequestDto request) {
        return ResponseEntity.ok(eventService.update(id, request));
    }
}