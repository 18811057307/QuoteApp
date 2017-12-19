DROP TABLE IF EXISTS `form_instance`;
CREATE TABLE IF NOT EXISTS `form_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `seq_number` varchar(256),
  `drafter_id` varchar(512),
  `drafter` varchar(256),
  `draft_org` varchar(256),
  `comment` varchar(512),
  `description` varchar(512),
  `create_date` timestamp DEFAULT CURRENT_TIMESTAMP,   
  `last_modified` timestamp,
  `process_instance_id` varchar(256),
  `process_definition_id` varchar(256),
  `document` text,
  `priority` int(11),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `sales_order`;
CREATE TABLE IF NOT EXISTS `sales_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `form_instance_id` int(11) NOT NULL,
  `category_code` varchar(256),
  `category_name` varchar(256),
  `series_code` varchar(256),
  `series_name` varchar(256),
  `product_code` varchar(256),
  `product_name` varchar(256),
  `process_type` varchar(256),
  `delivery_date` timestamp NULL,   
  `amount` int(11),
  `unit` varchar(64) COMMENT '单位',
  `unit_price` decimal(15,4) DEFAULT '0.0000',
  `comment` varchar(512),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `mail_message`;
CREATE TABLE IF NOT EXISTS `mail_message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_date` timestamp NULL,
  `write_date` timestamp NULL,
  `write_uid` varchar(64),
  `subject` varchar(256),
  `create_uid` varchar(64),
  `parent_id` int(11),
  `subtype_id` int(11),
  `res_id` int(11),
  `body` text,
  `record_name` varchar(64),
  `no_auto_thread` tinyint(1),
  `date` timestamp NULL,
  `reply_to` varchar(64),
  `author_id` varchar(64),
  `model` varchar(64),
  `message_type` varchar(64),  
  `email_from` varchar(64),
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `res_partner`;
CREATE TABLE IF NOT EXISTS `res_partner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(256) COMMENT '名称',
  `display_name` varchar(256) COMMENT '显示名称',
  `company_id` int(11) COMMENT '公司ID',
  `company_name` varchar(256) COMMENT '公司名称',
  `comment` text COMMENT '备注',
  `website` varchar(512) COMMENT '网址',
  `email` varchar(128) COMMENT '邮箱',
  `job` varchar(128) COMMENT '职务',  
  `create_date` timestamp NULL COMMENT '创建日期',
  `color` int(11) COMMENT '颜色索引',
  `active` tinyint(1) COMMENT '活动',
  `is_supplier` tinyint(1) COMMENT '供应商',
  `is_company` tinyint(1) COMMENT '公司',
  `is_employee` tinyint(1) COMMENT '员工',
  `is_customer` tinyint(1) COMMENT '客户',  
  `city` varchar(64) COMMENT '城市',
  `street` varchar(256) COMMENT '街道',
  `zip` varchar(64) COMMENT '邮编',
  `fax` varchar(64) COMMENT '传真',
  `phone` varchar(64) COMMENT '电话',
  `mobile` varchar(64) COMMENT '手机',  
  `title` varchar(64) COMMENT '称呼：女士、先生',
  `country_id` int(11) COMMENT '国家',
  `parent_id` int(11) COMMENT '上级标识',
  `user_id` varchar(64) COMMENT '关联销售',  
  `credit_limit` decimal(15,4) DEFAULT '0.0000' COMMENT '授信额度',
  `invoice_warn` varchar(64) COMMENT '报价单说明',
  `invoice_warn_msg` text COMMENT '发票消息',
  `picking_warn` varchar(64) COMMENT '捡货说明',
  `picking_warn_msg` text COMMENT '出库通知',
  `purchase_warn` varchar(64) COMMENT '供应商说明',
  `purchase_warn_msg` text COMMENT '采购消息',    
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `product_supplierinfo`;
CREATE TABLE IF NOT EXISTS `product_supplierinfo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `create_uid` varchar(64) COMMENT '添加人',
  `create_date` timestamp NULL COMMENT '添加日期',
  `delay` int(11) COMMENT '交货前置时间天',
  `sequence` int(11) COMMENT '顺序',
  `date_start` timestamp NULL COMMENT '价格开始日期',
  `date_end` timestamp NULL COMMENT '价格结束日期',
  `company_id` int(11) COMMENT '公司ID',  
  `company_name` varchar(256) COMMENT '公司名称',
  `product_name` varchar(256) COMMENT '显示名称',
  `product_code` varchar(256) COMMENT '产品型号',
  `min_qty` decimal(15,4) DEFAULT '0.0000' COMMENT '最小数量',
  `price` decimal(15,4) DEFAULT '0.0000' COMMENT '价格',
  `product_id` varchar(256) COMMENT '产品标识',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `stock_quant`;
CREATE TABLE IF NOT EXISTS `stock_quant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` varchar(256) COMMENT '产品标识',
  `product_name` varchar(512) COMMENT '存货名称',
  `qty` decimal(15,4) DEFAULT '0.0000' COMMENT '库存数量',
  `use_qty` decimal(15,4) DEFAULT '0.0000' COMMENT '可用数量',
  `unit` varchar(32) COMMENT '单位',
  `create_uid` varchar(64) COMMENT '添加人',
  `create_date` timestamp NULL COMMENT '添加日期',
  `cost` decimal(15,4) DEFAULT '0.0000' COMMENT '成本',
  `propagated_from_id` int(11) COMMENT 'Linked Quant',
  `package_id` int(11) COMMENT 'Package',
  `lot_id` int(11) COMMENT 'Lot/Serial Number',
  `lot` varchar(64) COMMENT 'Lot/Serial Number',
  `location_id` int(11) COMMENT 'Location',
  `location` varchar(64) COMMENT 'Location',
  `lot_cata1` varchar(128) COMMENT '存货分类1',
  `lot_cata2` varchar(128) COMMENT '存货分类2',
  `reservation_id` int(11) COMMENT 'Reserved for Move',
  `packaging_type_id` int(11) COMMENT 'Type of packaging',
  `negative_move_id` int(11) COMMENT 'Move Negative Quant',
  `in_date` timestamp NULL COMMENT '价格开始日期',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;