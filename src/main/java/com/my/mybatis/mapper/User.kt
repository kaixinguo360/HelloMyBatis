package com.my.mybatis.mapper

class User(
    var id: Int? = null,
    var name: String? = null,
    var car: String? = null,
    var tel: String? = null,
    var parked: Boolean? = null,
    var credit: Double? = null,
    var passwd: String? = null
) {
    override fun toString(): String {
        return "User[$id,$name,$car]"
    }
}

