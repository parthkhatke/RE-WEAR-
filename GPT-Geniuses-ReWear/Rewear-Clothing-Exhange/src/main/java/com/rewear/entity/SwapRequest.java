package com.rewear.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class SwapRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private Item requestedItem;  // the item someone wants

    @ManyToOne
    private Item offeredItem;    // the item they offer in exchange

    @ManyToOne
    @JoinColumn(name = "requester_id") // this creates a foreign key in the DB
    private User requester;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PENDING;

    public enum Status {
        PENDING,
        ACCEPTED,
        REJECTED
    }
}