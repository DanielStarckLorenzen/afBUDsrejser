package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.model.Bid;
import com.example.afbudsrejser.repository.BidRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class BidRESTController {

    @Autowired
    BidRepository bidRepository;

    @PostMapping("/bid")
    public void bid(@RequestBody Bid bid){
        bidRepository.save(bid);
    }

    @GetMapping("/bids/{tripId}")
    public List<Bid> getBids(@PathVariable int tripId){
        System.out.println("Trip ID: " + tripId);
        return bidRepository.findAllByTrip_TripId(tripId);
    }
}
