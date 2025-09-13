-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: miniblog
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (1,'Add post','post.add','Thêm bài viết','2025-09-11 18:36:39','2025-09-11 18:36:39'),(2,'Edit post','post.edit','Sửa bài viết','2025-09-11 18:36:39','2025-09-11 18:36:39'),(3,'View post','post.view','Xem danh sách bài viết','2025-09-11 18:36:39','2025-09-11 18:36:39'),(4,'Delete post','post.delete','Xóa bài viết','2025-09-11 18:36:39','2025-09-11 18:36:39'),(5,'Detail post','post.detail','Xem chi tiết bài viết','2025-09-11 18:36:39','2025-09-11 18:36:39'),(6,'Add user','user.add','Thêm người dùng','2025-09-11 18:36:39','2025-09-11 18:36:39'),(7,'Edit user','user.edit','Sửa Thông tin người dùng','2025-09-11 18:36:39','2025-09-11 18:36:39'),(8,'View user','user.view','Xem danh sách người dùng','2025-09-11 18:36:39','2025-09-11 18:36:39'),(9,'Delete user','user.delete','Xóa người dùng','2025-09-11 18:36:39','2025-09-11 18:36:39'),(10,'Detail user','user.detail','Xem chi tiết người dùng','2025-09-11 18:36:39','2025-09-11 18:36:39'),(11,'Add role','role.add','Thêm vai trò','2025-09-11 18:36:39','2025-09-11 18:36:39'),(12,'Edit role','role.edit','Sửa vai trò','2025-09-11 18:36:39','2025-09-11 18:36:39'),(13,'View role','role.view','Xem danh sách vai trò','2025-09-11 18:36:39','2025-09-11 18:36:39'),(14,'Delete role','role.delete','Xóa vai tro','2025-09-11 18:36:39','2025-09-11 18:36:39'),(15,'Add permission','permission.add','Thêm quyền','2025-09-11 18:36:39','2025-09-11 18:36:39'),(16,'Edit permission','permission.edit','Sửa quyền','2025-09-11 18:36:39','2025-09-11 18:36:39'),(17,'View permission','permission.view','Xem danh sách quyền','2025-09-11 18:36:39','2025-09-11 18:36:39'),(18,'Delete permission','permission.delete','Xóa quyền','2025-09-11 18:36:39','2025-09-11 18:36:39');
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `user_id` bigint NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (1,'test 5','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32. ',2,NULL,'2025-09-11 11:36:51','2025-09-12 21:43:09'),(2,'test 2','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',3,NULL,'2025-09-11 11:38:59','2025-09-12 21:43:09'),(3,'test 3','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',6,NULL,'2025-09-11 11:39:21','2025-09-12 21:43:09'),(4,'test 4','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',5,NULL,'2025-09-11 11:40:19','2025-09-12 21:43:09'),(11,'Title 10','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque at mauris ac libero ullamcorper malesuada. Curabitur vel velit eu risus vulputate laoreet.',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(12,'Title 11','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(13,'Title 12','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(14,'Title 13','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(15,'Title 14','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure.',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(16,'Title 15','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lacus nec odio fermentum scelerisque non a arcu.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(17,'Title 16','Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(18,'Title 17','Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(19,'Title 18','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(20,'Title 19','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(21,'Title 20','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(22,'Title 21','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(23,'Title 22','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account.',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(24,'Title 23','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(25,'Title 24','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure.',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(26,'Title 25','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lacus nec odio fermentum scelerisque non a arcu.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(27,'Title 26','Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(28,'Title 27','Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(29,'Title 28','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(30,'Title 29','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(31,'Title 30','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(32,'Title 31','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(33,'Title 32','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account.',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(34,'Title 33','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(35,'Title 34','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure.',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(36,'Title 35','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lacus nec odio fermentum scelerisque non a arcu.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(37,'Title 36','Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(38,'Title 37','Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(39,'Title 38','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(40,'Title 39','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(41,'Title 40','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(42,'Title 41','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(43,'Title 42','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account.',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(44,'Title 43','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(45,'Title 44','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure.',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(46,'Title 45','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lacus nec odio fermentum scelerisque non a arcu.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(47,'Title 46','Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(48,'Title 47','Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(49,'Title 48','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(50,'Title 49','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(51,'Title 50','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante venenatis dapibus posuere velit aliquet.',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(52,'Title 51','Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(53,'Title 52','But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account.',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(54,'Title 53','At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(55,'Title 54','On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure.',5,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(56,'Title 55','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus a lacus nec odio fermentum scelerisque non a arcu.',6,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(57,'Title 56','Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?',7,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(58,'Title 57','Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.',8,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(59,'Title 58','Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.',2,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(60,'Title 59','Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',3,NULL,'2025-09-12 23:16:09','2025-09-12 23:16:09'),(61,'test 600000','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.',7,NULL,'2025-09-12 23:57:47','2025-09-12 23:57:47');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'ROLE_ADMIN','Vai trò quản trị viên có quyền cao nhất','2025-09-11 09:28:24','2025-09-11 09:28:24'),(2,'ROLE_USER','người dùng thông thường','2025-09-11 09:28:24','2025-09-11 09:28:24');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_permission`
--

DROP TABLE IF EXISTS `role_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permission` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `role_id` bigint NOT NULL,
  `permission_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_id` (`role_id`,`permission_id`),
  KEY `permission_id` (`permission_id`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permission`
--

LOCK TABLES `role_permission` WRITE;
/*!40000 ALTER TABLE `role_permission` DISABLE KEYS */;
INSERT INTO `role_permission` VALUES (1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7),(8,1,8),(9,1,9),(10,1,10),(11,1,11),(12,1,12),(13,1,13),(14,1,14),(15,1,15),(16,1,16),(17,1,17),(18,1,18),(37,2,1),(38,2,2),(39,2,3),(40,2,4),(41,2,5);
/*!40000 ALTER TABLE `role_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role_id` bigint NOT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `role_id` (`role_id`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Admin','admin@gmail.com','$2a$10$LhC7K9g5GZIa/pLJrD/MUOx4UJlsRiVb5irbKeAJmInYrBL6IH5Wm',1,'2025-09-11 10:37:42','2025-09-11 18:51:37'),(2,'test1','test1@gmail.com','$2a$10$LhC7K9g5GZIa/pLJrD/MUOx4UJlsRiVb5irbKeAJmInYrBL6IH5Wm',2,'2025-09-11 11:44:52','2025-09-11 18:21:39'),(3,'test2','test2@gmail.com','$2a$10$LhC7K9g5GZIa/pLJrD/MUOx4UJlsRiVb5irbKeAJmInYrBL6IH5Wm',2,'2025-09-11 11:44:59','2025-09-11 18:21:39'),(5,'test3','test3@gmail.com','$2a$10$LhC7K9g5GZIa/pLJrD/MUOx4UJlsRiVb5irbKeAJmInYrBL6IH5Wm',2,'2025-09-11 18:21:22','2025-09-11 18:21:22'),(6,'test4','test4@gmail.com','$2a$10$Dvn9sEjdO/AdybnOacCwu.hHRc9caVyExYiB7TwXBfO74Nle42Tba',2,'2025-09-12 18:55:56','2025-09-12 18:55:56'),(7,'test5','test5@gmail.com','$2a$10$dXBciNrOLmJFXJ7h3FRo/.BT42ygEn9dkoWtugmlsOi6FRahkXAwS',2,'2025-09-12 20:45:12','2025-09-12 20:45:12'),(8,'test6','test6@gmail.com','$2a$10$mHUkSejLeKPHou04gtzYyu6CXq6IQ2ewFc.3i9nCjGCNIX1p2d7fW',2,'2025-09-12 20:46:49','2025-09-12 20:46:49');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-13  7:36:33
