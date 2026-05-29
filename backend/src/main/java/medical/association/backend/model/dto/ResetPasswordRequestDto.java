package medical.association.backend.model.dto;

public record ResetPasswordRequestDto(
        String token,
        String newPassword,
        String confirmNewPassword
) {}