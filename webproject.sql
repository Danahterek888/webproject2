-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: webproject
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contactmessages`
--

DROP TABLE IF EXISTS `contactmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contactmessages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `message` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contactmessages`
--

LOCK TABLES `contactmessages` WRITE;
/*!40000 ALTER TABLE `contactmessages` DISABLE KEYS */;
INSERT INTO `contactmessages` VALUES (1,'Danah','52310106@students.liu.edu.lb','jjjj'),(2,'cookie','dael-ter@student.42beirut.com','hhh'),(3,'Danah Terek','52310106@students.liu.lb','jjj');
/*!40000 ALTER TABLE `contactmessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(50) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'blue dust',20.00,'colored','https://echovalley.net/dashboard/eyecare-dashboard/public/images/Blue-1624652823.jpg'),(2,'black glasses',50.00,'glasses','https://wefix.co.za/cdn/shop/files/2_a323fd4e-9baf-4798-822a-9d08f96e3650.png?v=1689854533'),(3,'clear x30',80.00,'clear','https://i5.walmartimages.com/seo/Clear-Eyes-Contact-Lens-Relief-Lubricant-Eye-Drops-0-5-fl-oz_a6914a8b-b025-461a-b374-7b2cf57d99bd.97391cf52b5695251da258d4e13ed325.jpeg'),(4,'olive eyes',60.00,'colored','https://echovalley.net/dashboard/eyecare-dashboard/public/images/Blue-1624652823.jpg'),(5,'hazel',20.00,'colored','https://echovalley.net/dashboard/eyecare-dashboard/public/images/Blue-1624652823.jpg'),(6,'brown',20.00,'colored','https://echovalley.net/dashboard/eyecare-dashboard/public/images/Blue-1624652823.jpg'),(7,'gold glasses',80.00,'glasses','https://wefix.co.za/cdn/shop/files/2_a323fd4e-9baf-4798-822a-9d08f96e3650.png?v=1689854533'),(8,'plastic glasses',20.00,'glasses','https://wefix.co.za/cdn/shop/files/2_a323fd4e-9baf-4798-822a-9d08f96e3650.png?v=1689854533'),(9,'stainless glasses',20.00,'glasses','https://wefix.co.za/cdn/shop/files/2_a323fd4e-9baf-4798-822a-9d08f96e3650.png?v=1689854533'),(10,'clear daily',50.00,'clear','https://i5.walmartimages.com/seo/Clear-Eyes-Contact-Lens-Relief-Lubricant-Eye-Drops-0-5-fl-oz_a6914a8b-b025-461a-b374-7b2cf57d99bd.97391cf52b5695251da258d4e13ed325.jpeg'),(11,'clear yearly',50.00,'clear','https://i5.walmartimages.com/seo/Clear-Eyes-Contact-Lens-Relief-Lubricant-Eye-Drops-0-5-fl-oz_a6914a8b-b025-461a-b374-7b2cf57d99bd.97391cf52b5695251da258d4e13ed325.jpeg'),(12,'clear x100',20.00,'clear','https://i5.walmartimages.com/seo/Clear-Eyes-Contact-Lens-Relief-Lubricant-Eye-Drops-0-5-fl-oz_a6914a8b-b025-461a-b374-7b2cf57d99bd.97391cf52b5695251da258d4e13ed325.jpeg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-30 20:59:20
