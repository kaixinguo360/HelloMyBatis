package com.my.mybatis.controller;

import com.my.mybatis.mapper.User;
import com.my.mybatis.service.InternalException;
import com.my.mybatis.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Authorization
@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public User add(@RequestBody User user) throws InternalException {
        userService.add(user);
        return user;
    }

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
            throw new InternalException("找不到学号为" + id + "的学生数据");
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<User> get() throws InternalException {
        return userService.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public User modify(@PathVariable int id, @RequestBody User user) throws InternalException {
        userService.modify(id, user);
        return user;
    }
}
