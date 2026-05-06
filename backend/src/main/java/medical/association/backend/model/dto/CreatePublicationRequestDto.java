package medical.association.backend.model.dto;

import medical.association.backend.enumeration.PublicationType;

public record CreatePublicationRequestDto(
        String title,
        String description,
        String imageUrl,
        PublicationType type
) {}