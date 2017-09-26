package com.sadetec.service;

import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Path;
import java.util.stream.Stream;

public interface StorageService {

    void init();

    void store(MultipartFile file);

    Stream<Path> loadAll();

    Path load(String filename);

    Resource loadAsResource(String filename);
    
    InputStream loadAsStream(String filename);
    
    OutputStream openOutPutStream(String filename);

    void deleteAll();

	Path store(String prePath, MultipartFile file);

}
