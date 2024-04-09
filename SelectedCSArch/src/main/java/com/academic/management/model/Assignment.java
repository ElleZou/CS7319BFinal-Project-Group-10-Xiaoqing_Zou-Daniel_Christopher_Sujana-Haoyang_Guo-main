package com.academic.management.model;

import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
public class Assignment {

    private int courseId;
    private String title;
    private String description;
    private Date dueDate;

}
