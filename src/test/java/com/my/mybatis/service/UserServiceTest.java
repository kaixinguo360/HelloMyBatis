package com.my.mybatis.service;

import com.my.mybatis.mapper.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

import static org.junit.Assert.assertEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class UserServiceTest {

    @Autowired
    private UserService userService;

    @Before
    public void init() {
        userService.remove(1);
        userService.remove(2);
    }


    @Test
    public void test() throws InternalException {

        // Add User
        User user1 = new User(1, "李明", "鲁Q12345", "000-1234567", false, 90.1, "123", new Date());
        User user2 = new User(2, "王芳", "鲁Q54321", "000-7654321", true, 100.0, "123", new Date());
        userService.add(user1);
        userService.add(user2);

        // Update User
        user1.setCar("鲁Q11111");
        userService.modify(1, user1);

        // Get User
        assertEquals(userService.get(1).getCar(), "鲁Q11111");
        assertEquals(userService.get(2).getCar(), "鲁Q54321");

        // Get All User
        assertEquals(userService.getAll().size(), 2);

        // Delete User
        userService.remove(1);
        userService.remove(2);
    }

}

