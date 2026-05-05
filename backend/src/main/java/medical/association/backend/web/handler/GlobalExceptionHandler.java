package medical.association.backend.web.handler;

import medical.association.backend.model.exception.AccountNotApprovedException;
import medical.association.backend.model.exception.IncorrectPasswordException;
import medical.association.backend.model.exception.UserNotFoundException;
import medical.association.backend.model.exception.UsernameAlreadyExistsException;
import medical.association.backend.web.dto.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UsernameAlreadyExistsException.class)
    public ResponseEntity<ApiError> handleUsernameAlreadyExists(UsernameAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(ApiError.of(HttpStatus.CONFLICT, ex.getMessage()));
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiError> handleUserNotFound(UserNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ApiError.of(HttpStatus.NOT_FOUND, ex.getMessage()));
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<ApiError> handleIncorrectPassword(IncorrectPasswordException ex) {
        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body(ApiError.of(HttpStatus.UNAUTHORIZED, ex.getMessage()));
    }

    @ExceptionHandler(AccountNotApprovedException.class)
    public ResponseEntity<ApiError> handleAccountNotApproved(AccountNotApprovedException ex) {
        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(ApiError.of(HttpStatus.FORBIDDEN, ex.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(err -> err.getField() + ": " + err.getDefaultMessage())
                .collect(Collectors.joining(", "));

        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ApiError.of(HttpStatus.BAD_REQUEST, message));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiError> handleGeneric(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiError.of(HttpStatus.INTERNAL_SERVER_ERROR, "Unexpected error."));
    }
}
