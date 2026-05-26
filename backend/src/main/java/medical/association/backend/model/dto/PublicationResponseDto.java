package medical.association.backend.model.dto;

import medical.association.backend.enumeration.PublicationType;
import medical.association.backend.model.domain.Publication;
import java.time.LocalDateTime;

public record PublicationResponseDto(
        Long id,
        String title,
        String description,
        String imageUrl,
        String documentUrl,
        PublicationType type,
        String authorName,
        LocalDateTime createdAt
) {
    public static PublicationResponseDto from(Publication publication) {
        return new PublicationResponseDto(
                publication.getId(),
                publication.getTitle(),
                publication.getDescription(),
                publication.getImageUrl(),
                publication.getDocumentUrl(),
                publication.getType(),
                publication.getAuthor() != null ? publication.getAuthor().getUsername() : null,
                publication.getCreatedAt()
        );
    }
}