package medical.association.backend.model.dto;

import java.time.LocalDate;

public record UpdateProfileRequestDto(
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
        Integer graduationYear
) {}