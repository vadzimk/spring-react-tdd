package com.hoxify.hoxify.shared;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor // needed to convert back to GenericResponse by Jackson library
public class GenericResponse {
    private String message;

    public GenericResponse(String message) {
        this.message = message;
    }
}
