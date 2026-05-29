package medical.association.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface SupabaseStorageService {
    String upload(MultipartFile file) throws IOException;

    String getPublicUrl(String key);

    void delete(String key);
    String uploadImage(MultipartFile file) throws IOException;
}
