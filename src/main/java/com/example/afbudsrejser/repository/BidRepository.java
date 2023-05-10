package com.example.afbudsrejser.repository;

import com.example.afbudsrejser.model.Bid;
import com.example.afbudsrejser.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BidRepository extends JpaRepository<Bid, Integer> {

    List<Bid> findAllByTrip_TripId(int tripId);
}
