package com.academic.management.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Getter
@Setter
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Submission {

    private int assignmentId;
    private int studentId;
    private Date submissionDate;
    private Assignment assignment;

}
