package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.model.Trip;
import com.example.afbudsrejser.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TripRESTController {

    @Autowired
    private TripRepository tripRepository;

    @GetMapping("/trips")
    public List<Trip> getTrips(){
      return tripRepository.findAll();
    }

    @PostMapping("/trip")
    public void createTrip(@RequestBody Trip trip){
      tripRepository.save(trip);
    }
}
