package com.my.mybatis.mapper;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StudentMapper {
    
    // CREATE TABLE student(id INT PRIMARY KEY, name VARCHAR(255) NOT NULL, age INT NOT NULL);

    @Insert("INSERT INTO student(id, name, age) VALUES (#{id}, #{name}, #{age})")
    void insert(Student student);

    @Delete("DELETE FROM student WHERE id = #{id}")
    void delete(@Param("id") int id);

    @Select("SELECT * FROM student WHERE id = #{id}")
    Student select(int id);

    @Select("SELECT * FROM student")
    List<Student> selectAll();

    @Update("UPDATE student SET id = #{new.id}, name = #{new.name}, age = #{new.age} WHERE id = #{id}")
    void update(@Param("id") int id, @Param("new") Student student);
}
