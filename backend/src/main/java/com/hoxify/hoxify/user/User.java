package com.hoxify.hoxify.user;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private long id;
    @NotNull(message = "{hoaxify.constrains.username.NotNull.message}")  // bean validation on the model
    @Size(min = 4, max = 255)
    private String username;
    @NotNull
    @Size(min = 4, max = 255)
    private String displayName;
    @NotNull
    @Size(min = 8, max = 255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$" , message = "{hoaxify.constrains.password.pattern.message}")
    private String password;

}
