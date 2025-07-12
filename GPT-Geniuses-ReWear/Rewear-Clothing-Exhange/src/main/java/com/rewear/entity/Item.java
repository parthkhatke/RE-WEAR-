package com.rewear.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String category;
    private String size;
    private String type;
    private String itemcondition;
    private String tags;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;


    @Enumerated(EnumType.STRING)
    private ItemStatus status = ItemStatus.AVAILABLE;


    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
