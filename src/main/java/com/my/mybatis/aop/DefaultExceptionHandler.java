package com.my.mybatis.aop;

import com.my.mybatis.controller.ErrorResponse;
import com.my.mybatis.controller.RequestException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
class DefaultExceptionHandler {

    @ExceptionHandler(value = RequestException.class)
    public ResponseEntity requestExceptionHandler(RequestException e) {
        HttpStatus status = e.getStatus();
        return new ResponseEntity<>(new ErrorResponse(e.getMessage(), status), status);
    }
}
