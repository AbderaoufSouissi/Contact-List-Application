package com.ars.contact_api.exception;


import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ResponseStatus(NOT_FOUND)
public class ApiException extends RuntimeException {
    public ApiException(String message) {
        super(message);
    }
}
