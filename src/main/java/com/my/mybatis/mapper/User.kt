package com.my.mybatis.mapper

import java.util.*

class User(
    var id: Int? = null,
    var name: String? = null,
    var car: String? = null,
    var tel: String? = null,
    var parked: Boolean = false,
    var credit: Double = 0.0,
    var passwd: String? = null,
    var enterTime: Date? = null
) {
    override fun toString(): String {
        return "User[$id,$name,$car]"
    }
}

