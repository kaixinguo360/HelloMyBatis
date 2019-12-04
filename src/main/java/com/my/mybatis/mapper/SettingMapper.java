package com.my.mybatis.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface SettingMapper {
    
    @Select("SELECT * FROM system")
    List<Setting> getAll();
    
    @Select("SELECT value FROM `system` WHERE `key` = #{key}")
    String get(String key);

    @Update("UPDATE `system` SET `value` = #{value} WHERE `key` = #{key}")
    void set(@Param("key") String key, @Param("value") String value);
}
