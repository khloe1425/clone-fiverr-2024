package com.fiverr.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "customer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer id;

    private String customerName;
    private String email;
    private String passWord;
    private String phone;
    private String birthDay;
    private String gender;
    private String role;
    private String skill;
    private String certification;

    @OneToMany(mappedBy = "customers", cascade = CascadeType.ALL)
    private List<HireJob> hireJobs;

    @OneToMany(mappedBy = "customers", cascade = CascadeType.ALL)
    private List<Comment> comments;

}