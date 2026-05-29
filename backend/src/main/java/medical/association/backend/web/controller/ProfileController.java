package medical.association.backend.web.controller;

import medical.association.backend.model.dto.ProfileResponseDto;
import medical.association.backend.model.dto.UpdateEmailRequestDto;
import medical.association.backend.model.dto.UpdatePasswordRequestDto;
import medical.association.backend.model.dto.UpdateProfileRequestDto;
import medical.association.backend.service.ProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import medical.association.backend.service.impl.SupabaseStorageServiceImpl;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;

@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;
    private final SupabaseStorageServiceImpl supabaseStorageService;


    public ProfileController(ProfileService profileService, SupabaseStorageServiceImpl supabaseStorageService) {
        this.profileService = profileService;
        this.supabaseStorageService = supabaseStorageService;
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

    @PostMapping(value = "/picture", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadProfilePicture(
            @RequestParam("image") MultipartFile image,
            Principal principal) throws Exception {
        String key = supabaseStorageService.uploadImage(image);
        String url = supabaseStorageService.getPublicUrl(key);
        profileService.updateProfilePicture(principal.getName(), url);
        return ResponseEntity.ok(url);
    }
}