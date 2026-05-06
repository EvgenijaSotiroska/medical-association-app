package medical.association.backend.service;

import medical.association.backend.enumeration.EventType;
import medical.association.backend.model.dto.CreateEventRequestDto;
import medical.association.backend.model.dto.EventResponseDto;
import java.util.List;

public interface EventService {
    List<EventResponseDto> findAll();
    List<EventResponseDto> findByType(EventType type);
    EventResponseDto findById(Long id);
    EventResponseDto create(CreateEventRequestDto request);
    void delete(Long id);
    EventResponseDto update(Long id, CreateEventRequestDto request);
}