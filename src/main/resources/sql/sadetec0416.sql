DROP TABLE IF EXISTS `product_option`;

CREATE TABLE IF NOT EXISTS `product_option` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_code` varchar(128) NOT NULL COMMENT '',
  `incd` varchar(64) NOT NULL COMMENT '',
  `hissu_code` varchar(256) COMMENT '',
  `unit` varchar(512) COMMENT '',
  `illustration_type` varchar(256) COMMENT '',
  `category_spec_no` varchar(256) COMMENT '',
  `property_code` varchar(512) COMMENT '',
  `ary_choice_name` text COMMENT '',
  `ary_choice_code` text COMMENT '',
  `value_type` varchar(256) COMMENT '',
  `extra_spec` varchar(256) COMMENT '',
  `notice_string` varchar(256) COMMENT '',
  `has_param_spec` varchar(256) COMMENT '',
  `use_flag` varchar(256) COMMENT '',
  `grouping_step` varchar(256) COMMENT '',
  `display_pattern` varchar(256) COMMENT '',
  `is_spec_inch` varchar(256) COMMENT '',
  `similar_flag` varchar(256) COMMENT '',
  `group_title` varchar(256) COMMENT '',
  `group_notice_string` varchar(256) COMMENT '',
  `group_index` varchar(256) COMMENT '',
  `is_parent` varchar(256) COMMENT '',  
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 ;	