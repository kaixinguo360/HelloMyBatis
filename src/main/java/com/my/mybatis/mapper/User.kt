package com.my.mybatis.mapper

import java.sql.Timestamp

class User(
    var id: Int? = null,
    var name: String? = null,
    var car: String? = null,
    var tel: String? = null,
    var parked: Boolean? = null,
    var credit: Double? = null,
    var passwd: String? = null,
    var enterTime: Timestamp? = null
) {
    override fun toString(): String {
        return "User[$id,$name,$car]"
    }
}

