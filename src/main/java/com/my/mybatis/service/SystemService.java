package com.my.mybatis.service;

import com.my.mybatis.mapper.Setting;
import com.my.mybatis.mapper.SettingMapper;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class SystemService {
    
    private final SettingMapper settingMapper;

    public SystemService(SettingMapper settingMapper) {
        this.settingMapper = settingMapper;
    }

    public void set(String key, String value) {
        settingMapper.set(key, value);
    }
    public void setAll(Map<String, String> map) {
        for (Map.Entry<String, String> entry : map.entrySet()) {
            this.set(entry.getKey(), entry.getValue());
        }
    }
    public String get(String key) {
        return settingMapper.get(key);
    }
    public Map<String, String> getAll() {
        Map<String, String> map = new HashMap<>();
        for (Setting setting : settingMapper.getAll()) {
            map.put(setting.getKey(), setting.getValue());
        }
        return map;
    }
}
