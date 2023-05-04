package com.example.afbudsrejser.controller;

import com.example.afbudsrejser.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class UserRESTController {

    @Autowired
    private UserRepository userRepository;


}
