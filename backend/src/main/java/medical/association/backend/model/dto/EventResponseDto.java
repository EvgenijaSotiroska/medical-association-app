package medical.association.backend.model.dto;

import medical.association.backend.enumeration.EventType;
import medical.association.backend.model.domain.Event;
import java.time.LocalDate;
import java.time.LocalDateTime;

public record EventResponseDto(
        Long id,
        String title,
        String description,
        LocalDate eventDate,
        String location,
        String imageUrl,
        EventType type,
        String authorName,
        LocalDateTime createdAt
) {
    public static EventResponseDto from(Event event) {
        return new EventResponseDto(
                event.getId(),
                event.getTitle(),
                event.getDescription(),
                event.getEventDate(),
                event.getLocation(),
                event.getImageUrl(),
                event.getType(),
                event.getAuthor() != null ? event.getAuthor().getUsername() : null,
                event.getCreatedAt()
        );
    }
}