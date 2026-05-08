package medical.association.backend.model.dto;

import medical.association.backend.model.domain.EventRegistration;
import medical.association.backend.model.domain.MemberProfile;

import java.time.LocalDateTime;

public record EventRegistrationResponseDto(
        Long id,
        Long eventId,
        String eventTitle,
        String memberUsername,
        String firstName,
        String lastName,
        LocalDateTime registeredAt
) {
    public static EventRegistrationResponseDto from(EventRegistration reg, MemberProfile profile) {
        return new EventRegistrationResponseDto(
                reg.getId(),
                reg.getEvent().getId(),
                reg.getEvent().getTitle(),
                reg.getMember().getUsername(),
                profile != null ? profile.getFirstName() : null,
                profile != null ? profile.getLastName() : null,
                reg.getRegisteredAt()
        );
    }
}