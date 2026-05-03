package medical.association.backend.service;

import medical.association.backend.model.domain.MemberProfile;

import java.util.List;

public interface MemberProfileService {
    List<MemberProfile> findAll();
}
