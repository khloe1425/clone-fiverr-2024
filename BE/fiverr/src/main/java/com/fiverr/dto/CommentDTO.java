package com.fiverr.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentDTO {
    private int id;
    private int jobId;
    private int customerId;
    private LocalDate commentDate;
    private String content;
    private int vote;
}
