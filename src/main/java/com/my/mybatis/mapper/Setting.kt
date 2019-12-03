package com.my.mybatis.mapper

class Setting(
    var key: String? = null,
    var value: String? = null
) {
    override fun toString(): String {
        return "Setting[$key,$value]"
    }
}
