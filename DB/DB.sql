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

/*Table structure for table `permissions` */

DROP TABLE IF EXISTS `permissions`;

CREATE TABLE `permissions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL COMMENT '名称',
  `GroupName` varchar(50) NOT NULL COMMENT '分组名称',
  `Controller` varchar(50) NOT NULL COMMENT '控制器',
  `Action` varchar(50) NOT NULL COMMENT '方法',
  `Description` varchar(100) DEFAULT NULL COMMENT '描述',
  `Enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可用',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=gbk;

/*Data for the table `permissions` */

insert  into `permissions`(`ID`,`Name`,`GroupName`,`Controller`,`Action`,`Description`,`Enable`,`CreateDate`,`UpdateDate`) values (1,'角色创建','角色管理','role','add','角色管理','','2017-06-10 12:27:25',NULL),(2,'角色编辑','角色管理','role','update','角色管理','','2017-06-10 12:27:46',NULL),(3,'角色删除','角色管理','role','delete','角色管理','','2017-06-10 12:28:08',NULL),(4,'用户创建','用户管理','user','add','用户管理','','2017-06-10 12:28:33',NULL),(5,'用户编辑','用户管理','user','update','用户管理','','2017-06-10 12:28:47',NULL),(6,'用户删除','用户管理','user','delete','用户管理','','2017-06-10 12:29:54',NULL);

/*Table structure for table `role` */

DROP TABLE IF EXISTS `role`;

CREATE TABLE `role` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(50) NOT NULL COMMENT '名称',
  `Indentation` int(11) NOT NULL DEFAULT '0' COMMENT '级别',
  `Description` varchar(100) DEFAULT NULL COMMENT '描述',
  `Enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可用',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=gbk;

/*Data for the table `role` */

insert  into `role`(`ID`,`Name`,`Indentation`,`Description`,`Enable`,`CreateDate`,`UpdateDate`) values (1,'超级管理员',1,'超级管理员','','2017-06-10 11:48:02','2017-06-11 23:24:19'),(2,'普通管理员修改',2,'普通管理员修改','','2017-06-10 11:48:57','2017-06-11 23:27:25'),(3,'订单处理员',2,'订单处理员','','2017-06-10 11:49:08',NULL),(22,'测试角色',2,'测试角色','\0','2017-06-11 23:00:04','2017-06-11 23:20:05');

/*Table structure for table `rolepermissions` */

DROP TABLE IF EXISTS `rolepermissions`;

CREATE TABLE `rolepermissions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `RoleID` int(11) NOT NULL COMMENT '角色ID',
  `PermissionID` int(11) NOT NULL COMMENT '权限ID',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=gbk;

/*Data for the table `rolepermissions` */

insert  into `rolepermissions`(`ID`,`RoleID`,`PermissionID`,`CreateDate`,`UpdateDate`) values (30,1,1,'2017-06-11 23:24:19',NULL),(31,1,2,'2017-06-11 23:24:19',NULL),(32,1,3,'2017-06-11 23:24:19',NULL),(33,1,4,'2017-06-11 23:24:19',NULL),(34,1,5,'2017-06-11 23:24:19',NULL),(35,1,6,'2017-06-11 23:24:19',NULL),(49,2,4,'2017-06-11 23:27:24',NULL),(50,2,5,'2017-06-11 23:27:24',NULL),(51,2,6,'2017-06-11 23:27:24',NULL);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL COMMENT '姓名',
  `Account` varchar(100) NOT NULL COMMENT '帐号',
  `Password` varchar(100) NOT NULL COMMENT '密码',
  `Salt` varchar(200) NOT NULL,
  `Mobile` varchar(30) DEFAULT NULL COMMENT '手机',
  `QQ` varchar(20) DEFAULT NULL COMMENT 'QQ',
  `Email` varchar(50) DEFAULT NULL COMMENT '邮件',
  `Address` varchar(200) DEFAULT NULL COMMENT '地址',
  `Avatar` varchar(200) DEFAULT NULL COMMENT '头像',
  `Description` varchar(500) DEFAULT NULL COMMENT '描述',
  `LastLogonDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '最后一次登录时间',
  `Enable` bit(1) NOT NULL DEFAULT b'1' COMMENT '是否可用',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=gbk;

/*Data for the table `user` */

insert  into `user`(`ID`,`Name`,`Account`,`Password`,`Salt`,`Mobile`,`QQ`,`Email`,`Address`,`Avatar`,`Description`,`LastLogonDate`,`Enable`,`CreateDate`,`UpdateDate`) values (1,'管理员','admin','111111','sf',NULL,NULL,NULL,NULL,NULL,NULL,'2017-06-08 22:17:50','','2012-06-08 00:00:00',NULL);

/*Table structure for table `userlogon` */

DROP TABLE IF EXISTS `userlogon`;

CREATE TABLE `userlogon` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL COMMENT '用户ID',
  `Token` varchar(50) NOT NULL COMMENT 'token',
  `ExpiryDate` datetime NOT NULL COMMENT 'token过期时间',
  `IPAddress` varchar(50) NOT NULL COMMENT '登录IP地址',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `userlogon` */

/*Table structure for table `userpermissions` */

DROP TABLE IF EXISTS `userpermissions`;

CREATE TABLE `userpermissions` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL COMMENT '用户ID',
  `PermissionID` int(11) NOT NULL COMMENT '权限ID',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `userpermissions` */

/*Table structure for table `userrole` */

DROP TABLE IF EXISTS `userrole`;

CREATE TABLE `userrole` (
  `ID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL COMMENT '用户ID',
  `RoleID` int(11) NOT NULL COMMENT '角色ID',
  `CreateDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `UpdateDate` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '修改时间',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `userrole` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
