package medical.association.backend.model.dto;

import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.domain.User;

import java.time.LocalDate;

public record ProfileResponseDto(
        Long userId,
        String username,
        String email,
        String role,
        String firstName,
        String lastName,
        LocalDate dateOfBirth,
        String phone,
        String address,
        String institution,
        String position,
        String specialization,
        String subSpecialization,
        String licenseNumber,
        Integer graduationYear,
        String profilePicture
) {
    public static ProfileResponseDto from(User user, MemberProfile profile) {
        return new ProfileResponseDto(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole().name(),
                profile != null ? profile.getFirstName() : null,
                profile != null ? profile.getLastName() : null,
                profile != null ? profile.getDateOfBirth() : null,
                profile != null ? profile.getPhone() : null,
                profile != null ? profile.getAddress() : null,
                profile != null ? profile.getInstitution() : null,
                profile != null ? profile.getPosition() : null,
                profile != null ? profile.getSpecialization() : null,
                profile != null ? profile.getSubSpecialization() : null,
                profile != null ? profile.getLicenseNumber() : null,
                profile != null ? profile.getGraduationYear() : null,
                profile != null ? profile.getProfilePicture() : null
        );
    }
}