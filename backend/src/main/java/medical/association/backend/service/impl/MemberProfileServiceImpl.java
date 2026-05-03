package medical.association.backend.service.impl;

import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.repository.MemberProfileRepository;
import medical.association.backend.service.MemberProfileService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberProfileServiceImpl implements MemberProfileService {
    private final MemberProfileRepository memberProfileRepository;

    public MemberProfileServiceImpl(MemberProfileRepository memberProfileRepository) {
        this.memberProfileRepository = memberProfileRepository;
    }

    @Override
    public List<MemberProfile> findAll() {
        return memberProfileRepository.findAll();
    }
}
