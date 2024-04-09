package com.academic.management.repository;

import com.academic.management.model.*;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.sql.*;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class AcademicManagementDataOperations {

    private Connection connection;

    public AcademicManagementDataOperations() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/academic_management", "root", "password");
        } catch (Exception e) {
            System.out.println("Exception while creating the connection - " + e.getMessage());
        }
    }

    private static String createQueryForCourses(int length) {
        String query = "SELECT * from Courses where courseID in (";
        StringBuilder queryBuilder = new StringBuilder(query);
        for (int i = 0; i < length; i++) {
            queryBuilder.append(" ?");
            if (i != length - 1)
                queryBuilder.append(",");
        }
        queryBuilder.append(")");
        return queryBuilder.toString();
    }

    private static String createQueryForStudents(int length) {
        String query = "SELECT * from Students where studentID in (";
        StringBuilder queryBuilder = new StringBuilder(query);
        for (int i = 0; i < length; i++) {
            queryBuilder.append(" ?");
            if (i != length - 1)
                queryBuilder.append(",");
        }
        queryBuilder.append(")");
        return queryBuilder.toString();
    }

    private static String createQueryForAssignment(int length) {
        String query = "SELECT * from Assignments where courseID in (";
        StringBuilder queryBuilder = new StringBuilder(query);
        for (int i = 0; i < length; i++) {
            queryBuilder.append(" ?");
            if (i != length - 1)
                queryBuilder.append(",");
        }
        queryBuilder.append(")");
        return queryBuilder.toString();
    }

    public List<Course> viewCourses(int studentId) {
        List<Course> courses = new ArrayList<>();
        ResultSet resultSet = null;
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT courseID FROM Enrollments WHERE studentID = ?");
            statement.setInt(1, studentId);
            resultSet = statement.executeQuery();
            List<Integer> courseIds = new ArrayList<>();
            while (resultSet.next()) {
                int courseId = resultSet.getInt("CourseID");
                courseIds.add(courseId);
            }
            if(!CollectionUtils.isEmpty(courseIds)){
                String query = createQueryForCourses(courseIds.size());
                PreparedStatement ps = connection.prepareStatement(query);
                int parameterIndex = 1;
                for (Integer id : courseIds) {
                    ps.setInt(parameterIndex++, id);
                }
                resultSet = ps.executeQuery();
                while (resultSet.next()) {
                    Course course = new Course();
                    course.setCourseId(resultSet.getInt("CourseID"));
                    course.setTitle(resultSet.getString("Title"));
                    course.setDescription(resultSet.getString("Description"));
                    course.setCredits(resultSet.getInt("Credits"));
                    course.setProfessorID(resultSet.getInt("ProfessorID"));
                    course.setGrades(viewGrade(studentId, course.getCourseId()));
                    course.setProfessor(viewProfessor(course.getProfessorID()));
                    course.setAssignment(viewAssignment(studentId));
                    courses.add(course);
                }
                ps.close();
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.out.println("Exception while getting courses - " + e.getMessage());
        }
        return courses;
    }

    public List<Student> viewStudents(int professorId) {
        List<Student> students = new ArrayList<>();
        ResultSet resultSet = null;
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT courseID FROM Courses WHERE professorID = ?");
            statement.setInt(1, professorId);
            resultSet = statement.executeQuery();
            int courseId = 0;
            while (resultSet.next()) {
                courseId = resultSet.getInt("CourseID");
            }
            if(courseId != 0){
                statement = connection.prepareStatement("SELECT studentID FROM Enrollments WHERE courseID = ?");
                statement.setInt(1, courseId);
                resultSet = statement.executeQuery();
                List<Integer> studentIds = new ArrayList<>();
                while (resultSet.next()) {
                    int studentId = resultSet.getInt("StudentID");
                    studentIds.add(studentId);
                }
                if(!CollectionUtils.isEmpty(studentIds)){
                    String query = createQueryForStudents(studentIds.size());
                    PreparedStatement ps = connection.prepareStatement(query);
                    int parameterIndex = 1;
                    for (Integer id : studentIds) {
                        ps.setInt(parameterIndex++, id);
                    }
                    resultSet = ps.executeQuery();
                    while (resultSet.next()) {
                        Student student = new Student();
                        student.setStudentId(resultSet.getInt("StudentID"));
                        student.setFirstName(resultSet.getString("FirstName"));
                        student.setLastName(resultSet.getString("SecondName"));
                        student.setEmail(resultSet.getString("Email"));
                        student.setPhoneNumber(resultSet.getString("PhoneNumber"));
                        student.setMajor(resultSet.getString("Major"));
                        student.setEnrollmentYear(resultSet.getString("EnrollmentYear"));
                        student.setSubmissionList(viewSubmission(student.getStudentId()));
                        students.add(student);
                    }
                    ps.close();
                }
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.out.println("Exception while getting the students - " + e.getMessage());
        }
        return students;
    }

    public void insertGrade(int studentId, int courseId, String letterGrade) {
        try {
            String query =  "INSERT INTO Grades (StudentID, CourseID, LetterGrade) VALUES (?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, studentId);
            preparedStatement.setInt(2, courseId);
            preparedStatement.setString(3, letterGrade);
            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            System.out.println("Exception while inserting grade - " + e.getMessage());
        }
    }

    public List<Grade> viewGrade(int studentId, int courseId) {
        List<Grade> grades = new ArrayList<>();
        try {
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * FROM Grades WHERE StudentID = ? AND CourseID = ?");
            statement.setInt(1, studentId);
            statement.setInt(2, courseId);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Grade grade = new Grade();
                grade.setStudentId(resultSet.getInt("StudentID"));
                grade.setCourseId(resultSet.getInt("CourseID"));
                grade.setLetterGrade(resultSet.getString("LetterGrade"));
                grades.add(grade);
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.out.println("Exception while getting grades - " + e.getMessage());
        }
        return grades;
    }

    public void insertAssignment(int courseId, String title, String description, Date dueDate) {
        try {
            String query =  "INSERT INTO Assignments (CourseID, Title, Description, DueDate) VALUES (?, ?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, courseId);
            preparedStatement.setString(2, title);
            preparedStatement.setString(3, description);

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            Calendar cal = Calendar.getInstance();
            cal.add(Calendar.DAY_OF_MONTH, 10);

            //preparedStatement.setDate(4, new java.sql.Date(cal.getTimeInMillis()));
            preparedStatement.setDate(4, dueDate);
            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            System.out.println("Exception while inserting assignment - " + e.getMessage());
        }
    }

    public void insertSubmission(int assignmentId, int studentId, Date submissionDate) {
        try {
            String query =  "INSERT INTO Submissions (AssignmentID, StudentID, SubmissionDate) VALUES (?, ?, ?)";
            PreparedStatement preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, assignmentId);
            preparedStatement.setInt(2, studentId);
            preparedStatement.setDate(3, submissionDate);
            preparedStatement.execute();
            preparedStatement.close();
        } catch (SQLException e) {
            System.out.println("Exception while inserting submission - " + e.getMessage());
        }
    }

    public List<Submission> viewSubmission(int studentId) {
        List<Submission> submissions = new ArrayList<>();
        try {
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * FROM Submissions WHERE StudentID = ?");
            statement.setInt(1, studentId);
            ResultSet resultSet = statement.executeQuery();
            while (resultSet.next()) {
                Submission submission = new Submission();
                submission.setAssignmentId(resultSet.getInt("AssignmentID"));
                submission.setStudentId(resultSet.getInt("StudentID"));
                submission.setSubmissionDate(resultSet.getDate("SubmissionDate"));
                submission.setAssignment(viewAssignment(submission.getStudentId()).get(0));
                submissions.add(submission);
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.out.println("Exception while viewing submissions - " + e.getMessage());
        }
        return submissions;
    }

    public List<Assignment> viewAssignment(int studentId) {
        List<Assignment> assignments = new ArrayList<>();
        ResultSet resultSet = null;
        try {
            PreparedStatement statement = connection.prepareStatement("SELECT courseID FROM Enrollments WHERE studentID = ?");
            statement.setInt(1, studentId);
            resultSet = statement.executeQuery();
            List<Integer> courseIds = new ArrayList<>();
            while (resultSet.next()) {
                int courseId = resultSet.getInt("CourseID");
                courseIds.add(courseId);
            }
            if(!CollectionUtils.isEmpty(courseIds)){
                String query = createQueryForAssignment(courseIds.size());
                PreparedStatement ps = connection.prepareStatement(query);
                int parameterIndex = 1;
                for (Integer id : courseIds) {
                    ps.setInt(parameterIndex++, id);
                }
                resultSet = ps.executeQuery();
                while (resultSet.next()) {
                    Assignment assignment = new Assignment();
                    assignment.setCourseId(resultSet.getInt("CourseID"));
                    assignment.setTitle(resultSet.getString("Title"));
                    assignment.setDescription(resultSet.getString("Description"));
                    assignment.setDueDate(resultSet.getDate("DueDate"));
                    assignments.add(assignment);
                }
                ps.close();
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.out.println("Exception while viewing assignments - " + e.getMessage());
        }
        return assignments;

    }

    public Professor viewProfessor(int professorId) {
        Professor professor = new Professor();
        try {
            PreparedStatement statement = connection.prepareStatement(
                    "SELECT * FROM Professors WHERE ProfessorID = ?");
            statement.setInt(1, professorId);
            ResultSet resultSet = statement.executeQuery();

            while (resultSet.next()) {
                professor.setProfessorId(resultSet.getInt("ProfessorID"));
                professor.setName(resultSet.getString("Name"));
                professor.setEmail(resultSet.getString("Email"));
                professor.setDepartment(resultSet.getString("Department"));
            }
            resultSet.close();
            statement.close();
        } catch (SQLException e) {
            System.out.println("Exception while viewing professor - " + e.getMessage());
        }
        return professor;
    }

}
