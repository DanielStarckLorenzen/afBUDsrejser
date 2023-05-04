package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.model.Auction;
import com.example.afbudsrejser.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class AuctionRESTController {

    @Autowired
    private AuctionRepository auctionRepository;

    @PostMapping("/auction")
    public void createAuction(@RequestBody Auction auction) {
        System.out.printf("Auction: %s%n", auction);
        auctionRepository.save(auction);
    }

    @GetMapping("/auctions")
    public List<Auction> getAuctions() {
        return auctionRepository.findAll();
    }

}
