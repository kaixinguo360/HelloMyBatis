package com.my.mybatis.mapper;

import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface UserMapper {

    @Insert("INSERT INTO user(" +
        "name, car, tel, parked, credit, passwd" +
        ") VALUES (" +
        "#{name}, #{car}, #{tel}, #{parked}, #{credit}, #{passwd}" +
        ")")
    void insert(User user);

    @Delete("DELETE FROM user WHERE id = #{id}")
    void delete(@Param("id") int id);

    @Select("SELECT * FROM user WHERE id = #{id}")
    User select(int id);

    @Select("SELECT * FROM user")
    List<User> selectAll();

    @Select("SELECT * FROM user where parked=true")
    List<User> selectAllParked();

    @Update("UPDATE user SET " +
        "id = #{new.id}," +
        "name = #{new.name}," +
        "car = #{new.car}," +
        "tel = #{new.tel}," +
        "parked = #{new.parked}," +
        "credit = #{new.credit}," +
        "passwd = #{new.passwd}" +
        "WHERE id = #{id}")
    void update(@Param("id") int id, @Param("new") User user);
}
