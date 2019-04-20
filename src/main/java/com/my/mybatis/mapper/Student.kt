package com.my.mybatis.mapper

class Student(
    var id: Int? = null,
    var name: String? = null,
    var age: Int? = null
) {
    override fun toString(): String {
        return "学生[$id,$name,$age]"
    }
}
