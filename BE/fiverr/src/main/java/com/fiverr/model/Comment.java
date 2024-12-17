package com.fiverr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job jobs;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customers;

    private LocalDateTime commentDate;
    private String content;
    private Integer vote;

}