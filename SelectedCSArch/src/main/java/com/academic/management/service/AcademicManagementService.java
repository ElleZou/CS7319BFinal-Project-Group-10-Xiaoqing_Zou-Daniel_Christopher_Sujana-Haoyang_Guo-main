package com.academic.management.service;

import com.academic.management.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.academic.management.repository.AcademicManagementDataOperations;
import java.util.List;

@Component
public class AcademicManagementService {

    @Autowired
    private AcademicManagementDataOperations academicManagementDataOperations;

    public List<Course> studentLogin(int studentId) {
        return academicManagementDataOperations.viewCourses(studentId);
    }

    public List<Student> professorLogin(int professorId) {
        return academicManagementDataOperations.viewStudents(professorId);
    }

    public void insertGrade(Grade grade) {
        academicManagementDataOperations.insertGrade(grade.getStudentId(), grade.getCourseId(), grade.getLetterGrade());
    }

    public List<Grade> viewGrade(int studentId, int courseId) {
        return academicManagementDataOperations.viewGrade(studentId, courseId);
    }

    public void insertAssignment(Assignment assignment) {
        academicManagementDataOperations.insertAssignment(assignment.getCourseId(), assignment.getTitle(), assignment.getDescription(), assignment.getDueDate());
    }

    public List<Assignment> viewAssignment(int studentId) {
        return academicManagementDataOperations.viewAssignment(studentId);
    }

    public void insertSubmission(Submission submission) {
        academicManagementDataOperations.insertSubmission(submission.getAssignmentId(), submission.getStudentId(), submission.getSubmissionDate());
    }

    public List<Submission> viewSubmission(int studentId) {
        return academicManagementDataOperations.viewSubmission(studentId);
    }

}
