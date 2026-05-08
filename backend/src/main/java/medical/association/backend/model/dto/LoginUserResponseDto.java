package medical.association.backend.model.dto;

public record LoginUserResponseDto(
        String token,
        Long id,
        String role
) {
}
