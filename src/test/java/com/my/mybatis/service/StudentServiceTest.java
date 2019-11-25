package com.my.mybatis.service;

import com.my.mybatis.mapper.Student;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
@ActiveProfiles("test")
public class StudentServiceTest {

    @Autowired
    private StudentService studentService;

    @Test
    public void test() throws InternalException {

        // Add Student
        Student student1 = new Student("1", "李明", 20);
        Student student2 = new Student("2", "Tom", 21);
        studentService.add(student1);
        studentService.add(student2);

        // Update Student
        student1.setValue(22);
        studentService.modify("1", student1);

        // Get Student
        studentService.get("1");
        studentService.get("2");

        // Get All Student
        studentService.getAll();

        // Delete Student
        studentService.remove("1");
        studentService.remove("2");
    }

}

