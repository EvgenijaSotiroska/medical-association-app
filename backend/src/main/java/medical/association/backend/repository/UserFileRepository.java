package medical.association.backend.repository;

import medical.association.backend.model.domain.UserFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFileRepository extends JpaRepository<UserFile, Long> {
    List<UserFile> findByUserId(Long userId);
    Optional<UserFile> findByIdAndUserId(Long id, Long userId);
}
