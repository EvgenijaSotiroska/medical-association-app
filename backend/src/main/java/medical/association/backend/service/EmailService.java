package medical.association.backend.service;

import medical.association.backend.enumeration.MembershipStatus;

public interface EmailService {
    public void sendStatusEmail(String mailTo, String name, MembershipStatus status);
}
