package medical.association.backend.service.impl;

import medical.association.backend.enumeration.EventType;
import medical.association.backend.model.domain.Event;
import medical.association.backend.model.dto.CreateEventRequestDto;
import medical.association.backend.model.dto.EventResponseDto;
import medical.association.backend.repository.EventRepository;
import medical.association.backend.service.EventService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class EventServiceImpl implements EventService {

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Override
    public List<EventResponseDto> findAll() {
        return eventRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(EventResponseDto::from)
                .toList();
    }

    @Override
    public List<EventResponseDto> findByType(EventType type) {
        return eventRepository.findByTypeOrderByCreatedAtDesc(type)
                .stream()
                .map(EventResponseDto::from)
                .toList();
    }

    @Override
    public EventResponseDto findById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        return EventResponseDto.from(event);
    }

    @Override
    public EventResponseDto create(CreateEventRequestDto request) {
        Event event = new Event(
                request.title(),
                request.description(),
                request.eventDate(),
                request.location(),
                request.imageUrl(),
                request.type(),
                null
        );
        return EventResponseDto.from(eventRepository.save(event));
    }

    @Override
    public void delete(Long id) {
        eventRepository.deleteById(id);
    }
    @Override
    public EventResponseDto update(Long id, CreateEventRequestDto request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Event not found"));
        event.setTitle(request.title());
        event.setDescription(request.description());
        event.setEventDate(request.eventDate());
        event.setLocation(request.location());
        event.setImageUrl(request.imageUrl());
        event.setType(request.type());
        return EventResponseDto.from(eventRepository.save(event));
    }
}