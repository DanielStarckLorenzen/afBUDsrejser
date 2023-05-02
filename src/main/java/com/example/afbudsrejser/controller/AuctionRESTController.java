package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.model.Auction;
import com.example.afbudsrejser.repository.AuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AuctionRESTController {

    @Autowired
    private AuctionRepository auctionRepository;

    @PostMapping("/auction")
    public void createAuction(@RequestBody Auction auction) {
        auctionRepository.save(auction);
    }

    @GetMapping("/auctions")
    public List<Auction> getAuctions() {
        return auctionRepository.findAll();
    }

}
