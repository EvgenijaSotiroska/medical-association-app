package medical.association.backend.repository;

import medical.association.backend.enumeration.EventType;
import medical.association.backend.model.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findAllByOrderByCreatedAtDesc();
    List<Event> findByTypeOrderByCreatedAtDesc(EventType type);
}
