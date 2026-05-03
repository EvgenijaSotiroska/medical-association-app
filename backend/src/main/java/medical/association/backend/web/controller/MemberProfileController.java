package medical.association.backend.web.controller;

import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.dto.RegisterUserResponseDto;
import medical.association.backend.service.MemberProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/members")
public class MemberProfileController {
    private final MemberProfileService memberProfileService;

    public MemberProfileController(MemberProfileService memberProfileService) {
        this.memberProfileService = memberProfileService;
    }

    @GetMapping
    public ResponseEntity<List<MemberProfile>> findAll() {
        return ResponseEntity.ok(memberProfileService.findAll());
    }
}
