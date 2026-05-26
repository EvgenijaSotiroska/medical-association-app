package medical.association.backend.service.impl;

import medical.association.backend.service.SupabaseStorageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

@Service
public class SupabaseStorageServiceImpl implements SupabaseStorageService {

    private final RestClient restClient;
    private final String bucket;
    private final String projectUrl;

    public SupabaseStorageServiceImpl(
            @Value("${supabase.url}") String projectUrl,
            @Value("${supabase.service-role-key}") String serviceRoleKey,
            @Value("${supabase.bucket}") String bucket
    ) {
        this.projectUrl = projectUrl;
        this.bucket = bucket;

        this.restClient = RestClient.builder()
                .baseUrl(projectUrl + "/storage/v1")
                .defaultHeader("Authorization", "Bearer " + serviceRoleKey)
                .defaultHeader("apikey", serviceRoleKey)
                .build();
    }

    @Override
    public String upload(MultipartFile file) throws IOException {
        String key = UUID.randomUUID() + "_" + file.getOriginalFilename();

        String contentType = file.getContentType() != null
                ? file.getContentType()
                : "application/octet-stream";

        restClient.post()
                .uri("/object/" + bucket + "/" + key)
                .contentType(MediaType.parseMediaType(contentType))
                .body(file.getBytes())
                .retrieve()
                .toBodilessEntity();

        return key;
    }

    @Override
    public String getPublicUrl(String key) {
        return projectUrl + "/storage/v1/object/public/" + bucket + "/" + key;
    }

    @Override
    public void delete(String key) {
        restClient.delete()
                .uri("/object/" + bucket + "/" + key)
                .retrieve()
                .toBodilessEntity();
    }
}
