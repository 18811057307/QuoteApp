ALTER TABLE  `form_instance` ADD  `sales_id` VARCHAR(256) NULL COMMENT  '营业人id';
ALTER TABLE  `form_instance` ADD  `sales` VARCHAR(256) NULL COMMENT  '营业人';
ALTER TABLE  `form_instance` ADD  `sales_org` VARCHAR(256) NULL COMMENT  '营业人部门';
ALTER TABLE  `form_instance` ADD  `mobile` VARCHAR(256) NULL COMMENT  '联系方式';
ALTER TABLE  `form_instance` ADD  `deal_status` VARCHAR(256) NULL COMMENT  '下单状态';

ALTER TABLE  `sales_order` ADD  `supplier_name` VARCHAR(64) NULL COMMENT  '供应商名称';
ALTER TABLE  `sales_order` ADD  `valid_date` timestamp NULL COMMENT  '报价有效期';
ALTER TABLE  `sales_order` ADD  `stock_amount` int(11) COMMENT '库存数量';
  
  