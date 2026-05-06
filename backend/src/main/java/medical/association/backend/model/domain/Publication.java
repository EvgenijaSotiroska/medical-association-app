package medical.association.backend.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import medical.association.backend.enumeration.PublicationType;
import java.time.LocalDateTime;

@Entity
@Table(name = "publications")
@Getter
@Setter
@NoArgsConstructor
public class Publication extends BaseEntity {

    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 2048)
    private String imageUrl;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private PublicationType type;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    public Publication(String title, String description,
                       String imageUrl, PublicationType type, User author) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.type = type;
        this.author = author;
        this.createdAt = LocalDateTime.now();
    }
}