package medical.association.backend.repository;

import medical.association.backend.model.domain.EventRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface EventRegistrationRepository extends JpaRepository<EventRegistration, Long> {
    List<EventRegistration> findByEventId(Long eventId);
    boolean existsByEventIdAndMemberId(Long eventId, Long memberId);
    Optional<EventRegistration> findByEventIdAndMemberId(Long eventId, Long memberId);
}