package medical.association.backend.repository;

import medical.association.backend.enumeration.MembershipStatus;
import medical.association.backend.model.domain.MemberProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {
    List<MemberProfile> findByStatus (MembershipStatus status);
}
