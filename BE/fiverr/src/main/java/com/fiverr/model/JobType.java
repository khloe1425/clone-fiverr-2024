package com.fiverr.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "job_type")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_type_id")
    private Integer id;

    private String jobTypeName;

    @OneToMany(mappedBy = "jobTypes", cascade = CascadeType.ALL)
    private List<JobTypeDetail> jobTypeDetails;

}
