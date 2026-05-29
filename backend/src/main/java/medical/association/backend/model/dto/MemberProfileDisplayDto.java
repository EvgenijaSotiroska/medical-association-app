package medical.association.backend.model.dto;

import medical.association.backend.enumeration.MembershipStatus;
import java.time.LocalDate;

public record MemberProfileDisplayDto(
        Long id,
        String firstName,
        String lastName,
        LocalDate dateOfBirth,
        String phone,
        String address,
        String email,
        String specialization,
        String institution,
        String position,
        String subSpecialization,
        String licenseNumber,
        Integer graduationYear,
        MembershipStatus status,
        String profilePicture
) {}
