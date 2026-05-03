package medical.association.backend.model.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import medical.association.backend.enumeration.MembershipStatus;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class MemberProfile extends BaseEntity{
    private String firstName;
    private String lastName;
    private LocalDate dateOfBirth;

    private String phone;
    private String address;

    private String institution;
    private String position;
    private String specialization;
    private String subSpecialization;

    private String licenseNumber;
    private Integer graduationYear;

    @Enumerated(EnumType.STRING)
    private MembershipStatus status;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    public MemberProfile(String firstName, String lastName, LocalDate dateOfBirth, String phone, String address, String institution,
                         String position, String specialization, String subSpecialization, String licenseNumber, Integer graduationYear) {
        this.phone = phone;
        this.position = position;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.institution = institution;
        this.specialization = specialization;
        this.subSpecialization = subSpecialization;
        this.licenseNumber = licenseNumber;
        this.graduationYear = graduationYear;
        this.status = MembershipStatus.PENDING;
    }
}
