package Agricultural_Product_Management_System.backend.service;

import org.springframework.stereotype.Service;

import com.amazonaws.services.s3.AmazonS3;

import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Configuration;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;

import java.net.URL;
import java.time.Duration;

@Service
public class S3PresignService {

        private final S3Presigner s3Presigner;

        @Value("${aws.accessKeyId}")
        String accessKeyId;

        @Value("${aws.secretAccessKey}")
        String secretAccessKey;

        public S3PresignService(
                        @Value("${aws.accessKeyId}") String accessKeyId,
                        @Value("${aws.secretAccessKey}") String secretAccessKey) {

                this.accessKeyId = accessKeyId;
                this.secretAccessKey = secretAccessKey;

                System.out.println("Access Key Id: " + accessKeyId);
                System.out.println("Secret Access Key: " + secretAccessKey);

                Region region = Region.AP_SOUTHEAST_2;

                AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);

                this.s3Presigner = S3Presigner.builder()
                                .region(region)
                                .credentialsProvider(StaticCredentialsProvider.create(credentials))
                                .serviceConfiguration(S3Configuration.builder()
                                                .checksumValidationEnabled(false)
                                                .build())
                                .build();
        }

        public URL generateGetUrl(String bucket, String key, int expirationSeconds) {
                GetObjectRequest get = GetObjectRequest.builder()
                                .bucket(bucket)
                                .key(key)
                                .build();

                GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                                .signatureDuration(Duration.ofSeconds(expirationSeconds))
                                .getObjectRequest(get)
                                .build();

                return s3Presigner.presignGetObject(presignRequest).url();
        }
}
