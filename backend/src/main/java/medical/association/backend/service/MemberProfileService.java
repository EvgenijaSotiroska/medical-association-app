package medical.association.backend.service;

import medical.association.backend.enumeration.MembershipStatus;
import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.dto.ApprovedMemberDto;
import medical.association.backend.model.dto.MemberProfileDisplayDto;
import java.util.List;
import java.util.Optional;

public interface MemberProfileService {
    List<MemberProfile> findAll();

    List<MemberProfileDisplayDto> getPendingProfiles();

    Optional<MemberProfile> findById(Long id);

    Optional<MemberProfile> changeStatus(Long id, MembershipStatus newStatus);

    List<ApprovedMemberDto> getApprovedProfiles();

}
