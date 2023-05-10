package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.model.Trip;
import com.example.afbudsrejser.repository.BidRepository;
import com.example.afbudsrejser.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TripRESTController {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    BidRepository bidRepository;

    @GetMapping("/trips")
    public List<Trip> getTrips(){
      return tripRepository.findAll();
    }

    @PostMapping("/trip")
    public void createTrip(@RequestBody Trip trip){
      tripRepository.save(trip);
    }

    @GetMapping("/trip/{id}")
    public Trip getTrip(@PathVariable int id){
      return tripRepository.findById(id).get();
    }

    @PostMapping("/updateTrip")
    public void bid(@RequestBody Trip trip) {
      tripRepository.save(trip);
    }
}
