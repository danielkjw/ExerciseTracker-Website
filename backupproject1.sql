-- MySQL dump 10.13  Distrib 5.5.57, for debian-linux-gnu (x86_64)
--
-- Host: 0.0.0.0    Database: project2
-- ------------------------------------------------------
-- Server version	5.5.57-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bweight`
--

DROP TABLE IF EXISTS `bweight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bweight` (
  `bid` int(11) NOT NULL AUTO_INCREMENT,
  `bdate` date NOT NULL,
  `weight` int(50) NOT NULL,
  `member_id` int(11) NOT NULL,
  `units` varchar(5) NOT NULL,
  PRIMARY KEY (`bid`),
  KEY `bweight_member_fk` (`member_id`),
  CONSTRAINT `bweight_member_fk` FOREIGN KEY (`member_id`) REFERENCES `member` (`mid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bweight`
--

LOCK TABLES `bweight` WRITE;
/*!40000 ALTER TABLE `bweight` DISABLE KEYS */;
INSERT INTO `bweight` VALUES (1,'2018-06-13',50,1,'kg'),(2,'2018-03-07',55,2,'kg'),(3,'2018-06-13',165,3,'lbs'),(4,'2018-10-05',170,4,'lbs'),(5,'2018-12-03',180,5,'lbs'),(6,'2018-02-22',160,6,'lbs'),(7,'2018-03-05',160,7,'lbs'),(10,'2018-06-12',232,1,'kg');
/*!40000 ALTER TABLE `bweight` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ecategory`
--

DROP TABLE IF EXISTS `ecategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ecategory` (
  `cid` int(11) NOT NULL AUTO_INCREMENT,
  `cname` varchar(255) NOT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `category_cname_unique` (`cname`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ecategory`
--

LOCK TABLES `ecategory` WRITE;
/*!40000 ALTER TABLE `ecategory` DISABLE KEYS */;
INSERT INTO `ecategory` VALUES (6,'Abs'),(5,'Arms'),(2,'Back'),(1,'Chest'),(3,'Legs'),(4,'Shoulders');
/*!40000 ALTER TABLE `ecategory` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`kimdanieljw`@`%`*/ /*!50003 TRIGGER Before_Insert_Category BEFORE INSERT ON `ecategory`
FOR EACH ROW
BEGIN
  IF (EXISTS(SELECT 1 FROM `ecategory` WHERE cname = NEW.cname)) THEN
    SIGNAL SQLSTATE VALUE '45000' SET MESSAGE_TEXT = 'INSERT failed due to duplicate category name';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `exercise` (
  `eid` int(11) NOT NULL AUTO_INCREMENT,
  `ename` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  PRIMARY KEY (`eid`),
  UNIQUE KEY `exercise_ename_unique` (`ename`),
  KEY `exercise_category_fk` (`category_id`),
  CONSTRAINT `exercise_category_fk` FOREIGN KEY (`category_id`) REFERENCES `ecategory` (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,'Barbell Bench Press',1,'Compound exercise for chest. Mass builder.'),(2,'Pullups',2,'Compound exercise for chest'),(3,'Barbell Squats',3,'Compound exercise for legs'),(4,'Incline Press',1,'Compound exercise for chest'),(5,'Lat Pulldown',2,'Compound exercise for chest'),(6,'Run',3,'Cardiovascular  intensive exercise'),(7,'Situp',6,'Beach body workout'),(8,'Leg Raise',6,'Great for lower abs.'),(9,'Barbell Shoulder Press',4,'Compound exercise for chest'),(10,'Tricep Kickbacks',5,'Single arm tricep extension'),(11,'Barbell curl',5,'Bicep builder!'),(12,'Incline dumbbell press',1,'Dumbbell exercise for chest'),(13,'Lunge',3,'Great leg exercise'),(14,'Side lateral raise',4,'Build the width of shoulders'),(15,'Arnold curl',5,'arnold does it!'),(16,'Cable Press',1,'Great for definition for the chest!'),(17,'V-ups',6,'Great for total ab workouts'),(18,'Preacher Curls',5,'Bicep Isolation Exercise. Great strength builder.');
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friendship`
--

DROP TABLE IF EXISTS `friendship`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friendship` (
  `friend_id` int(11) NOT NULL AUTO_INCREMENT,
  `member1_id` int(11) NOT NULL,
  `member2_id` int(11) NOT NULL,
  `friendship_key` varchar(101) DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`friend_id`),
  UNIQUE KEY `friendship_member1_member2_unique` (`member1_id`,`member2_id`),
  KEY `fk_friendship_mem2id_mid` (`member2_id`),
  CONSTRAINT `fk_friendship_mem1id_mid` FOREIGN KEY (`member1_id`) REFERENCES `member` (`mid`) ON DELETE CASCADE,
  CONSTRAINT `fk_friendship_mem2id_mid` FOREIGN KEY (`member2_id`) REFERENCES `member` (`mid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friendship`
--

LOCK TABLES `friendship` WRITE;
/*!40000 ALTER TABLE `friendship` DISABLE KEYS */;
INSERT INTO `friendship` VALUES (1,1,3,'13-31',1),(2,1,4,'14-41',1),(3,2,3,'23-32',1),(4,2,4,'24-42',1),(5,2,5,'25-52',0),(6,3,5,'35-53',1),(7,3,6,'36-63',1),(8,3,7,'37-73',1),(9,3,8,'38-83',1),(10,4,3,'43-34',1),(11,4,5,'45-54',0),(12,4,7,'47-74',0),(13,5,7,'57-75',1),(14,5,8,'58-85',0),(15,1,7,'17-71',0),(16,1,8,'18-81',0),(17,2,8,'28-82',0);
/*!40000 ALTER TABLE `friendship` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `log`
--

DROP TABLE IF EXISTS `log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `log` (
  `lid` int(11) NOT NULL AUTO_INCREMENT,
  `ldate` date NOT NULL,
  `member_id` int(11) NOT NULL,
  PRIMARY KEY (`lid`),
  KEY `fk_log_member_id` (`member_id`),
  CONSTRAINT `fk_log_member_id` FOREIGN KEY (`member_id`) REFERENCES `member` (`mid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `log`
--

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;
INSERT INTO `log` VALUES (1,'2017-08-01',1),(2,'2018-08-10',1),(4,'2018-07-22',4),(5,'2018-09-02',5),(6,'2018-10-03',6),(7,'2018-11-04',7),(8,'2018-12-05',2),(10,'2018-06-11',11),(11,'2018-06-18',13);
/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `logdetails`
--

DROP TABLE IF EXISTS `logdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `logdetails` (
  `ldid` int(11) NOT NULL AUTO_INCREMENT,
  `exercise_id` int(11) NOT NULL,
  `log_id` int(11) NOT NULL,
  `eweight` int(11) NOT NULL,
  `eunits` varchar(11) NOT NULL,
  `sets` int(11) NOT NULL DEFAULT '0',
  `reps` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`ldid`),
  UNIQUE KEY `fk_unique_logdetails_eid_logid` (`exercise_id`,`log_id`),
  KEY `fk_logdetails_log_lid` (`log_id`),
  CONSTRAINT `fk_logdetails_exercise_eid` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`eid`) ON DELETE CASCADE,
  CONSTRAINT `fk_logdetails_log_lid` FOREIGN KEY (`log_id`) REFERENCES `log` (`lid`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `logdetails`
--

LOCK TABLES `logdetails` WRITE;
/*!40000 ALTER TABLE `logdetails` DISABLE KEYS */;
INSERT INTO `logdetails` VALUES (2,16,1,45,'kg',4,10),(3,6,2,55,'kg',4,10),(4,5,2,23,'kg',5,10),(7,7,4,3,'kg',3,11),(8,16,4,53,'kg',2,10),(9,9,5,73,'kg',1,15),(10,10,6,44,'kg',5,12),(11,11,6,23,'kg',3,11),(12,12,7,78,'kg',7,17),(13,13,7,10,'kg',6,20),(14,14,8,143,'lbs',5,5),(15,1,8,120,'lbs',3,7),(18,7,1,15,'kg',3,15),(19,17,1,15,'kg',3,8),(20,15,1,222,'kg',2,2);
/*!40000 ALTER TABLE `logdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `gender` char(2) NOT NULL,
  `age` int(11) NOT NULL,
  `photo` varchar(25) DEFAULT '0.jpeg',
  `aboutme` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'Daniel','SMITH','m',32,'1.jpeg','IRON MAN ! all love the burn'),(2,'Sally','Jane','m',33,'2.jpeg','You love exercise'),(3,'Jim','Jones','m',43,'3.jpeg','I heart donuts'),(4,'Tom','Jones','m',53,'4.jpeg','Trying my best'),(5,'Frank','Sinatra','m',35,'5.jpeg','Living'),(6,'Jessica','Jones','f',29,'6.jpeg','Fun'),(7,'Sarah','Parker','f',27,'7.jpeg','Live on the edge'),(8,'Tony','Stark','m',50,'8.jpeg','Destroy Thanos'),(10,'Mike','Tyson','m',55,'0.jpeg','Boxing is life'),(11,'Reinhart','Overwatch','m',500,'0.jpeg','Hammer Down!'),(13,'Tracer','Overwatch','f',21,'0.jpeg','Super fast!'),(17,'I','Robot','f',22,'0.jpeg','nothing');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member_exercise`
--

DROP TABLE IF EXISTS `member_exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member_exercise` (
  `meid` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  PRIMARY KEY (`meid`),
  UNIQUE KEY `fk_member_exercise_mem_ex_id_unique` (`member_id`,`exercise_id`),
  KEY `fk_member_exercise_eid` (`exercise_id`),
  CONSTRAINT `fk_member_exercise_mid` FOREIGN KEY (`member_id`) REFERENCES `member` (`mid`) ON DELETE CASCADE,
  CONSTRAINT `fk_member_exercise_eid` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`eid`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member_exercise`
--

LOCK TABLES `member_exercise` WRITE;
/*!40000 ALTER TABLE `member_exercise` DISABLE KEYS */;
INSERT INTO `member_exercise` VALUES (10,1,16),(2,2,2),(11,2,3),(3,3,3),(12,3,4),(22,3,18),(4,4,4),(13,4,5),(5,5,5),(14,5,6),(6,6,6),(16,6,12),(9,7,3),(7,7,7),(8,8,8),(18,11,4),(19,17,16);
/*!40000 ALTER TABLE `member_exercise` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-14  7:58:29
