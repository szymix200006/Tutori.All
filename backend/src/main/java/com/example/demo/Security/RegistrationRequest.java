package com.example.demo.Security;

import com.example.demo.Validation.FieldsValueMatch;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.annotation.processing.Generated;

@Getter
@Setter
@Builder
@FieldsValueMatch(
        field = "password",
        matchField = "repeatPassword",
        message = "Passwords don't match!"
)
public class RegistrationRequest {

    @NotEmpty(message = "Username is mandatory")
    @NotBlank(message = "Username is mandatory")
    private String username;
    @Email(message = "Email is not formatted")
    @NotEmpty(message = "Email is mandatory")
    @NotBlank(message = "Email is mandatory")
    private String email;
    @NotEmpty(message = "Password is mandatory")
    @NotBlank(message = "Password is mandatory")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String password;
    @NotEmpty(message = "Repeat Password is mandatory")
    @NotBlank(message = "Repeat Password is mandatory")
    @Size(min = 8, message = "Password should be at least 8 characters long")
    private String repeatPassword;
}
