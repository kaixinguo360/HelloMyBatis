package com.my.mybatis.controller;

import com.my.mybatis.mapper.User;
import com.my.mybatis.service.InternalException;
import com.my.mybatis.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Authorization(isAdmin = true)
    @RequestMapping(method = RequestMethod.POST)
    public User add(@RequestBody User user) throws InternalException {
        userService.add(user);
        return user;
    }

    @Authorization(isAdmin = true)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public User remove(@PathVariable int id) {
        User user = userService.get(id);
        userService.remove(id);
        return user;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public User get(@PathVariable int id) throws InternalException {
        User user = userService.get(id);
        if (user != null) {
            return user;
        } else {
            throw new InternalException("找不到ID为" + id + "的用户数据");
        }
    }

    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
    public User getByName(@PathVariable String name) throws InternalException {
        User user = userService.getByName(name);
        if (user != null) {
            return user;
        } else {
            throw new InternalException("找不到名称为" + name + "的用户数据");
        }
    }

    @Authorization(isAdmin = true)
    @RequestMapping(method = RequestMethod.GET)
    public List<User> getAll() throws InternalException {
        return userService.getAll();
    }

    @Authorization(isAdmin = true)
    @RequestMapping(value = "/parked", method = RequestMethod.GET)
    public List<User> getAllParked() throws InternalException {
        return userService.getAllParked();
    }

    @Authorization()
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public User modify(@PathVariable int id, @RequestBody User user,  @CurrentUser User currentUser) throws InternalException, RequestException {
        if (currentUser.getId() != 1 && currentUser.getId() != id) {
            throw new RequestException("Unauthorized!", HttpStatus.UNAUTHORIZED);
        }
        userService.modify(id, user);
        return user;
    }

    @RequestMapping(path = "/check", method = RequestMethod.GET)
    public MessageResponse checkUser(@RequestParam String name, @RequestParam String password) {
        if(name != null && password != null && userService.checkUser(name, password))
            return new MessageResponse("Success!");
        else
            return new MessageResponse("Error!");
    }
}
