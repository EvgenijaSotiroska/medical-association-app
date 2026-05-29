package medical.association.backend.service.impl;

import medical.association.backend.enumeration.PublicationType;
import medical.association.backend.model.domain.Publication;
import medical.association.backend.model.dto.CreatePublicationRequestDto;
import medical.association.backend.model.dto.PublicationResponseDto;
import medical.association.backend.model.exception.PublicationNotFoundException;
import medical.association.backend.repository.PublicationRepository;
import medical.association.backend.service.PublicationService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PublicationServiceImpl implements PublicationService {

    private final PublicationRepository publicationRepository;

    public PublicationServiceImpl(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    @Override
    public List<PublicationResponseDto> findAll() {
        return publicationRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(PublicationResponseDto::from)
                .toList();
    }

    @Override
    public List<PublicationResponseDto> findByType(PublicationType type) {
        return publicationRepository.findByTypeOrderByCreatedAtDesc(type)
                .stream()
                .map(PublicationResponseDto::from)
                .toList();
    }

    @Override
    public PublicationResponseDto findById(Long id) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new PublicationNotFoundException(id));
        return PublicationResponseDto.from(publication);
    }

    @Override
    public PublicationResponseDto create(CreatePublicationRequestDto request) {
        Publication publication = new Publication(
                request.title(),
                request.description(),
                request.imageUrl(),
                request.documentUrl(),
                request.type(),
                null
        );
        return PublicationResponseDto.from(publicationRepository.save(publication));
    }

    @Override
    public void delete(Long id) {
        publicationRepository.deleteById(id);
    }
    @Override
    public PublicationResponseDto update(Long id, CreatePublicationRequestDto request) {
        Publication publication = publicationRepository.findById(id)
                .orElseThrow(() -> new PublicationNotFoundException(id));
        publication.setTitle(request.title());
        publication.setDescription(request.description());
        publication.setImageUrl(request.imageUrl());
        publication.setDocumentUrl(request.documentUrl()); // ← додај
        publication.setType(request.type());
        return PublicationResponseDto.from(publicationRepository.save(publication));
    }
}