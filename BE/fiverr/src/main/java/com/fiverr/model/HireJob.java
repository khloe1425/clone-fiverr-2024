package com.fiverr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "hire_job")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class HireJob {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hire_job_id")
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job jobs;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customers;

    private LocalDateTime date;
    private boolean completed;
}