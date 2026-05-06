package medical.association.backend.repository;

import medical.association.backend.enumeration.PublicationType;
import medical.association.backend.model.domain.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PublicationRepository extends JpaRepository<Publication, Long> {
    List<Publication> findAllByOrderByCreatedAtDesc();
    List<Publication> findByTypeOrderByCreatedAtDesc(PublicationType type);
}