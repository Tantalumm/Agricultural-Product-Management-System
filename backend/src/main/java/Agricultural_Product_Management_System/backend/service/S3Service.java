package Agricultural_Product_Management_System.backend.service;

import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.PutObjectRequest;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;

@Service
public class S3Service {

    private String bucketName;

    @Value("${aws.accessKeyId}")
    String accessKeyId;

    @Value("${aws.secretAccessKey}")
    String secretAccessKey;
    private final AmazonS3 s3Client;

    public S3Service(@Value("${aws.s3.bucketName}") String bucketName,
                     @Value("${aws.accessKeyId}") String accessKeyId,
                     @Value("${aws.secretAccessKey}") String secretAccessKey) {
        this.bucketName = bucketName;
        this.accessKeyId = accessKeyId;
        this.secretAccessKey = secretAccessKey;

        System.out.println("Access Key Id: " + accessKeyId);
        System.out.println("Secret Access Key: " + secretAccessKey);
        System.out.println("Bucket Name: " + bucketName);

        AWSCredentials credentials = new BasicAWSCredentials(accessKeyId, secretAccessKey);
        s3Client = AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .withRegion(Regions.AP_SOUTHEAST_2)
                .build();
    }

    public String uploadFile(MultipartFile file) throws IOException {
        String originalFilename = org.springframework.util.StringUtils.cleanPath(java.util.Objects.requireNonNull(file.getOriginalFilename()));

        String keyname = String.format("images/%s", originalFilename);

        try (InputStream inputStream = file.getInputStream()) {
            s3Client.putObject(new PutObjectRequest(bucketName, keyname, inputStream, null));
        }
        return s3Client.getUrl(bucketName, keyname).toString();
    }
}
