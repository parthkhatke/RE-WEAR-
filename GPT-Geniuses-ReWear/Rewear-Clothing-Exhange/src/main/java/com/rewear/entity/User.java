// User.java
package com.rewear.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String password;

    private int points = 0;

    private String profileImageUrl;

    @Enumerated(EnumType.STRING)
    private Role role = Role.USER;  // Default to USER
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Item> items;

}
