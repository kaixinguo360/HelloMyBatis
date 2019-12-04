package com.my.mybatis.controller;

import com.my.mybatis.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/park")
public class ParkController {

    private final UserService userService;

    public ParkController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/enter", method = RequestMethod.GET)
    public MessageResponse enter(@RequestParam String name, @RequestParam String password) {
        if(name != null && password != null && userService.checkUser(name, password))
            return new MessageResponse("Success!");
        else
            return new MessageResponse("Error!");
    }

    @RequestMapping(path = "/out", method = RequestMethod.GET)
    public MessageResponse out(@RequestParam String name, @RequestParam String password) {
        if(name != null && password != null && userService.checkUser(name, password))
            return new MessageResponse("Success!");
        else
            return new MessageResponse("Error!");
    }
}
