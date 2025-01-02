package org.boot.projectboard.posts.Controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Controller
@RequestMapping("/adm/")
public class CkeditorFileUploadController {

    private static final String UPLOAD_DIR = "src/main/resources/static/img/";

    @PostMapping("/fileupload.do")
    @ResponseBody
    public Map<String, Object> fileUpload(
            @RequestParam("upload") MultipartFile upload,
            HttpServletRequest request,
            HttpServletResponse response) {

        Map<String, Object> resultMap = new HashMap<>();

        try {
            if (upload == null || upload.isEmpty()) {
                throw new IOException("No file uploaded");
            }

            // 파일 확장자 검사
            String fileName = upload.getOriginalFilename();
            String ext = fileName.substring(fileName.lastIndexOf(".") + 1).toLowerCase();

            if (!isAllowedExtension(ext)) {
                throw new IOException("Invalid file type");
            }

            // 새 파일명 생성 (UUID)
            String newFileName = UUID.randomUUID().toString() + "." + ext;

            // 업로드 디렉토리 생성
            Path uploadPath = Paths.get(UPLOAD_DIR);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 파일 저장
            Path filePath = uploadPath.resolve(newFileName);
            Files.write(filePath, upload.getBytes());

            // CKEditor 4 응답 형식
            String fileUrl = "/img/" + newFileName;

            resultMap.put("uploaded", 1);
            resultMap.put("fileName", newFileName);
            resultMap.put("url", fileUrl);

        } catch (IOException e) {
            resultMap.put("uploaded", 0);
            resultMap.put("error", new HashMap<String, String>() {{
                put("message", "Failed to upload file: " + e.getMessage());
            }});
        }

        return resultMap;
    }

    private boolean isAllowedExtension(String ext) {
        return ext.equals("jpg") || ext.equals("jpeg") ||
                ext.equals("png") || ext.equals("gif") ||
                ext.equals("webp");
    }
}