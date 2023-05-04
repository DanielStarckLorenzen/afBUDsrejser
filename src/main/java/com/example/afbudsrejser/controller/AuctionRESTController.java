package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.model.Auction;
import com.example.afbudsrejser.model.Trip;
import com.example.afbudsrejser.repository.AuctionRepository;
import com.example.afbudsrejser.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
public class AuctionRESTController {

    @Autowired
    private AuctionRepository auctionRepository;

    @Autowired
    TripRepository tripRepository;

    @PostMapping("/auction")
    public void createAuction(@RequestBody Auction auction) {
        // Find the trip with the highest ID in the database
        List<Trip> trips = tripRepository.findAll();
        Trip trip = trips.stream().max(Comparator.comparing(Trip::getTripId)).orElse(null);

        if (trip != null) {
            // Set the trip object on the auction
            auction.setTrip(trip);

            // Save the auction to the database
            auctionRepository.save(auction);
        } else {
            throw new IllegalArgumentException("No trips found in the database");
        }
    }

    @GetMapping("/auctions")
    public List<Auction> getAuctions() {
        return auctionRepository.findAll();
    }

}
