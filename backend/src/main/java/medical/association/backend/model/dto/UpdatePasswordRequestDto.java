package medical.association.backend.model.dto;

public record UpdatePasswordRequestDto(
        String currentPassword,
        String newPassword,
        String confirmNewPassword
) {}