package medical.association.backend.service;

import medical.association.backend.model.dto.ProfileResponseDto;
import medical.association.backend.model.dto.UpdateEmailRequestDto;
import medical.association.backend.model.dto.UpdatePasswordRequestDto;
import medical.association.backend.model.dto.UpdateProfileRequestDto;

public interface ProfileService {
    ProfileResponseDto getProfile(String username);
    ProfileResponseDto updateProfile(String username, UpdateProfileRequestDto request);
    void updatePassword(String username, UpdatePasswordRequestDto request);
    void updateEmail(String username, UpdateEmailRequestDto request);
}