package medical.association.backend.service;

import medical.association.backend.enumeration.PublicationType;
import medical.association.backend.model.dto.CreatePublicationRequestDto;
import medical.association.backend.model.dto.PublicationResponseDto;
import java.util.List;

public interface PublicationService {
    List<PublicationResponseDto> findAll();
    List<PublicationResponseDto> findByType(PublicationType type);
    PublicationResponseDto findById(Long id);
    PublicationResponseDto create(CreatePublicationRequestDto request);
    void delete(Long id);
    PublicationResponseDto update(Long id, CreatePublicationRequestDto request);
}