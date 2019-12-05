package com.my.mybatis.controller;

import com.my.mybatis.service.SystemService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/system")
public class SystemController {

    private final SystemService systemService;

    public SystemController(SystemService systemService) {
        this.systemService = systemService;
    }

    @RequestMapping(value = "/{key}", method = RequestMethod.GET)
    public String get(@PathVariable String key) {
        return systemService.get(key);
    }

    @Authorization()
    @RequestMapping(method = RequestMethod.GET)
    public Map<String, String> getAll() {
        return systemService.getAll();
    }
    
    @Authorization(isAdmin = true)
    @RequestMapping(method = RequestMethod.PUT)
    public MessageResponse setAll(@RequestBody Map<String, String> settings) {
        systemService.setAll(settings);
        return new MessageResponse("Success!");
    }

}
