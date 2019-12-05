-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
                        `id` int(16) NOT NULL AUTO_INCREMENT COMMENT 'ID',
                        `name` varchar(32) NOT NULL COMMENT '用户名',
                        `car` varchar(32) NOT NULL COMMENT '车牌号',
                        `tel` varchar(32) DEFAULT NULL COMMENT '电话',
                        `parked` bool DEFAULT false COMMENT '是否已停入',
                        `credit` decimal(9,2) DEFAULT 0 COMMENT '余额',
                        `passwd` varchar(32) NOT NULL COMMENT '密码',
                        `enterTime` datetime COMMENT '时间戳',
                        PRIMARY KEY (`id`)
) DEFAULT CHARSET=utf8 COMMENT='用户表';
insert into user(id, name, passwd, car) value (1, 'admin', 'admin', '');

-- ----------------------------
-- Table structure for system
-- ----------------------------
DROP TABLE IF EXISTS `system`;
CREATE TABLE `system` (
                          `key` varchar(256) NOT NULL,
                          `value` varchar(256) DEFAULT NULL,
                          PRIMARY KEY (`key`)
) DEFAULT CHARSET=utf8 COMMENT='系统表';
insert into `system`(`key`, `value`) value ('price', '10');
insert into `system`(`key`, `value`) value ('api_key', '1234567');
insert into `system`(`key`, `value`) value ('map_url', 'https://map.qq.com/m/place/result/city=%E9%9D%92%E5%B2%9B%E5%B8%82&word=%25E5%2581%259C%25E8%25BD%25A6%25E5%259C%25BA');
insert into `system`(`key`, `value`) value ('gate_url', '');
insert into `system`(`key`, `value`) value ('recharge_url', '');

-- Test --
-- select * from `system`;
-- SELECT `value` FROM `system` WHERE `key` = 'price';

insert into user(name, passwd, car, credit) values 
       ('李华', '123', '鲁Q12345', '32.5'),
       ('王芳', '123', '鲁Q54321', '98.6'),
       ('张亮', '123', '鲁Q88888', '100');

-- Test --
-- select * from user;
-- SELECT * FROM user where parked=false;
