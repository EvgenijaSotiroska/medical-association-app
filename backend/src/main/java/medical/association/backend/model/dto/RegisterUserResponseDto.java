package medical.association.backend.model.dto;

import medical.association.backend.enumeration.Role;
import medical.association.backend.model.domain.User;

public record RegisterUserResponseDto (
        String username,
        String email,
        Role role
){
    public static RegisterUserResponseDto from(User user) {
        return new RegisterUserResponseDto(
                user.getUsername(),
                user.getEmail(),
                user.getRole()
        );
    }
}
