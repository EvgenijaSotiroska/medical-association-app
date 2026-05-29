package medical.association.backend.service.impl;

import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.domain.User;
import medical.association.backend.model.dto.ProfileResponseDto;
import medical.association.backend.model.dto.UpdateEmailRequestDto;
import medical.association.backend.model.dto.UpdatePasswordRequestDto;
import medical.association.backend.model.dto.UpdateProfileRequestDto;
import medical.association.backend.model.exception.IncorrectPasswordException;
import medical.association.backend.model.exception.PasswordsDoNotMatchException;
import medical.association.backend.model.exception.UserNotFoundException;
import medical.association.backend.repository.MemberProfileRepository;
import medical.association.backend.repository.UserRepository;
import medical.association.backend.service.ProfileService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final MemberProfileRepository memberProfileRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileServiceImpl(UserRepository userRepository,
                              MemberProfileRepository memberProfileRepository,
                              PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.memberProfileRepository = memberProfileRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public ProfileResponseDto getProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        MemberProfile profile = memberProfileRepository.findByUserId(user.getId())
                .orElse(null);
        return ProfileResponseDto.from(user, profile);
    }

    @Override
    public ProfileResponseDto updateProfile(String username, UpdateProfileRequestDto request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        MemberProfile profile = memberProfileRepository.findByUserId(user.getId())
                .orElse(null);

        if (profile != null) {
            profile.setFirstName(request.firstName());
            profile.setLastName(request.lastName());
            profile.setDateOfBirth(request.dateOfBirth());
            profile.setPhone(request.phone());
            profile.setAddress(request.address());
            profile.setInstitution(request.institution());
            profile.setPosition(request.position());
            profile.setSpecialization(request.specialization());
            profile.setSubSpecialization(request.subSpecialization());
            profile.setLicenseNumber(request.licenseNumber());
            profile.setGraduationYear(request.graduationYear());
            memberProfileRepository.save(profile);
        }

        return ProfileResponseDto.from(user, profile);
    }

    @Override
    public void updatePassword(String username, UpdatePasswordRequestDto request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));

        if (!passwordEncoder.matches(request.currentPassword(), user.getPassword())) {
            throw new IncorrectPasswordException();
        }

        if (!request.newPassword().equals(request.confirmNewPassword())) {
            throw new PasswordsDoNotMatchException();
        }

        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    @Override
    public void updateEmail(String username, UpdateEmailRequestDto request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        user.setEmail(request.newEmail());
        userRepository.save(user);
    }

    @Override
    public void updateProfilePicture(String username, String url) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException(username));
        MemberProfile profile = memberProfileRepository.findByUserId(user.getId())
                .orElseThrow(() -> new UserNotFoundException(username));
        profile.setProfilePicture(url);
        memberProfileRepository.save(profile);
    }
}