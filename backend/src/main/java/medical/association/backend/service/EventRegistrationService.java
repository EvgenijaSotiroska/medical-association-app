package medical.association.backend.service;

import medical.association.backend.model.dto.EventRegistrationResponseDto;
import java.util.List;

public interface EventRegistrationService {
    EventRegistrationResponseDto register(Long eventId, Long memberId);
    List<EventRegistrationResponseDto> findByEventId(Long eventId);
}