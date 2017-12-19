CREATE TABLE IF NOT EXISTS `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `login_name` VARCHAR(100) NOT NULL COMMENT '登录名',
  `password` VARCHAR(100) NOT NULL COMMENT '密码',
  `name` VARCHAR(100) NOT NULL COMMENT '姓名',
  `email` VARCHAR(200) NULL COMMENT '邮件',
  `phone` VARCHAR(200) NULL COMMENT '电话',
  `mobile` VARCHAR(200) NULL COMMENT '手机',
  `enabled` CHAR(1) NULL DEFAULT '1' COMMENT '是否可用\n1：可用\n0：停用',
  `remarks` VARCHAR(255) NULL COMMENT '备注',
  `create_date` DATETIME NULL COMMENT '创建时间',
  `update_date` DATETIME NULL COMMENT '更新时间',
  `del_flag` CHAR(1) NULL DEFAULT 0 COMMENT '删除标记\n1：删除\n0：未删除',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `login_name_UNIQUE` (`login_name` ASC))
  ENGINE = InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT = '系统用户';

CREATE TABLE IF NOT EXISTS `sys_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT '角色名称',
  `enabled` CHAR(1) NULL DEFAULT '1' COMMENT '是否可用\n1：可用\n0：停用',
  `remarks` VARCHAR(255) NULL COMMENT '备注',
  `create_date` DATETIME NULL COMMENT '创建时间',
  `update_date` DATETIME NULL COMMENT '更新时间',
  `del_flag` CHAR(1) NULL DEFAULT 0 COMMENT '删除标记\n1：删除\n0：未删除',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
  ENGINE = InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT = '系统角色';  

CREATE TABLE IF NOT EXISTS `sys_user_role` (
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`user_id`, `role_id`))
  ENGINE = InnoDB DEFAULT CHARSET=utf8 COMMENT = '用户角色';

INSERT INTO `sys_user`(`login_name`, `password`, `name`, `email`, `phone`, `mobile`, `enabled`, `remarks`, `create_date`, `update_date`, `del_flag`) VALUES ('admin', 'admin', '系统管理员', '', '', '', '1', '超级管理员', '2016-10-08 19:53:46', '2017-02-10 17:21:30', '0');
INSERT INTO `sys_user`(`login_name`, `password`, `name`, `email`, `phone`, `mobile`, `enabled`, `remarks`, `create_date`, `update_date`, `del_flag`) VALUES ('user', 'password', '用户', '', '', '', '1', '用户', '2016-10-08 19:53:46', '2017-02-10 17:21:30', '0');
INSERT INTO `sys_role`(`name`, `enabled`, `remarks`, `create_date`, `update_date`, `del_flag`) VALUES ('ROLE_ADMIN', '1', '管理员角色', '2016-10-09 15:13:21', '2016-12-26 19:28:03', '0'), ('ROLE_USER', '1', '用户角色', '2016-10-09 15:13:24', '2016-10-14 10:44:16', '0');
INSERT INTO `sys_user_role` VALUES ('1', '1'), ('1', '2');

CREATE TABLE IF NOT EXISTS `category` (
  `category_code` varchar(256) NOT NULL,
  `category_name` varchar(256) NOT NULL,
  `category_url` varchar(512),
  `category_level` int(11),
  `parent_code` varchar(256),
  `has_child_category` boolean,
  `proc_by` VARCHAR(255) NULL COMMENT '多处理线程时每个线程标识',
  `proc_flag` boolean COMMENT '处理标记\n1：已完成\n0：未完成',
  `create_date` DATETIME NULL COMMENT '创建时间',
  `update_date` DATETIME NULL COMMENT '更新时间',
  PRIMARY KEY (`category_code`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `series` (
  `series_code` varchar(256) NOT NULL,
  `series_name` varchar(256) NOT NULL,
  `series_url` varchar(512) NOT NULL,
  `brd_name` varchar(256),
  `brd_code` varchar(256),
  `category_code` varchar(256),
  `proc_by` VARCHAR(255) NULL COMMENT '多处理线程时每个线程标识',
  `proc_flag` boolean COMMENT '处理标记\n1：已完成\n0：未完成',
  `create_date` DATETIME NULL COMMENT '创建时间',
  `update_date` DATETIME NULL COMMENT '更新时间',
  PRIMARY KEY (`series_code`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `product` (
  `product_code` varchar(256) NOT NULL,
  `product_name` varchar(256) NOT NULL,
  `product_url` varchar(512) NOT NULL,
  `product_spec` varchar(256) COMMENT '产品规格参数表达式ROGAK{}-{}-{}',
  `type_code` varchar(256) COMMENT '产品类型00000042758',
  `type_name` varchar(512) COMMENT '类型名称ROGAK',
  `brd_name` varchar(256),
  `brd_code` varchar(256),
  `series_code` varchar(256),
  `unit_price` decimal(15,4) DEFAULT '0.0000',
  `proc_by` VARCHAR(255) NULL COMMENT '多处理线程时每个线程标识',
  `proc_flag` boolean COMMENT '处理标记\n1：已完成\n0：未完成',  
  `create_date` DATETIME NULL COMMENT '创建时间',
  `update_date` DATETIME NULL COMMENT '更新时间',
  PRIMARY KEY (`product_code`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;


CREATE TABLE IF NOT EXISTS `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_name` varchar(256) NOT NULL,
  `category_code` varchar(256) NOT NULL,
  `category_url` varchar(512),
  `childCategoryName` varchar(256),
  `childCategoryCode` varchar(256),
  `childCategoryUrl` varchar(512),  
  `grandCategoryName` varchar(256),
  `grandCategoryUrl` varchar(512),
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;


CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11),
  `product_name` varchar(256) NOT NULL,
  `product_code` varchar(256) NOT NULL,
  `product_url` varchar(512),
  `product_quote` decimal(15,4) DEFAULT '0.0000',
  `date_added` datetime,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

CREATE TABLE IF NOT EXISTS `manual_product_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mi_product_name` varchar(256) NOT NULL,
  `mi_product_code` varchar(256) NOT NULL,
  `mi_product_desc` varchar(512),
  `at_product_name` varchar(256) NOT NULL,
  `at_product_code` varchar(256) NOT NULL,
  `at_product_desc` varchar(512),
  `mi_product_quote` decimal(15,4) DEFAULT '0.0000',
  `at_product_quote` decimal(15,4) DEFAULT '0.0000',
  `factory_quote` decimal(15,4) DEFAULT '0.0000',
  `uni_quote` decimal(15,4) DEFAULT '0.0000',
  `date_added` datetime,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;
	
	