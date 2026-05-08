package medical.association.backend.service.impl;

import medical.association.backend.model.domain.Event;
import medical.association.backend.model.domain.EventRegistration;
import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.domain.User;
import medical.association.backend.model.dto.EventRegistrationResponseDto;
import medical.association.backend.model.exception.EventNotFoundException;
import medical.association.backend.model.exception.RegistrationNotFoundException;
import medical.association.backend.repository.EventRegistrationRepository;
import medical.association.backend.repository.EventRepository;
import medical.association.backend.repository.MemberProfileRepository;
import medical.association.backend.repository.UserRepository;
import medical.association.backend.service.EventRegistrationService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventRegistrationServiceImpl implements EventRegistrationService {

    private final EventRegistrationRepository eventRegistrationRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;
    private final MemberProfileRepository memberProfileRepository;

    public EventRegistrationServiceImpl(EventRegistrationRepository eventRegistrationRepository,
                                        EventRepository eventRepository,
                                        UserRepository userRepository,
                                        MemberProfileRepository memberProfileRepository) {
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
        this.memberProfileRepository=memberProfileRepository;
    }

    @Override
    public EventRegistrationResponseDto register(Long eventId, Long memberId) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new EventNotFoundException(eventId));

        User member = userRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        EventRegistration registration = new EventRegistration(event, member);
        EventRegistration saved = eventRegistrationRepository.save(registration);

        MemberProfile profile = memberProfileRepository
                .findByUserId(memberId)
                .orElse(null);

        return EventRegistrationResponseDto.from(saved, profile);
    }

    @Override
    public List<EventRegistrationResponseDto> findByEventId(Long eventId) {
        return eventRegistrationRepository.findByEventId(eventId)
                .stream()
                .map(reg -> {
                    MemberProfile profile = memberProfileRepository
                            .findByUserId(reg.getMember().getId())
                            .orElse(null);
                    return EventRegistrationResponseDto.from(reg, profile);
                })
                .toList();
    }

    @Override
    public boolean isRegistered(Long eventId, Long memberId) {
        return eventRegistrationRepository.existsByEventIdAndMemberId(eventId, memberId);
    }

    @Override
    public void cancelRegistration(Long eventId, Long memberId) {
        EventRegistration registration = eventRegistrationRepository
                .findByEventIdAndMemberId(eventId, memberId)
                .orElseThrow(RegistrationNotFoundException::new);
        eventRegistrationRepository.delete(registration);
    }
}