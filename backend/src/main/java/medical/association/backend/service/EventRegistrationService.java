package medical.association.backend.service;

import medical.association.backend.model.dto.EventRegistrationResponseDto;
import java.util.List;

public interface EventRegistrationService {
    EventRegistrationResponseDto register(Long eventId, Long memberId);
    List<EventRegistrationResponseDto> findByEventId(Long eventId);

    boolean isRegistered(Long eventId, Long memberId);
    void cancelRegistration(Long eventId, Long memberId);
    List<EventRegistrationResponseDto> findByMemberId(Long memberId);


}