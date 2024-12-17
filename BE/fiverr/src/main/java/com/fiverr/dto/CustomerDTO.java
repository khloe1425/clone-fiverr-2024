package com.fiverr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private int id;
    private String customerName;
    private String email;
    private String phone;
    private String birthday;
    private boolean gender;
    private String role;
    private String skill;
    private String certification;
}
