package com.academic.management.controller;

import com.academic.management.model.*;
import com.academic.management.service.AcademicManagementService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
public class AcademicManagementController {

    @Autowired
    private AcademicManagementService academicManagementServiceImpl;

    @GetMapping(value = "/studentLogin/{studentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Course> studentLogin(@PathVariable("studentId") int studentId){
        return academicManagementServiceImpl.studentLogin(studentId);
    }

    @GetMapping(value = "/professorLogin/{professorId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Student> professorLogin(@PathVariable("professorId") int professorId){
        return academicManagementServiceImpl.professorLogin(professorId);
    }

    @PostMapping(value = "/insertGrade", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insertGrade(@RequestBody Grade grade){
        academicManagementServiceImpl.insertGrade(grade);
    }

    @GetMapping(value = "/viewGrade/{studentId}/{courseId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Grade> viewGrade(@PathVariable("studentId") int studentId, @PathVariable("courseId") int courseId){
        return academicManagementServiceImpl.viewGrade(studentId, courseId);
    }

    @PostMapping(value = "/insertAssignment", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insertAssignment(@RequestBody Assignment assignment){
        academicManagementServiceImpl.insertAssignment(assignment);
    }

    @GetMapping(value = "/viewAssignment/{studentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Assignment> viewAssignment(@PathVariable("studentId") int studentId){
        return academicManagementServiceImpl.viewAssignment(studentId);
    }

    @PostMapping(value = "/insertSubmission", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void insertSubmission(@RequestBody Submission submission){
        academicManagementServiceImpl.insertSubmission(submission);
    }

    @GetMapping(value = "/viewSubmission/{studentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Submission> viewSubmission(@PathVariable("studentId") int studentId){
        return academicManagementServiceImpl.viewSubmission(studentId);
    }

}
