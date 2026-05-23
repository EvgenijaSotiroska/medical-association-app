package medical.association.backend.web.controller;

import medical.association.backend.model.dto.EventRegistrationResponseDto;
import medical.association.backend.service.EventRegistrationService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
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

    @GetMapping("/{eventId}/is-registered/{memberId}")
    public ResponseEntity<Boolean> isRegistered(
            @PathVariable Long eventId,
            @PathVariable Long memberId) {
        return ResponseEntity.ok(eventRegistrationService.isRegistered(eventId, memberId));
    }

    @DeleteMapping("/{eventId}/cancel/{memberId}")
    public ResponseEntity<Void> cancel(
            @PathVariable Long eventId,
            @PathVariable Long memberId) {
        eventRegistrationService.cancelRegistration(eventId, memberId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{eventId}/registrations/export")
    public ResponseEntity<byte[]> exportRegistrations(@PathVariable Long eventId) {
        List<EventRegistrationResponseDto> registrations = eventRegistrationService.findByEventId(eventId);

        StringBuilder csv = new StringBuilder();
        csv.append("Name,Surname,Username\n");

        for (EventRegistrationResponseDto r : registrations) {
            csv.append(r.firstName()).append(",")
                    .append(r.lastName()).append(",")
                    .append(r.memberUsername()).append(",")
                    .append("\n");
        }

        byte[] bytes = csv.toString().getBytes(StandardCharsets.UTF_8);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=registrations-" + eventId + ".csv")
                .contentType(MediaType.parseMediaType("text/csv"))
                .body(bytes);
    }
    @GetMapping("/my-events/{memberId}")
    public ResponseEntity<List<EventRegistrationResponseDto>> findMyRegistrations(
            @PathVariable Long memberId) {
        return ResponseEntity.ok(eventRegistrationService.findByMemberId(memberId));
    }
}