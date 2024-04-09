package com.academic.management.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class Course {

    private int courseId;
    private String title;
    private String description;
    private int credits;
    private int professorID;
    private List<Grade> grades;
    private Professor professor;
    private List<Assignment> assignment;
}
