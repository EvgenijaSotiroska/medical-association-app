package medical.association.backend.model.exception;

public class PublicationNotFoundException extends RuntimeException {
    public PublicationNotFoundException(Long id) {
        super("Publication with id '%d' does not exist.".formatted(id));
    }
}