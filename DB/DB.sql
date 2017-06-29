/*
SQLyog Ultimate v12.09 (64 bit)
MySQL - 5.6.36-log : Database - only_dev
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`only_dev` /*!40100 DEFAULT CHARACTER SET gbk */;

USE `only_dev`;

/*Table structure for table `activity` */

DROP TABLE IF EXISTS `activity`;

CREATE TABLE `activity` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL COMMENT '商品ID',
  `group_id` int(11) NOT NULL COMMENT '所属分组',
  `total_count` int(11) NOT NULL COMMENT '总需人次',
  `periods` int(11) NOT NULL COMMENT '共几期',
  `status` int(11) NOT NULL COMMENT '活动状态',
  `start_date` datetime DEFAULT NULL COMMENT '启动时间',
  `user_id` int(11) NOT NULL COMMENT '添加者',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  `audit_user_id` int(11) NOT NULL DEFAULT '0' COMMENT '审核者',
  `audit_date` datetime DEFAULT NULL COMMENT '审核时间',
  `audit_status` int(11) NOT NULL DEFAULT '0' COMMENT '审核状态',
  `price` decimal(10,0) NOT NULL COMMENT '商品价格',
  `lssue_number` int(11) NOT NULL COMMENT '发行数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `activity` */

/*Table structure for table `activity_group` */

DROP TABLE IF EXISTS `activity_group`;

CREATE TABLE `activity_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL COMMENT '名称',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `icon` varchar(200) DEFAULT NULL COMMENT 'ico图标',
  `sequence` int(11) NOT NULL DEFAULT '1' COMMENT '顺序',
  `price` int(11) NOT NULL COMMENT '几元区',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '删除标记',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `activity_group` */

/*Table structure for table `banner` */

DROP TABLE IF EXISTS `banner`;

CREATE TABLE `banner` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '名称',
  `sequence` int(11) NOT NULL DEFAULT '1' COMMENT '顺序',
  `activity_id` int(11) NOT NULL DEFAULT '0' COMMENT '绑定活动ID',
  `url` varchar(200) DEFAULT NULL COMMENT '跳转地址',
  `img` varchar(200) NOT NULL COMMENT '图片地址',
  `is_valid` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否有效',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '删除标记',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `banner` */

/*Table structure for table `city` */

DROP TABLE IF EXISTS `city`;

CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL COMMENT '名称',
  `letter` varchar(50) DEFAULT NULL COMMENT '前缀',
  `pinyin` varchar(100) DEFAULT NULL COMMENT '全拼',
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID',
  `hierarchy` int(11) NOT NULL COMMENT '层级',
  `sequence` int(11) NOT NULL COMMENT '顺序',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `city` */

/*Table structure for table `express_company` */

DROP TABLE IF EXISTS `express_company`;

CREATE TABLE `express_company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(50) NOT NULL COMMENT '编码',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '删除标记',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `express_company` */

/*Table structure for table `permissions` */

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '名称',
  `group_name` varchar(50) NOT NULL COMMENT '分组名称',
  `controller` varchar(50) NOT NULL COMMENT '控制器',
  `action` varchar(50) NOT NULL COMMENT '方法',
  `description` varchar(100) DEFAULT NULL COMMENT '描述',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可用',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=gbk;

/*Data for the table `permissions` */

insert  into `permissions`(`id`,`name`,`group_name`,`controller`,`action`,`description`,`enable`,`create_date`,`update_date`) values (1,'角色创建','角色管理','role','add','角色管理','','2017-06-10 12:27:25',NULL),(2,'角色编辑','角色管理','role','update','角色管理','','2017-06-10 12:27:46',NULL),(3,'角色删除','角色管理','role','delete','角色管理','','2017-06-10 12:28:08',NULL),(4,'用户创建','用户管理','user','add','用户管理','','2017-06-10 12:28:33',NULL),(5,'用户编辑','用户管理','user','update','用户管理','','2017-06-10 12:28:47',NULL),(6,'用户删除','用户管理','user','delete','用户管理','','2017-06-10 12:29:54',NULL);

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL COMMENT '商品名称',
  `category_id` int(11) NOT NULL COMMENT '分类ID',
  `thumbnail` varchar(200) DEFAULT NULL COMMENT '缩略图',
  `price` decimal(10,0) DEFAULT NULL COMMENT '商品价格',
  `art_number` varchar(100) DEFAULT NULL COMMENT '商品货号',
  `put_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入库时间',
  `in_time` datetime DEFAULT NULL COMMENT '上架时间',
  `under_time` datetime DEFAULT NULL COMMENT '下架时间',
  `description` text COMMENT '商品描述',
  `user_id` int(11) NOT NULL COMMENT '添加者',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  `flag` int(11) NOT NULL DEFAULT '1' COMMENT '状态',
  `city_id` int(11) NOT NULL COMMENT '所属省市',
  `enalble` bit(1) NOT NULL DEFAULT b'1' COMMENT '删除标记',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `product` */

/*Table structure for table `product_category` */

DROP TABLE IF EXISTS `product_category`;

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) NOT NULL DEFAULT '0' COMMENT '父ID',
  `name` varchar(200) NOT NULL COMMENT '名称',
  `level` int(11) NOT NULL DEFAULT '1' COMMENT '级别',
  `canshow` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否展示',
  `icon` varchar(200) DEFAULT NULL COMMENT 'icon图标',
  `sequence` int(11) NOT NULL DEFAULT '1' COMMENT '顺序',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '删除标记',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=gbk;

/*Data for the table `product_category` */

insert  into `product_category`(`id`,`parent_id`,`name`,`level`,`canshow`,`icon`,`sequence`,`description`,`enable`,`create_date`,`update_date`) values (1,0,'电脑办公',1,'','1498724187275.jpg',10,'这里是描述','','2017-06-28 17:29:37',NULL),(2,0,'数码影音',1,'','1498724195801.jpg',20,'数码影音类','','2017-06-28 17:46:46',NULL),(3,0,'潮流新品',1,'','1498724206434.jpg',30,'这里是描述','','2017-06-28 17:52:39',NULL),(4,0,'美食天地',1,'','1498724217448.jpg',40,'','','2017-06-28 18:03:28',NULL),(5,0,'女性时尚',1,'','1498724260609.jpg',50,'','','2017-06-28 18:03:39',NULL),(6,0,'测试',1,'','1498724158254.jpg',1,'asdf','\0','2017-06-29 15:47:24',NULL),(7,0,'测试二',1,'','1498724030776.jpg',1,'','\0','2017-06-29 16:14:05',NULL);

/*Table structure for table `product_comment` */

DROP TABLE IF EXISTS `product_comment`;

CREATE TABLE `product_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL COMMENT '订单ID',
  `title` varchar(200) NOT NULL COMMENT '标题',
  `content` varchar(2000) NOT NULL COMMENT '内容',
  `pic` varchar(500) DEFAULT NULL COMMENT '图片',
  `is_show` bit(1) NOT NULL DEFAULT b'0' COMMENT '是否显示',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '添加时间',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '删除标记',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `product_comment` */

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL COMMENT '名称',
  `indentation` int(11) NOT NULL DEFAULT '0' COMMENT '级别',
  `description` varchar(100) DEFAULT NULL COMMENT '描述',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可用',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=gbk;

/*Data for the table `role` */

insert  into `role`(`id`,`name`,`indentation`,`description`,`enable`,`create_date`,`update_date`) values (1,'超级管理员',1,'超级管理员','','2017-06-10 11:48:02','2017-06-11 23:24:19'),(2,'普通管理员',2,'普通管理员','','2017-06-10 11:48:57','2017-06-28 16:57:34'),(3,'商品管理员',2,'商品管理员','','2017-06-10 11:49:08','2017-06-28 16:58:03'),(24,'活动管理员',2,'活动管理员','','2017-06-28 16:58:21',NULL);

/*Table structure for table `role_permissions` */

DROP TABLE IF EXISTS `role_permissions`;

CREATE TABLE `role_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `permission_id` int(11) NOT NULL COMMENT '权限ID',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=gbk;

/*Data for the table `role_permissions` */

insert  into `role_permissions`(`id`,`role_id`,`permission_id`,`create_date`,`update_date`) values (30,1,1,'2017-06-11 23:24:19',NULL),(31,1,2,'2017-06-11 23:24:19',NULL),(32,1,3,'2017-06-11 23:24:19',NULL),(33,1,4,'2017-06-11 23:24:19',NULL),(34,1,5,'2017-06-11 23:24:19',NULL),(35,1,6,'2017-06-11 23:24:19',NULL),(58,2,4,'2017-06-28 16:57:34',NULL),(59,2,5,'2017-06-28 16:57:34',NULL),(60,2,6,'2017-06-28 16:57:34',NULL),(61,3,4,'2017-06-28 16:58:03',NULL),(62,24,4,'2017-06-28 16:58:21',NULL),(63,24,5,'2017-06-28 16:58:21',NULL),(64,24,6,'2017-06-28 16:58:21',NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL COMMENT '姓名',
  `account` varchar(100) NOT NULL COMMENT '帐号',
  `password` varchar(100) NOT NULL COMMENT '密码',
  `salt` varchar(200) DEFAULT NULL,
  `mobile` varchar(30) DEFAULT NULL COMMENT '手机',
  `qq` varchar(20) DEFAULT NULL COMMENT 'QQ',
  `email` varchar(50) DEFAULT NULL COMMENT '邮件',
  `address` varchar(200) DEFAULT NULL COMMENT '地址',
  `avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `last_logon_date` datetime DEFAULT NULL COMMENT '最后一次登录时间',
  `enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可用',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=gbk;

/*Data for the table `user` */

insert  into `user`(`id`,`name`,`account`,`password`,`salt`,`mobile`,`qq`,`email`,`address`,`avatar`,`description`,`last_logon_date`,`enable`,`create_date`,`update_date`) values (3,'小吕','admin3','8x/uFhuq6nmWY9f7eRoqCg==','e8ed31b527d240878331414c8f7bfbe5','15825477180',NULL,NULL,NULL,NULL,NULL,'2017-06-29 17:08:34','','2017-06-21 21:14:29','2017-06-29 17:08:48');

/*Table structure for table `user_logon` */

DROP TABLE IF EXISTS `user_logon`;

CREATE TABLE `user_logon` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `token` varchar(200) NOT NULL COMMENT 'token',
  `expiry_date` datetime NOT NULL COMMENT 'token过期时间',
  `ip_address` varchar(50) NOT NULL COMMENT '登录IP地址',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=gbk;

/*Data for the table `user_logon` */

insert  into `user_logon`(`id`,`user_id`,`token`,`expiry_date`,`ip_address`,`create_date`) values (31,9,'614135d4847e42a1ab7e5008bd5c8fe2','2017-07-05 16:51:33','192.168.10.1','2017-06-28 16:51:32'),(38,3,'59ab60c9f4d7468e9f61f2a4204fc022','2017-07-06 17:08:48','192.168.10.1','2017-06-29 17:08:47');

/*Table structure for table `user_permissions` */

DROP TABLE IF EXISTS `user_permissions`;

CREATE TABLE `user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `permission_id` int(11) NOT NULL COMMENT '权限ID',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=gbk;

/*Data for the table `user_permissions` */

insert  into `user_permissions`(`id`,`user_id`,`permission_id`,`create_date`,`update_date`) values (50,3,1,'2017-06-28 16:57:13',NULL),(51,3,2,'2017-06-28 16:57:13',NULL),(52,3,3,'2017-06-28 16:57:13',NULL),(53,3,4,'2017-06-28 16:57:13',NULL),(54,3,5,'2017-06-28 16:57:13',NULL),(55,3,6,'2017-06-28 16:57:14',NULL);

/*Table structure for table `user_role` */

DROP TABLE IF EXISTS `user_role`;

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_id` int(11) NOT NULL COMMENT '角色ID',
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_date` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=gbk;

/*Data for the table `user_role` */

insert  into `user_role`(`id`,`user_id`,`role_id`,`create_date`,`update_date`) values (1,3,1,'2017-06-21 21:14:30','2017-06-21 21:14:30');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
