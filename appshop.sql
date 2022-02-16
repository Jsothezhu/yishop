/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : localhost:3306
 Source Schema         : appshop

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 31/12/2021 13:53:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user`  (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `update_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 47 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
INSERT INTO `admin_user` VALUES (1, 'zs1', 'a123', '2021-11-17 22:52:55', '2021-11-17 22:52:58');
INSERT INTO `admin_user` VALUES (43, 'jsx', '80c9ef0fb86369cd25f90af27ef53a9e', '2021-11-25 22:11:07', '2021-11-25 22:11:07');
INSERT INTO `admin_user` VALUES (44, 'ass', '80c9ef0fb86369cd25f90af27ef53a9e', '2021-11-25 22:11:24', '2021-11-25 22:11:24');
INSERT INTO `admin_user` VALUES (45, 'azs', '80c9ef0fb86369cd25f90af27ef53a9e', '2021-11-25 22:12:07', '2021-11-25 22:12:07');
INSERT INTO `admin_user` VALUES (46, 'zs1s', '80c9ef0fb86369cd25f90af27ef53a9e', '2021-11-25 22:35:13', '2021-11-25 22:35:13');

-- ----------------------------
-- Table structure for category
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category`  (
  `category_id` int(6) NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `parent_category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '分类名',
  `sub_category_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '子分类名',
  `sub_category_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '子分类图片地址',
  PRIMARY KEY (`category_id`) USING BTREE,
  INDEX `sub_category_name`(`sub_category_name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES (1, '电子产品', '手机', NULL);
INSERT INTO `category` VALUES (2, '电子产品', '耳机', '');
INSERT INTO `category` VALUES (3, '电子产品', '无线耳机', '');
INSERT INTO `category` VALUES (6, '家用电器', '台灯', '');
INSERT INTO `category` VALUES (9, '电子产品', '平板电脑', '');
INSERT INTO `category` VALUES (10, '电子产品', '数码相机', '');
INSERT INTO `category` VALUES (11, '电子产品', '笔记本电脑', '');
INSERT INTO `category` VALUES (12, '电子产品', '智能手表', '');

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment`  (
  `id` int(11) NOT NULL COMMENT '评论id',
  `user_id` int(11) NULL DEFAULT NULL COMMENT '评论用户id',
  `owner_id` int(255) NULL DEFAULT NULL COMMENT '被评论id（可以是商品，也可以是人）',
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '评论内容',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `goods_id` int(8) UNSIGNED ZEROFILL NOT NULL COMMENT '商品id',
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '商品标题',
  `category_id` int(6) NULL DEFAULT NULL COMMENT '分类id',
  `stock` int(255) NULL DEFAULT 0 COMMENT '库存',
  `description` text CHARACTER SET utf8 COLLATE utf8_bin NULL COMMENT '描述',
  `descrip_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '' COMMENT '商品介绍图片',
  `type` varchar(10) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '0' COMMENT '商品属于什么类型（0新品、1热销）',
  `sale_time` datetime(0) NULL DEFAULT NULL COMMENT '上架时间',
  `good_pic` varchar(1000) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '商品封面图片地址',
  PRIMARY KEY (`goods_id`) USING BTREE,
  INDEX `子分类id`(`category_id`) USING BTREE,
  CONSTRAINT `子分类id` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (00000002, '小米手机', 1, 0, '', '', '0', '2021-12-13 22:03:28', '');
INSERT INTO `goods` VALUES (00000003, '华为平板', 9, 0, '', '', '0', '2021-12-13 22:04:15', '');
INSERT INTO `goods` VALUES (00000004, '索尼相机', 10, 0, '', '', '0', '2021-12-20 17:59:10', '');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order`  (
  `order_id` int(10) UNSIGNED ZEROFILL NOT NULL COMMENT '订单id',
  `user_id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '购买用户id',
  `no` varchar(11) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '订单流水号',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '地址',
  `total_price` decimal(10, 2) NULL DEFAULT NULL COMMENT '订单总价格',
  `paid_method` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '支付方式',
  `refund_status` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '退款状态',
  `refund_no` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '退款编号',
  `ship_status` enum('1','2','3','4','5') CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT '1' COMMENT '订单状态(待付款、待发货、待收货、已收货)',
  `reviewed` tinyint(1) NULL DEFAULT NULL COMMENT '是否已评价',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`order_id`) USING BTREE,
  INDEX `用户id`(`user_id`) USING BTREE,
  CONSTRAINT `用户id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES (0000012301, 00000001, '122', 'se', 1000.00, 'zfb', '1', '98', '3', 9, '2021-12-27 16:51:34');

-- ----------------------------
-- Table structure for order_item
-- ----------------------------
DROP TABLE IF EXISTS `order_item`;
CREATE TABLE `order_item`  (
  `order_id` int(11) NOT NULL COMMENT '订单id',
  `goods_id` int(11) NULL DEFAULT NULL COMMENT '商品id',
  `sku_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '购买规格',
  `count` int(11) NULL DEFAULT NULL COMMENT '购买数量',
  `price` decimal(10, 2) NULL DEFAULT NULL COMMENT '购买价格'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for receiver
-- ----------------------------
DROP TABLE IF EXISTS `receiver`;
CREATE TABLE `receiver`  (
  `user_id` int(11) NOT NULL COMMENT '用户id',
  `receiver` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '收货人姓名',
  `receiver_phone` int(11) NULL DEFAULT NULL COMMENT '收件人手机号',
  `province` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '省',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '市',
  `area` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '区',
  `detail` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '详细地址',
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for specifications
-- ----------------------------
DROP TABLE IF EXISTS `specifications`;
CREATE TABLE `specifications`  (
  `id` int(255) NOT NULL AUTO_INCREMENT COMMENT '规格id',
  `goods_id` int(8) UNSIGNED ZEROFILL NOT NULL COMMENT '商品id',
  `specifications` json NULL COMMENT '规格json',
  `pprice` json NULL COMMENT '规格组合对应的价格',
  `maxprice` decimal(10, 2) NULL DEFAULT NULL COMMENT '最大价格',
  `minprice` decimal(10, 2) NULL DEFAULT NULL COMMENT '最小价格',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `goods_id_hk`(`goods_id`) USING BTREE,
  CONSTRAINT `goods_id_hk` FOREIGN KEY (`goods_id`) REFERENCES `goods` (`goods_id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of specifications
-- ----------------------------
INSERT INTO `specifications` VALUES (9, 00000002, '{\"内存\": [\"32g\", \"64g\"], \"颜色\": [\"红\", \"黑\"]}', '{\"16g红\": \"123.32\"}', 0.00, 0.00);
INSERT INTO `specifications` VALUES (10, 00000004, '{\"电量\": [\"88w\", \"100w\"]}', '{\"88w\": \"230\"}', 0.00, 0.00);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int(8) UNSIGNED ZEROFILL NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '用户名',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '手机号码',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '密码',
  `nickname` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NULL DEFAULT NULL COMMENT '昵称',
  `create_time` datetime(0) NULL DEFAULT NULL COMMENT '创建时间',
  `update_time` datetime(0) NOT NULL COMMENT '修改密码时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (00000001, 'user_0001', NULL, NULL, '123456', '你好', '2021-12-27 16:49:47', '2021-12-27 16:50:08');

SET FOREIGN_KEY_CHECKS = 1;
