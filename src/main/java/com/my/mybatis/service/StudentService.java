package com.my.mybatis.service;

import com.my.mybatis.mapper.Student;
import com.my.mybatis.mapper.StudentMapper;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    
    private final StudentMapper studentMapper;

    public StudentService(StudentMapper studentMapper) {
        this.studentMapper = studentMapper;
    }

    public void add(Student student) throws InternalException {
        if (student.getId() != null) {
            if (studentMapper.select(student.getId()) == null) {
                studentMapper.insert(student);
            } else {
                throw new InternalException("已存在学号为" + student.getId() + "的学生数据");
            }
        } else {
            throw new InternalException("学号为空");
        }
    }

    public void remove(String id) {
        studentMapper.delete(id);
    }

    public Student get(String id) {
        return studentMapper.select(id);
    }

    public List<Student> getAll() {
        return studentMapper.selectAll();
    }

    public void modify(String id, Student student) throws InternalException {
        Student old = studentMapper.select(id);
        if (old != null) {
            if (id != student.getId() && studentMapper.select(student.getId()) != null) {
                throw new InternalException("已存在学号为" + student.getId() + "的学生数据");
            }
            studentMapper.update(id, student);
        } else {
            throw new InternalException("找不到学号为" + id + "的学生数据");
        }
    }
}
