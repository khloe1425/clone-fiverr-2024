package com.fiverr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "job_type_detail")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class JobTypeDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_type_detail_id")
    private Integer id;

    private String detailName;
    private String image;

    @ManyToOne
    @JoinColumn(name = "job_type_id", nullable = false)
    private JobType jobTypes;

    @OneToMany(mappedBy = "jobTypeDetails", cascade = CascadeType.ALL)
    private List<Job> jobs;

}