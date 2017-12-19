/*
Navicat MySQL Data Transfer

Source Server         : quotedb_conn
Source Server Version : 50158
Source Host           : localhost:3306
Source Database       : quotedb

Target Server Type    : MYSQL
Target Server Version : 50158
File Encoding         : 65001

Date: 2017-09-21 21:09:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company_id` int(11) DEFAULT NULL COMMENT '公司ID',
  `login_name` varchar(100) NOT NULL COMMENT '登录名',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `name` varchar(100) NOT NULL COMMENT '姓名',
  `email` varchar(200) DEFAULT NULL COMMENT '邮件',
  `phone` varchar(200) DEFAULT NULL COMMENT '电话',
  `mobile` varchar(200) DEFAULT NULL COMMENT '手机',
  `enabled` char(1) DEFAULT '1' COMMENT '是否可用\n1：可用\n0：停用',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `del_flag` char(1) DEFAULT '0' COMMENT '删除标记\n1：删除\n0：未删除',
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_name_UNIQUE` (`login_name`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COMMENT='系统用户';

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', null, 'admin', 'admin', '系统管理员', '', '', '', '1', '超级管理员', '2016-10-08 19:53:46', '2017-02-10 17:21:30', '0');
INSERT INTO `sys_user` VALUES ('2', null, 'user', 'password', '用户', '', '', '', '1', '用户', '2016-10-08 19:53:46', '2017-02-10 17:21:30', '0');
INSERT INTO `sys_user` VALUES ('4', null, 'quote', 'quote', '报价', 'quote@sadetec.com', '010-987733', '18800990099', '1', '报价员', null, null, '');
INSERT INTO `sys_user` VALUES ('5', null, 'liuguochun', 'liuguochun123', '刘国春', 'liuguochun@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('6', null, 'wuhuiyong', 'wuhuiyong123', '仵辉勇', 'wuhuiyong@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('7', null, 'xuping', 'xuping123', '徐萍', 'xuping@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('8', null, 'liupeijian', 'liupeijian123', '刘沛健', 'liupeijian@sadete.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('9', null, 'liutianfeng', 'liutianfeng123', '刘天峰', 'liutianfeng@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('10', null, 'zhangliangliang', 'zhangliangliang123', '张亮亮', 'zhangliangliang@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('11', null, 'xuxiaoming', 'xuxiaoming123', '徐小明', 'xuxiaoming@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('12', null, 'rongshengli', 'rongshengli123', '戎胜利', 'rongshengli@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('13', null, 'xumeng', 'xumeng123', '许孟', 'xumeng@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('14', null, 'sunzhong', 'sunzhong123', '孙忠', 'sunzhong@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('15', null, 'zhaoyaping', 'zhaoyaping123', '赵亚平', 'zhaoyaping@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('16', null, 'guotao', 'guotao', '秦国涛', '', '', '', '1', '管理员2', null, null, '');
INSERT INTO `sys_user` VALUES ('17', null, 'mxy', '771996475', '孟宪宇', '', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('18', null, 'limeng', 'limeng123', '李猛', 'limeng@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('19', null, 'lidehai', 'lidehai123', '李德海', 'lidehai@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('20', null, 'lijuncc', 'lijuncc123', '李军', 'lijun@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('21', null, 'wanghaiyang', 'wanghaiyang123', '王海洋', 'wanghaiyang@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('24', null, 'pulinfeng', 'pulinfeng123', '蒲林峰', 'pulinfeng@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('26', null, 'zhujianmin', 'zhujianmin123', '朱建民', 'zhujianmin@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('27', null, 'xiachuanlin', 'xiachuanlin123', '夏传霖', 'xiachuanlin@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('28', null, 'guotao1', 'guotao1', '秦国涛1', '', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('29', null, 'zhuchunyan', 'zhuchunyan123', '朱春燕', 'sadehrb@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('30', null, 'wangzhe', 'wangzhe123', '王哲', 'wangzhe@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('31', null, 'wangjun', 'wangjun123', '汪军', 'wangjun@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('32', null, 'xiaoyan', 'xiaoyan123', '肖艳', 'xiaoyan@ant-fa.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('33', null, 'wangxiaona', 'wangxiaona123', '王晓娜', 'wangxiaona@sadetec.com', '', '18302263033', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('35', null, 'lixiaoguang', 'lixiaoguang123', '李晓光', 'lixiaoguang@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('36', null, 'chenguoyu', 'chenguoyu123', '陈国玉', 'chenguoyu@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('37', null, 'zhangjun', 'zhangjun123', '张军', 'zhangjun@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('38', null, 'dengchengshuai', 'dengchengshuai123', '邓成帅', 'dengchengshuai@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('39', null, 'pingchuan', 'pingchuan123', '平川', 'pingchuan@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('40', null, 'fanshufeng', 'fanshufeng123', '范书凤', 'fanshufeng@sadetec.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('41', null, 'hanbing', 'hanbing123', '韩冰', 'hanbing@ant-fa.com', '', '', '1', '', null, null, '');
INSERT INTO `sys_user` VALUES ('44', null, 'suyili', 'suyili123', '苏义莉', 'suyili@ant-fa.com', '', '', '1', '', null, null, '');
