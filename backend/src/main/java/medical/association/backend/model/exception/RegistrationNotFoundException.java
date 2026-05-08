package medical.association.backend.model.exception;

public class RegistrationNotFoundException extends RuntimeException {
    public RegistrationNotFoundException() {
        super("Registration not found.");
    }
}