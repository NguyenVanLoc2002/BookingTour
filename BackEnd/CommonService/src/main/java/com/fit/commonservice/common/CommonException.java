package com.fit.commonservice.common;

import lombok.Data;
import org.springframework.http.HttpStatus;

@Data
public class CommonException extends RuntimeException{
    private final String code;
    private final String message;
    private final HttpStatus httpStatus;

    public CommonException(String code, String message, HttpStatus httpStatus) {
        super(message);
        this.code = code;
        this.message = message;
        this.httpStatus = httpStatus;
    }


}
