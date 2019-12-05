package com.my.mybatis.service;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.client.RestTemplate;

@Service
public class GateService {

    private final SystemService systemService;
    private final RestTemplate restTemplate;

    public GateService(SystemService systemService, RestTemplate restTemplate) {
        this.systemService = systemService;
        this.restTemplate = restTemplate;
    }

    public void openGate() {
        String url = systemService.get("gate_url");
        if (StringUtils.isEmpty(url))
            return;
        try {
            restTemplate.getForEntity(url, String.class);
        } catch (Exception e) {
            System.out.println("门禁服务异常!");
        }
    }
}
