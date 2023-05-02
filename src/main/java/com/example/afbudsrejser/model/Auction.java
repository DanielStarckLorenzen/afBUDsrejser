package com.example.afbudsrejser.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
public class Auction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "auctionid")
    private int auctionId;
    private LocalDate deadline;
    private double startingBid;
    private double highestBid;

    @OneToOne
    @JoinColumn(name = "tripid")
    private Trip trip;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;

}
