package medical.association.backend.model.dto;

import medical.association.backend.model.domain.EventRegistration;
import java.time.LocalDateTime;

public record EventRegistrationResponseDto(
        Long id,
        Long eventId,
        String eventTitle,
        String memberUsername,
        LocalDateTime registeredAt
) {
    public static EventRegistrationResponseDto from(EventRegistration reg) {
        return new EventRegistrationResponseDto(
                reg.getId(),
                reg.getEvent().getId(),
                reg.getEvent().getTitle(),
                reg.getMember().getUsername(),
                reg.getRegisteredAt()
        );
    }
}