package medical.association.backend.service.impl;

import medical.association.backend.model.domain.Event;
import medical.association.backend.model.domain.EventRegistration;
import medical.association.backend.model.domain.User;
import medical.association.backend.model.dto.EventRegistrationResponseDto;
import medical.association.backend.repository.EventRegistrationRepository;
import medical.association.backend.repository.EventRepository;
import medical.association.backend.repository.UserRepository;
import medical.association.backend.service.EventRegistrationService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventRegistrationServiceImpl implements EventRegistrationService {

    private final EventRegistrationRepository eventRegistrationRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public EventRegistrationServiceImpl(EventRegistrationRepository eventRegistrationRepository,
                                        EventRepository eventRepository,
                                        UserRepository userRepository) {
        this.eventRegistrationRepository = eventRegistrationRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Override
    public EventRegistrationResponseDto register(Long eventId, Long memberId) {
        if (eventRegistrationRepository.existsByEventIdAndMemberId(eventId, memberId)) {
            throw new RuntimeException("Already registered for this event");
        }

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Event not found"));

        User member = userRepository.findById(memberId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        EventRegistration registration = new EventRegistration(event, member);
        return EventRegistrationResponseDto.from(eventRegistrationRepository.save(registration));
    }

    @Override
    public List<EventRegistrationResponseDto> findByEventId(Long eventId) {
        return eventRegistrationRepository.findByEventId(eventId)
                .stream()
                .map(EventRegistrationResponseDto::from)
                .toList();
    }
}