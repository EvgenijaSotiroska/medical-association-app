package medical.association.backend.model.dto;

import jakarta.validation.constraints.*;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;
import java.time.LocalDate;

public record RegisterUserRequestDto (

        @Email(message = "Invalid email format")
        String email,

        @NotBlank
        String username,

        @Size(min = 8, message = "Password must be at least 8 characters")
        @Pattern(
                regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$",
                message = "Password must contain uppercase letter, number and special character"
        )
        String password,

        @NotBlank
        String firstName,

        @NotBlank
        String lastName,

        @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
        LocalDate dateOfBirth,

        @NotBlank
        String phone,

        @NotBlank
        String address,

        @NotBlank
        String institution,

        @NotBlank
        String position,

        @NotBlank
        String specialization,

        String subSpecialization,

        @NotBlank
        String licenseNumber,

        @NotNull
        Integer graduationYear

) {}