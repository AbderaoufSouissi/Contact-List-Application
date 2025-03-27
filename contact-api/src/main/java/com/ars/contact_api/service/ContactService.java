package com.ars.contact_api.service;


import com.ars.contact_api.entity.Contact;
import com.ars.contact_api.exception.ApiException;
import com.ars.contact_api.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;

import static com.ars.contact_api.constant.Constant.PHOTO_DIRECTORY;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

@Service
@Slf4j
@Transactional(rollbackFor = Exception.class)
@RequiredArgsConstructor
public class ContactService {
    private final ContactRepository contactRepository;

    public Page<Contact> getAllContacts(int page, int size) {
        return contactRepository.findAll(PageRequest.of(page, size, Sort.by("name")));

    }

    public Contact getContactById(String id) {
        return contactRepository.findById(id).orElseThrow(() -> new ApiException("Contact not found"));
    }

    public Contact createContact(Contact contact) {
        return contactRepository.save(contact);
    }

    public void deleteContact(Contact contact) {
        if (contactRepository.findByEmail(contact.getEmail()).isPresent()) {
            contactRepository.delete(contact);
        }
        else {
            throw new ApiException("Contact not found");
        }

    }

    public String uploadPhoto(String id ,MultipartFile file) {
        log.info("Saving picture for user with id: {}", id);
        Contact contact = getContactById(id);
        String photoUrl = photoFunction.apply(id,file);
        contact.setPhotoUrl(photoUrl);
        contactRepository.save(contact);
        return photoUrl;
    }

    private final Function<String,String> fileExtension = (fileName) -> Optional.of(fileName)
            .filter(name -> name.contains("."))
            .map(name -> "." + name.substring(fileName.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> photoFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());
        try {
            Path fileStorageLocation = Paths.get(PHOTO_DIRECTORY).toAbsolutePath().normalize();
            if(!Files.exists(fileStorageLocation)) {
                Files.createDirectory(fileStorageLocation);
            }
            Files.copy(image.getInputStream(),fileStorageLocation.resolve(filename), REPLACE_EXISTING);
            return ServletUriComponentsBuilder.fromCurrentContextPath().path("/contacts/image/" + fileExtension.apply(image.getOriginalFilename())).toUriString();
        }catch (Exception exception) {
            throw new ApiException("Unable to save image");
        }
    };

    public Contact findByEmail(String email) {
        return contactRepository.findByEmail(email).orElseThrow(()-> new ApiException("Contact not found"));
    }
}
