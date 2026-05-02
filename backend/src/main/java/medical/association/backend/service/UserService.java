package medical.association.backend.service;

import medical.association.backend.model.domain.User;
import medical.association.backend.model.dto.LoginUserRequestDto;
import medical.association.backend.model.dto.LoginUserResponseDto;
import medical.association.backend.model.dto.RegisterUserRequestDto;
import medical.association.backend.model.dto.RegisterUserResponseDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.Optional;

public interface UserService extends UserDetailsService {
    Optional<RegisterUserResponseDto> register(RegisterUserRequestDto registerUserRequestDto);

    Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto);

    Optional<User> findByUsername(String username);
}
