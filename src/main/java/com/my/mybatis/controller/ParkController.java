package com.my.mybatis.controller;

import com.my.mybatis.service.UserService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/park")
public class ParkController {

    private final UserService userService;

    public ParkController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/enter/{car}", method = RequestMethod.GET)
    public MessageResponse enter(@PathVariable String car) throws RequestException {
        return new MessageResponse(userService.enter(car));
    }

    @RequestMapping(path = "/out/{car}", method = RequestMethod.GET)
    public MessageResponse out(@PathVariable String car) throws RequestException {
        return new MessageResponse(userService.out(car));
    }
}
