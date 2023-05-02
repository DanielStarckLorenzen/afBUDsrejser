package com.example.afbudsrejser.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="userid")
    private int userId;
    private String name;
    private String email;
    private LocalDate birthDate;

    @OneToMany(mappedBy = "user")
    @JsonBackReference
    private Set<Auction> auctions;

}
