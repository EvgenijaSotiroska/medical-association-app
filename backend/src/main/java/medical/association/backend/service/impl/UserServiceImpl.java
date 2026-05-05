package medical.association.backend.service.impl;

import medical.association.backend.helpers.JwtHelper;
import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.domain.User;
import medical.association.backend.model.dto.*;
import medical.association.backend.model.exception.AccountNotApprovedException;
import medical.association.backend.model.exception.IncorrectPasswordException;
import medical.association.backend.model.exception.UserNotFoundException;
import medical.association.backend.model.exception.UsernameAlreadyExistsException;
import medical.association.backend.repository.MemberProfileRepository;
import medical.association.backend.repository.UserRepository;
import medical.association.backend.service.UserService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private final JwtHelper jwtHelper;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final MemberProfileRepository memberProfileRepository;

    public UserServiceImpl(JwtHelper jwtHelper, PasswordEncoder passwordEncoder, UserRepository userRepository, MemberProfileRepository memberProfileRepository) {
        this.jwtHelper = jwtHelper;
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
        this.memberProfileRepository = memberProfileRepository;
    }

    @Override
    public Optional<RegisterMemberResponseDto> register(RegisterUserRequestDto registerUserRequestDto) {
        if (userRepository.existsByUsername(registerUserRequestDto.username()))
            throw new UsernameAlreadyExistsException(registerUserRequestDto.username());

        User user = new User(
                registerUserRequestDto.email(),
                registerUserRequestDto.username(),
                passwordEncoder.encode(registerUserRequestDto.password())
        );
        user.setEnabled(false);
        userRepository.save(user);
        MemberProfile profile = new MemberProfile(
                registerUserRequestDto.firstName(),
                registerUserRequestDto.lastName(),
                registerUserRequestDto.dateOfBirth(),
                registerUserRequestDto.phone(),
                registerUserRequestDto.address(),
                registerUserRequestDto.institution(),
                registerUserRequestDto.position(),
                registerUserRequestDto.specialization(),
                registerUserRequestDto.subSpecialization(),
                registerUserRequestDto.licenseNumber(),
                registerUserRequestDto.graduationYear()
        );
        profile.setUser(user);
        memberProfileRepository.save(profile);
        RegisterMemberResponseDto displayMemberDto = new RegisterMemberResponseDto("Вашата апликација е успешно поднесена. Ќе бидете контактирани по одобрување.");
        return Optional.of(displayMemberDto);
    }

    @Override
    public Optional<LoginUserResponseDto> login(LoginUserRequestDto loginUserRequestDto) {
       User user = userRepository.findByUsername(loginUserRequestDto.username())
               .orElseThrow(() -> new UserNotFoundException(loginUserRequestDto.username()));

       if(!user.isEnabled()){
           throw new AccountNotApprovedException();
       }

       if(!passwordEncoder.matches(loginUserRequestDto.password(), user.getPassword()))
           throw new IncorrectPasswordException();

       String token = jwtHelper.generateToken(user);

       return Optional.of(new LoginUserResponseDto(token));
    }

    @Override
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository
                .findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(username));
    }
}
