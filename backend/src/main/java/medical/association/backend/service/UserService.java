package medical.association.backend.service;

import medical.association.backend.model.domain.User;
import medical.association.backend.model.dto.*;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<RegisterMemberResponseDto> register(RegisterUserRequestDto registerUserRequestDto);

    Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto);

    Optional<User> findByUsername(String username);

    void forgotPassword(String email);
    void resetPassword(ResetPasswordRequestDto request);
}
