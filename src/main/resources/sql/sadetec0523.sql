DROP TABLE IF EXISTS `quotation_log`;
CREATE TABLE IF NOT EXISTS `quotation_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `at_product_code` varchar(256) NOT NULL,
  `at_product_name` varchar(256),
  `at_product_desc` varchar(512),
  `mi_product_name` varchar(256),
  `mi_product_code` varchar(256),
  `mi_product_desc` varchar(512),
  `mi_product_quote` decimal(15,4) DEFAULT '0.0000',
  `at_product_quote` decimal(15,4) DEFAULT '0.0000',
  `factory_quote` decimal(15,4) DEFAULT '0.0000',
  `uni_quote` decimal(15,4) DEFAULT '0.0000',
  `supa_quote` decimal(15,4) DEFAULT '0.0000' COMMENT '',
  `supb_quote` decimal(15,4) DEFAULT '0.0000' COMMENT '',
  `supc_quote` decimal(15,4) DEFAULT '0.0000' COMMENT '',
  `login_name` varchar(256),
  `order_quantity` int(11),
  `name` varchar(256),  
  `quotation_time` timestamp DEFAULT CURRENT_TIMESTAMP,   
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;