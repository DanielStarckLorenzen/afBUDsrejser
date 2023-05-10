package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.model.User;
import com.example.afbudsrejser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class UserRESTController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public User login(@RequestBody User user){
        System.out.println(user.getEmail() + " " + user.getPassword());
        return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
    }

    @PostMapping("/user")
    public void createUser(@RequestBody User user){
        userRepository.save(user);
    }


}
