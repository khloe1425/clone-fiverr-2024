package com.fiverr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HireJobDTO {
    private int id;
    private LocalDate hireDate;
    private boolean completed;
}
