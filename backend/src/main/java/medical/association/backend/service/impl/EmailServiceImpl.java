package medical.association.backend.service.impl;

import medical.association.backend.enumeration.MembershipStatus;
import medical.association.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.scheduling.annotation.Async;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    private JavaMailSender mailSender;

    @Async
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

    @Override
    public void sendPasswordResetEmail(String mailTo, String resetLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(mailTo);
        message.setSubject("Ресетирање на лозинка");
        message.setText("Почитуван/а,\n\n" +
                "Примивме барање за ресетирање на вашата лозинка.\n\n" +
                "Кликнете на линкот подолу за да поставите нова лозинка:\n" +
                resetLink + "\n\n" +
                "Линкот е валиден 1 час.\n\n" +
                "Доколку не сте го побарале ова, игнорирајте го мејлот.\n\n" +
                "Здружение на интернисти на РСМ");
        mailSender.send(message);
    }
}
