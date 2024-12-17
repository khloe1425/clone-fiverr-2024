package com.fiverr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobDTO {
    private int id;
    private String jobName;
    private int vote;
    private int price;
    private String image;
    private String description;
    private String shortDescription;
    private int voteJob;
    private int creator;
}
