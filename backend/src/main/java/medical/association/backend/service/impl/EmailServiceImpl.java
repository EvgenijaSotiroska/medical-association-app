package medical.association.backend.service.impl;

import medical.association.backend.enumeration.MembershipStatus;
import medical.association.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendStatusEmail(String mailTo, String name, MembershipStatus status) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailTo);

        if (status == MembershipStatus.APPROVED) {
            message.setSubject("Одобрено членство");
            message.setText("Почитуван/а " + name + ",\n\n" +
                    "Вашето барање за членство е одобрено. Добредојдовте!\n\n" +
                    "Здружение на интернисти на РСМ");
        } else if (status == MembershipStatus.REJECTED) {
            message.setSubject("Одбиено членство");
            message.setText("Почитуван/а " + name + ",\n\n" +
                    "За жал, вашето барање за членство е одбиено.\n\n" +
                    "Здружение на интернисти на РСМ");
        }

        mailSender.send(message);
    }
}
