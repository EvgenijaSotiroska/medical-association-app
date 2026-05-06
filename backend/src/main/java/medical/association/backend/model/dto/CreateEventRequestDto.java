package medical.association.backend.model.dto;

import medical.association.backend.enumeration.EventType;
import java.time.LocalDate;

public record CreateEventRequestDto(
        String title,
        String description,
        LocalDate eventDate,
        String location,
        String imageUrl,
        EventType type
) {}