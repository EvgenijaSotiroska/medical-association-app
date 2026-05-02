package medical.association.backend.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import medical.association.backend.model.domain.User;

public record RegisterUserRequestDto (
        String firstName,

        String lastName,

        @Email(message = "Invalid email format")
        String email,

        String username,

        @Size(min = 8, message = "Password must be at least 8 characters")
        @Pattern(
                regexp = "^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).*$",
                message = "Password must contain uppercase letter, number and special character"
        )
        String password
) {
    public User toUser() {
        return new User(firstName, lastName, email, username, password);
    }
}
