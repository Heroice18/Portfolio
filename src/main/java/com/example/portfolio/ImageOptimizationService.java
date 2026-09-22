package com.example.portfolio;

import java.io.IOException;
import java.nio.file.Path;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.stereotype.Service;

@Service
public class ImageOptimizationService {

    public void resize(Path source, Path destination, int width, int height) throws IOException {
        if (width < 1 || height < 1) {
            throw new IllegalArgumentException("Image dimensions must be positive");
        }

        Thumbnails.of(source.toFile())
                .size(width, height)
                .outputQuality(0.85)
                .toFile(destination.toFile());
    }
}