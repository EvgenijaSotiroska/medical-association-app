package medical.association.backend.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "user_files")
@Getter
@Setter
public class UserFile extends BaseEntity{

    private Long userId;
    private String storageKey;
    private String publicUrl;
    private String originalName;
    private Instant uploadedAt = Instant.now();

    public UserFile() {}

    public UserFile(Long userId, String storageKey, String publicUrl, String originalName) {
        this.userId = userId;
        this.storageKey = storageKey;
        this.publicUrl = publicUrl;
        this.originalName = originalName;
    }
}