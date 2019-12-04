package com.my.mybatis.service;

import com.my.mybatis.mapper.User;
import com.my.mybatis.mapper.UserMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Date;
import java.util.List;

@Service
public class UserService {

    private final UserMapper userMapper;
    private final SystemService systemService;

    public UserService(UserMapper userMapper, SystemService systemService) {
        this.userMapper = userMapper;
        this.systemService = systemService;
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

    public String enter(String car, String key) {
        if (!(key != null && key.equals(systemService.get("apikey")))) {
            return "API密钥校验失败!";
        }
        User user = userMapper.selectByCar(car);
        if (user == null) {
            return "没有这个用户!";
        }
        if (user.getParked()) {
            return "已在停车场内!";
        }
        if (user.getCredit() <= 0) {
            return "账户余额不足, 请先充值!";
        }
        user.setParked(true);
        user.setEnterTime(new Date());
        userMapper.update(user.getId(), user);
        return "验证通过,欢迎进入停车场!";
    }
    public String out(String car, String key) {
        if (!(key != null && key.equals(systemService.get("apikey")))) {
            return "API密钥校验失败!";
        }
        User user = userMapper.selectByCar(car);
        if (user == null) {
            return "没有这个用户!";
        }
        if (!user.getParked()) {
            return "不在停车场内!";
        }
        long now = new Date().getTime();
        long enterTime = user.getEnterTime().getTime();
        double price = Double.valueOf(systemService.get("price"));
        double hours = floor((now - enterTime) / 3600000.0);
        double charge = floor(hours * price);
        if (user.getCredit() - charge <= 0) {
            return "账户余额不足, 请先充值!";
        }
        user.setParked(false);
        user.setEnterTime(new Date());
        user.setCredit(user.getCredit() - charge);
        userMapper.update(user.getId(), user);
        return "验证通过,允许驶出停车场!本次停放"+hours+"小时, 收费"+charge+"元";
    }
    
    private double floor(double num) {
        return Math.floor(num*100)/100.0;
    }
}
