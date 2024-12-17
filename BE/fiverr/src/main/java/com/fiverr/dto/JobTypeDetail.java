package com.fiverr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobTypeDetail {
    private int id;
    private String detailName;
    private String name;
}
