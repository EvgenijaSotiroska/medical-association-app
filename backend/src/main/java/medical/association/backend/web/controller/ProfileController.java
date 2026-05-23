package medical.association.backend.web.controller;

import medical.association.backend.model.dto.ProfileResponseDto;
import medical.association.backend.model.dto.UpdateEmailRequestDto;
import medical.association.backend.model.dto.UpdatePasswordRequestDto;
import medical.association.backend.model.dto.UpdateProfileRequestDto;
import medical.association.backend.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping
    public ResponseEntity<ProfileResponseDto> getProfile(Principal principal) {
        return ResponseEntity.ok(profileService.getProfile(principal.getName()));
    }

    @PutMapping
    public ResponseEntity<ProfileResponseDto> updateProfile(
            Principal principal,
            @RequestBody UpdateProfileRequestDto request) {
        return ResponseEntity.ok(profileService.updateProfile(principal.getName(), request));
    }

    @PutMapping("/password")
    public ResponseEntity<Void> updatePassword(
            Principal principal,
            @RequestBody UpdatePasswordRequestDto request) {
        profileService.updatePassword(principal.getName(), request);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/email")
    public ResponseEntity<Void> updateEmail(
            Principal principal,
            @RequestBody UpdateEmailRequestDto request) {
        profileService.updateEmail(principal.getName(), request);
        return ResponseEntity.noContent().build();
    }
}