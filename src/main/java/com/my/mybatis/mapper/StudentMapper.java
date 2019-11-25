package com.my.mybatis.mapper;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface StudentMapper {
    
    // CREATE TABLE student(id INT PRIMARY KEY, name VARCHAR(255) NOT NULL, value INT NOT NULL);

    @Insert("INSERT INTO student(id, name, value) VALUES (#{id}, #{name}, #{value})")
    void insert(Student student);

    @Delete("DELETE FROM student WHERE id = #{id}")
    void delete(@Param("id") String id);

    @Select("SELECT * FROM student WHERE id = #{id}")
    Student select(String id);

    @Select("SELECT * FROM student")
    List<Student> selectAll();

    @Update("UPDATE student SET id = #{new.id}, name = #{new.name}, value = #{new.value} WHERE id = #{id}")
    void update(@Param("id") String id, @Param("new") Student student);
}
