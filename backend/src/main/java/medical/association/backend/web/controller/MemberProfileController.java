package medical.association.backend.web.controller;

import medical.association.backend.enumeration.MembershipStatus;
import medical.association.backend.model.domain.MemberProfile;
import medical.association.backend.model.dto.ApprovedMemberDto;
import medical.association.backend.model.dto.MemberProfileDisplayDto;
import medical.association.backend.service.MemberProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/memberProfiles")
public class MemberProfileController {
    private final MemberProfileService memberProfileService;

    public MemberProfileController(MemberProfileService memberProfileService) {
        this.memberProfileService = memberProfileService;
    }

    @GetMapping
    public ResponseEntity<List<MemberProfile>> findAll() {
        return ResponseEntity.ok(memberProfileService.findAll());
    }

    @GetMapping("/pending")
    public ResponseEntity<List<MemberProfileDisplayDto>> findPendingRequests() {
        return ResponseEntity.ok(memberProfileService.getPendingProfiles());
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberProfile> findById(@PathVariable Long id) {
        return memberProfileService
                .findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/changeStatus")
    public ResponseEntity<MemberProfile> changeStatus(@PathVariable Long id, @RequestBody MembershipStatus status){
        return memberProfileService.changeStatus(id, status).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/approved")
    public ResponseEntity<List<ApprovedMemberDto>> findApprovedMembers() {
        return ResponseEntity.ok(memberProfileService.getApprovedProfiles());
    }
}
