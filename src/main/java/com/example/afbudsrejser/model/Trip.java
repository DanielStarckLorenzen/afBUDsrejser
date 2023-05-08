package com.example.afbudsrejser.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class Trip {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="tripid")
    private int tripId;
    private String destinationCity;
    private String destinationCountry;
    private String airline;
    private String flightNo;
    private LocalDate departureDate;
    private LocalDate returnDate;
    private String hotel;
    private LocalDate deadline;
    private double startingBid;
    private double highestBid;
    private String pictureUrl;

    @ManyToOne
    @JoinColumn(name = "userid")
    private User user;


}
