package medical.association.backend.service.impl;

import medical.association.backend.enumeration.MembershipStatus;
import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.dto.ApprovedMemberDto;
import medical.association.backend.model.dto.MemberProfileDisplayDto;
import medical.association.backend.repository.MemberProfileRepository;
import medical.association.backend.service.EmailService;
import medical.association.backend.service.MemberProfileService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberProfileServiceImpl implements MemberProfileService {
    private final MemberProfileRepository memberProfileRepository;
    private final EmailService emailService;

    public MemberProfileServiceImpl(MemberProfileRepository memberProfileRepository, EmailService emailService) {
        this.memberProfileRepository = memberProfileRepository;
        this.emailService = emailService;
    }

    @Override
    public List<MemberProfile> findAll() {
        return memberProfileRepository.findAll();
    }

    @Override
    public List<MemberProfileDisplayDto> getPendingProfiles() {
        return memberProfileRepository.findByStatus(MembershipStatus.PENDING)
                .stream()
                .map(p -> new MemberProfileDisplayDto(
                        p.getId(),
                        p.getFirstName(),
                        p.getLastName(),
                        p.getDateOfBirth(),
                        p.getPhone(),
                        p.getAddress(),
                        p.getUser().getEmail(),
                        p.getSpecialization(),
                        p.getInstitution(),
                        p.getPosition(),
                        p.getSubSpecialization(),
                        p.getLicenseNumber(),
                        p.getGraduationYear(),
                        p.getStatus()
                ))
                .toList();
    }

    @Override
    public Optional<MemberProfile> findById(Long id) {
        return memberProfileRepository.findById(id);
    }

    @Override
    public Optional<MemberProfile> changeStatus(Long id, MembershipStatus newStatus) {
        return memberProfileRepository.findById(id)
                .map(profile -> {
                    profile.setStatus(newStatus);

                    if (newStatus == MembershipStatus.APPROVED) {
                        profile.getUser().setEnabled(true);
                    }

                    MemberProfile saved = memberProfileRepository.save(profile);

                    emailService.sendStatusEmail(
                            saved.getUser().getEmail(),
                            saved.getFirstName(),
                            newStatus
                    );

                    return saved;
                });
    }

    @Override
    public List<ApprovedMemberDto> getApprovedProfiles() {
        return memberProfileRepository.findByStatus(MembershipStatus.APPROVED)
                .stream()
                .map(p -> new ApprovedMemberDto(
                        p.getId(),
                        p.getFirstName(),
                        p.getLastName(),
                        p.getDateOfBirth(),
                        p.getPhone(),
                        p.getAddress(),
                        p.getUser().getUsername(),
                        p.getUser().getEmail(),
                        p.getSpecialization(),
                        p.getInstitution(),
                        p.getPosition(),
                        p.getSubSpecialization(),
                        p.getLicenseNumber(),
                        p.getGraduationYear(),
                        p.getStatus()
                ))
                .toList();
    }
}
