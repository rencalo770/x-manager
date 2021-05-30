-- 规则前端以这些表为基础运行
-- 创建数据库
create database if not exists `rules_manage`;

use `rules_manage`;

-- 创建部门信息表
create table if not exists `bu_t`(
    id int primary key auto_increment comment '部门id',
    name varchar(256) comment '部门名称',
    create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    unique key b_name(`name`) --- 防止有同名的部门
)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment='部门信息表';

-- 创建场景信息表
create table if not exists `scene_t`(
    id int primary key auto_increment comment '场景id',
    name varchar(128) comment '场景名称',
    bid int comment '部门id,bu_t表的自增id; 不可为空, 场景必须依部门存在',
    eid int comment '执行模式id, 1:顺序模式,2:并发模式,3:混合模式,4:逆混合模式,5.DAG模式;每一个场景必须有对应的执行模式',
    create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    key `idx_bid`(`bid`),
    unique key b_s(`name`, `bid`)  --- 防止一个部门下有同名的场景
)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment='场景信息表';

-- 创建规则信息表
create table if not exists `rules_t`(
    id int primary key auto_increment comment '规则id',
    name varchar(128) unique key comment '规则名称',
    description varchar(128) comment '规则描述',
    salience int comment '规则优先级',
    content varchar(4096) comment '规则体',
    status int comment '规则是否启用标志位; 0:停用,1:启用',
    bid int comment '部门id,bu_t表的自增id; 不可为空, 场景必须依部门存在',
    sid int comment '场景id,指明规则属于哪个场景',
    username varchar(128) comment '创建或修改此规则的用户名',
    create_time timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_time timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    key `idx_bid`(`bid`),
    key `idx_sid`(`sid`),
    key `idx_status`(`status`),
    unique key b_s_r(`bid`, `sid`, `name`) --- 防止一个部门的一个场景下有同名的规则
)ENGINE=InnoDB DEFAULT CHARSET=utf8 comment='规则明细表';
