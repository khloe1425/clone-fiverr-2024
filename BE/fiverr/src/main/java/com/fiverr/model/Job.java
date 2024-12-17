package com.fiverr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "job")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Integer id;

    private String jobName;
    private Integer vote;
    private Integer price;
    private String image;
    private String description;
    private String shortDescription;
    private Integer voteJob;
    private Integer creator;

    @OneToMany(mappedBy = "jobs", cascade = CascadeType.ALL)
    private List<HireJob> hireJobs;

    @OneToMany(mappedBy = "jobs", cascade = CascadeType.ALL)
    private List<Comment> comments;

    @ManyToOne
    @JoinColumn(name = "type_detail_id", insertable = false, updatable = false)
    private JobTypeDetail jobTypeDetails;

    // Getters and Setters
}