package medical.association.backend.model.domain;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import medical.association.backend.enumeration.EventType;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "events")
@Getter
@Setter
@NoArgsConstructor
public class Event extends BaseEntity{
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    private LocalDate eventDate;
    private String location;
    @Column(length = 2048)
    private String imageUrl;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private EventType type;

    @ManyToOne
    @JoinColumn(name = "author_id")
    private User author;

    public Event(String title, String description, LocalDate eventDate,
                 String location, String imageUrl, EventType type, User author) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.location = location;
        this.imageUrl = imageUrl;
        this.type = type;
        this.author = author;
        this.createdAt = LocalDateTime.now();
    }

}
