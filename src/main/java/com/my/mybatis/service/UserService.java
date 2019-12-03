package com.my.mybatis.service;

import com.my.mybatis.mapper.User;
import com.my.mybatis.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;

@Service
public class UserService {
    
    private final UserMapper userMapper;

    public UserService(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public void add(User user) throws InternalException {
        userMapper.insert(user);
    }
    public void remove(int id) {
        userMapper.delete(id);
    }
    public void modify(int id, User user) throws InternalException {
        User old = userMapper.select(id);
        if (old != null) {
            if (id != user.getId() && userMapper.select(user.getId()) != null) {
                throw new InternalException("已存在ID为" + user.getId() + "的用户数据");
            }
            userMapper.update(id, user);
        } else {
            throw new InternalException("找不到ID为" + id + "的用户数据");
        }
    }
    public User get(int id) {
        return userMapper.select(id);
    }
    public List<User> getAll() {
        return userMapper.selectAll();
    }

    public User getByName(String name) {
        return userMapper.selectByName(name);
    }
    public List<User> getAllParked() {
        return userMapper.selectAllParked();
    }
    
    public boolean checkUser(String name, String password) {
        if (StringUtils.isEmpty(name) || StringUtils.isEmpty(password)) {
            return false;
        }
        try {
            User user = userMapper.selectByName(name);
            return password.equals(user.getPasswd());
        } catch (Exception e) {
            return false;
        }
    }
}
