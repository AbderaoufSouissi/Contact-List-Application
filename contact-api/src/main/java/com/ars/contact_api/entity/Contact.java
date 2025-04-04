package com.ars.contact_api.entity;

import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import static com.fasterxml.jackson.annotation.JsonInclude.Include.NON_DEFAULT;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonInclude(NON_DEFAULT)
@Table(name = "contacts")
public class Contact {
    @Id @UuidGenerator
    @Column(name = "id",unique = true,updatable = false)
    private String id;
    private String name;
    @Column(unique = true, nullable = false )
    private String email;
    private String title;
    private String phone;
    private String address;
    private String status;
    private String photoUrl;
}
