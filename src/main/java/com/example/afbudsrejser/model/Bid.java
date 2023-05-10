package com.example.afbudsrejser.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="bidid")
    private int bidId;
    private double bidAmount;
    private String bidDate;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

    @ManyToOne
    @JoinColumn(name = "tripid")
    private Trip trip;
}
