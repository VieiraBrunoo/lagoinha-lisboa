-- Dump created by MySQL pump utility, version: 5.7.25, Win64 (x86_64)
-- Dump start time: Wed Mar 13 19:07:16 2019
-- Server version: 5.7.25

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE;
SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET @@SESSION.SQL_LOG_BIN= 0;
SET @OLD_TIME_ZONE=@@TIME_ZONE;
SET TIME_ZONE='+00:00';
SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT;
SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS;
SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION;
SET NAMES utf8;
CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lagoinhalisboa` /*!40100 DEFAULT CHARACTER SET latin1 */;
CREATE TABLE `lagoinhalisboa`.`usuarios` (
`ID_USUARIO` int(11) NOT NULL,
`LOGIN` varchar(45) NOT NULL,
`SENHA` varchar(45) NOT NULL,
PRIMARY KEY (`ID_USUARIO`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
;
INSERT INTO `lagoinhalisboa`.`usuarios` VALUES (1,"BRUNO","BRUNO0848979"),(2,"VIEIRA","BRUNO0986764");
SET TIME_ZONE=@OLD_TIME_ZONE;
SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT;
SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS;
SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
SET SQL_MODE=@OLD_SQL_MODE;
-- Dump end time: Wed Mar 13 19:07:17 2019
