package com.my.mybatis.controller;

import com.my.mybatis.mapper.Student;
import com.my.mybatis.service.InternalException;
import com.my.mybatis.service.StudentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @RequestMapping(method = RequestMethod.POST)
    public Student add(@RequestBody Student student) throws InternalException {
        studentService.add(student);
        return student;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public Student remove(@PathVariable int id) {
        Student student = studentService.get(id);
        studentService.remove(id);
        return student;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public Student get(@PathVariable int id) throws InternalException {
        Student student = studentService.get(id);
        if (student != null) {
            return student;
        } else {
            throw new InternalException("找不到学号为" + id + "的学生数据");
        }
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Student> get() throws InternalException {
        return studentService.getAll();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public Student modify(@PathVariable int id, @RequestBody Student student) throws InternalException {
        studentService.modify(id, student);
        return student;
    }
}
