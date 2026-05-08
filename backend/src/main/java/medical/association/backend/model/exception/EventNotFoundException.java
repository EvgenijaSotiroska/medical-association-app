package medical.association.backend.model.exception;

public class EventNotFoundException extends RuntimeException {
    public EventNotFoundException(Long id) {
        super("Event with id '%d' does not exist.".formatted(id));
    }
}