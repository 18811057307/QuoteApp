DROP TABLE IF EXISTS `category`;
DROP TABLE IF EXISTS `series`;
DROP TABLE IF EXISTS `product`;

CREATE TABLE IF NOT EXISTS `category` (
  `category_code` varchar(128) NOT NULL,
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
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `series` (
  `series_code` varchar(128) NOT NULL,
  `series_name` varchar(256) NOT NULL,
  `series_url` varchar(512) NOT NULL,
  `brd_name` varchar(256),
  `brd_code` varchar(256),
  `category_code` varchar(256),
  `quote_type` varchar(256) NULL COMMENT '报价类型:有价格、无价格、部分有',
  `remark` varchar(256) NULL COMMENT '备注',
  `proc_by` VARCHAR(255) NULL COMMENT '多处理线程时每个线程标识',
  `proc_flag` boolean COMMENT '处理标记\n1：已完成\n0：未完成',
  `create_date` DATETIME NULL COMMENT '创建时间',
  `update_date` DATETIME NULL COMMENT '更新时间',
  PRIMARY KEY (`series_code`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 ;

CREATE TABLE IF NOT EXISTS `product` (
  `product_code` varchar(128) NOT NULL,
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

DROP TABLE IF EXISTS `manual_product_map`;
CREATE TABLE IF NOT EXISTS `manual_product_map` (
  `at_product_code` varchar(128) NOT NULL,
  `at_product_name` varchar(256),
  `at_product_desc` varchar(512),
  `mi_product_name` varchar(256),
  `mi_product_code` varchar(256),
  `mi_product_desc` varchar(512),
  `mi_product_quote` decimal(15,4) DEFAULT '0.0000',
  `at_product_quote` decimal(15,4) DEFAULT '0.0000',
  `factory_quote` decimal(15,4) DEFAULT '0.0000',
  `uni_quote` decimal(15,4) DEFAULT '0.0000',
  `supa_quote` decimal(15,4) DEFAULT '0.0000' COMMENT '备用,供应商A报价',
  `supb_quote` decimal(15,4) DEFAULT '0.0000' COMMENT '备用,供应商B报价',
  `supc_quote` decimal(15,4) DEFAULT '0.0000' COMMENT '备用,供应商C报价',
  `create_date` DATETIME NULL COMMENT '创建时间',
  `update_date` DATETIME NULL COMMENT '更新时间',
  PRIMARY KEY (`at_product_code`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8;