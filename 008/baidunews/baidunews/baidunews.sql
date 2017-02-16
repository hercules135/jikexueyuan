/*
Navicat MySQL Data Transfer

Source Server         : 本地Mysql
Source Server Version : 50549
Source Host           : localhost:8889
Source Database       : baidunews

Target Server Type    : MYSQL
Target Server Version : 50549
File Encoding         : 65001

Date: 2016-12-30 02:00:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `picturesrc` varchar(255) NOT NULL,
  `src` varchar(255) NOT NULL,
  `time` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of news
-- ----------------------------
INSERT INTO `news` VALUES ('17', '习近平主持政治局会议 部署党风廉政建设和反腐工作', 'img/1.jpg', '精选', '2016-12-10');
INSERT INTO `news` VALUES ('18', '王菲演唱会票价599999元滑到打折卖 粉丝\"伤不起\"', 'img/3.jpg', '百家', '2016-12-07');
INSERT INTO `news` VALUES ('19', '彭博澄清人民币破7：员工发送了有问题的行情', 'img/2.jpeg', '本地', '2016-12-16');
INSERT INTO `news` VALUES ('20', '别再算命了 你的生肖决定你的命！', 'img/4.jpg', '娱乐', '2016-12-09');
INSERT INTO `news` VALUES ('23', '123', '123', '123', '2016-12-22');
INSERT INTO `news` VALUES ('24', '<scrpit>alert(1)</script>', '123', '123', '2016-12-22');
