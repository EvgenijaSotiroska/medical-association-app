package medical.association.backend.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "event_registrations")
@Getter
@Setter
@NoArgsConstructor
public class EventRegistration extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "event_id")
    private Event event;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private User member;

    private LocalDateTime registeredAt;

    public EventRegistration(Event event, User member) {
        this.event = event;
        this.member = member;
        this.registeredAt = LocalDateTime.now();
    }
}