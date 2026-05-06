package medical.association.backend.web.controller;

import medical.association.backend.model.dto.EventRegistrationResponseDto;
import medical.association.backend.service.EventRegistrationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EventRegistrationController {

    private final EventRegistrationService eventRegistrationService;

    public EventRegistrationController(EventRegistrationService eventRegistrationService) {
        this.eventRegistrationService = eventRegistrationService;
    }

    @PostMapping("/{eventId}/register/{memberId}")
    public ResponseEntity<EventRegistrationResponseDto> register(
            @PathVariable Long eventId,
            @PathVariable Long memberId) {
        return ResponseEntity.ok(eventRegistrationService.register(eventId, memberId));
    }

    @GetMapping("/{eventId}/registrations")
    public ResponseEntity<List<EventRegistrationResponseDto>> findRegistrations(
            @PathVariable Long eventId) {
        return ResponseEntity.ok(eventRegistrationService.findByEventId(eventId));
    }
}