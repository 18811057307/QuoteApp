CREATE TABLE IF NOT EXISTS `sys_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL COMMENT '部门名',
  `parent_id` int(11) NULL COMMENT '上级部门名',
  `sequence` int(11) NULL COMMENT '序号',
  `create_date` DATETIME NULL COMMENT '创建时间',
  `email` VARCHAR(200) NULL COMMENT '邮件',
  `phone` VARCHAR(200) NULL COMMENT '电话',
  `company_registry` VARCHAR(200) NULL COMMENT '注册地',
  `enabled` CHAR(1) NULL DEFAULT '1' COMMENT '是否可用\n1：可用\n0：停用',
  `remarks` VARCHAR(255) NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE = MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 COMMENT = '公司';

ALTER TABLE  `sys_user` ADD  `company_id` INT NULL  COMMENT  '公司ID' AFTER  `id`;
ALTER TABLE  `sys_user` ADD  `sequence` INT NULL  COMMENT  '序号' AFTER  `company_id`;

ALTER TABLE  `sales_order` ADD  `need_proc` BOOLEAN NULL COMMENT  '是否需要询价处理' AFTER  `unit_price`;
ALTER TABLE  `sales_order` ADD  `factory_price` decimal(15,4) DEFAULT '0.0000' COMMENT  '出厂价格' AFTER  `unit_price`;
ALTER TABLE  `sales_order` ADD  `cost_price` decimal(15,4) DEFAULT '0.0000' COMMENT  '成本价格' AFTER  `factory_price`;
ALTER TABLE  `sales_order` ADD  `brand` VARCHAR(256) NULL COMMENT  '品牌' AFTER  `unit_price`;
ALTER TABLE  `sales_order` ADD  `at_product_code` VARCHAR(256) NULL COMMENT  'A&T型号' AFTER  `unit_price`;
ALTER TABLE  `sales_order` ADD  `drawing_url` VARCHAR(512) NULL COMMENT  '图纸' AFTER  `unit_price`;
ALTER TABLE  `sales_order` ADD  `quoter_id` VARCHAR(64) NULL COMMENT  '办理人' AFTER  `unit_price`;
ALTER TABLE  `sales_order` ADD  `quoter_name` VARCHAR(64) NULL COMMENT  '办理人' AFTER  `quoter_id`;
ALTER TABLE  `sales_order` ADD  `auditor_id` VARCHAR(64) NULL COMMENT  '审批人' AFTER  `quoter_name`;
ALTER TABLE  `sales_order` ADD  `auditor_name` VARCHAR(64) NULL COMMENT  '审批人' AFTER  `auditor_id`;

ALTER TABLE  `category` ADD  `quoter_id` VARCHAR(64) NULL COMMENT  '办理人';
ALTER TABLE  `category` ADD  `quoter_name` VARCHAR(64) NULL COMMENT  '办理人';
ALTER TABLE  `category` ADD  `auditor_id` VARCHAR(64) NULL COMMENT  '审批人';
ALTER TABLE  `category` ADD  `auditor_name` VARCHAR(64) NULL COMMENT  '审批人';
ALTER TABLE  `category` ADD  `sequence` INT NULL  COMMENT  '序号' AFTER  `category_code`;
ALTER TABLE  `category` ADD  `factory_ratio` decimal(15,4) DEFAULT '1.0000' NULL  COMMENT '出厂价系数' AFTER  `sequence`;
ALTER TABLE  `category` ADD  `unit_ratio` decimal(15,4) DEFAULT '1.0000' NULL  COMMENT '统一价系数' AFTER  `sequence`;