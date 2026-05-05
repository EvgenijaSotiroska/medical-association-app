package medical.association.backend.model.exception;

public class AccountNotApprovedException extends RuntimeException {
    public AccountNotApprovedException() {
        super("The account has not been approved yet.");
    }
}
