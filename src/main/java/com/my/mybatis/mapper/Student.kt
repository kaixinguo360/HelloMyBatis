package com.my.mybatis.mapper

class Student(
    var id: String? = null,
    var name: String? = null,
    var value: Int? = null
) {
    override fun toString(): String {
        return "学生[$id,$name,$value]"
    }
}
