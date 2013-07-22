CREATE DATABASE  IF NOT EXISTS `crawlingdatabase` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `crawlingdatabase`;
-- MySQL dump 10.13  Distrib 5.1.40, for Win32 (ia32)
--
-- Host: 127.0.0.1    Database: crawlingdatabase
-- ------------------------------------------------------
-- Server version	5.1.44-community

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
-- Table structure for table `temp`
--

DROP TABLE IF EXISTS `temp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `temp` (
  `site` varchar(1024) DEFAULT NULL,
  `url` varchar(1024) DEFAULT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `temp`
--

LOCK TABLES `temp` WRITE;
/*!40000 ALTER TABLE `temp` DISABLE KEYS */;
/*!40000 ALTER TABLE `temp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `webpages`
--

DROP TABLE IF EXISTS `webpages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `webpages` (
  `site` varchar(100) NOT NULL,
  `url` varchar(400) NOT NULL,
  `html_content` mediumtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `webpages`
--

LOCK TABLES `webpages` WRITE;
/*!40000 ALTER TABLE `webpages` DISABLE KEYS */;
INSERT INTO `webpages` VALUES ('www.darty.com','http://www.darty.com',''),('www.darty.com','http://www.darty.com/achat/aide-au-choix/support-mural-tv-ecran-plat.html',''),('www.darty.com','http://www.darty.com/achat/assistance/accueil.html',''),('www.darty.com','http://www.darty.com/achat/carte-de-paiement-darty/index.html',''),('www.darty.com','http://www.darty.com/achat/carte_cadeau/index.html',''),('www.darty.com','http://www.darty.com/achat/cuisine/index.html',''),('www.darty.com','http://www.darty.com/achat/cuisine/index.html?u=3&mn=1',''),('www.darty.com','http://www.darty.com/achat/faq/index.html',''),('www.darty.com','http://www.darty.com/achat/informations/informations_legales.html',''),('www.darty.com','http://www.darty.com/achat/informations/paiement_securise.html',''),('www.darty.com','http://www.darty.com/achat/liste-de-mariage/index.html',''),('www.darty.com','http://www.darty.com/achat/liste-de-mariage/index.html?m=10001',''),('www.darty.com','http://www.darty.com/achat/newsletter/index.html',''),('www.darty.com','http://www.darty.com/achat/partenaire/affiliation/index.html',''),('www.darty.com','http://www.darty.com/achat/partenaire/poweo/index.html',''),('www.darty.com','http://www.darty.com/achat/views/services.html',''),('www.darty.com','http://www.darty.com/achat/web-tv/index.html?m=10001',''),('www.darty.com','http://www.darty.com/catalogue_darty.htm',''),('www.darty.com','http://www.darty.com/nav/achat/accessoires/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/accessoires_mp3/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/accessoires_pour_ipod/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/animation/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/casque_ecouteurs/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/haut_parleur_ipod/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/ipod_classic/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/ipod_nano/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/ipod_shuffle/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/ipod_touch/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/lecteurs_mp3/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/radio_radio_dictaphone/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/reveil/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/audio_mp3_mp4/station_meteo/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/dsi/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/gaming__220710/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/jeux/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/jeux_jouet/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/ps2/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/ps3/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/psp/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/wii/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/console_jeux/xbox_360/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/cave_vin_encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/congelateur_encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/cuisson_specifique/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/dominos_cuisson/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/expresso/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/four_classique/four_encastrable/index.pl?pack_eco=true&&u=13&mn=1',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/four_classique/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/grand_refrigerateur/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/hotte/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/lave-linge_encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/lave-vaisselle_encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/micro-ondes_encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/piano_cuisson/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/refrigerateur_cong_encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/refrigerateur_encastrable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/encastrable/tables_cuisson/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gps_autoradio_dvd_portable/autoradio/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gps_autoradio_dvd_portable/dvd_portable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gps_autoradio_dvd_portable/equipement_gps/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gps_autoradio_dvd_portable/gps_avertisseur_radar/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gps_autoradio_dvd_portable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/cave_vin/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/climatisation/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/congelateur/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/cuisinieres/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/four_encastrer/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/grillade_barbecue/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/hotte/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/lave-linge/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/lave-vaisselle/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/micro_ondes/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/refrigerateurs/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/refrigerateur_congelateur/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/seche-linge/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/table_cuisson/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/gros_electromenager/toute_casserolerie/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/accessoires_pour_televiseurs/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/casque_ecouteurs/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/connectique_audio_video/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/disque_dur_magnetoscope/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/element/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/elements_separes/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/enceintes/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/enceintes_home_cinema/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/lecteurs_enregistreurs_blu-ray/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/lecteurs_enregistreurs_dvd/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/reception_tnt_satellite/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/systeme_home_cinema/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/televiseurs/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/tnt/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/hifi_video/videoprojecteur/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/accessoire_bureau/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/accessoire_informatique/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/accessoire_ordinateur_apple/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/accessoire_portable/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/alimentation_informatique/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/animation/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/bureau/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/calculatrice/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/cartouche_encre/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/clavier_souris/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/disque_dur_externe/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/haut_parleur_casque_webcam/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/imprimante/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/index.html',''),('www.darty.com','http://www.darty.com/nav/achat/informatique/logiciel/index.html','');
/*!40000 ALTER TABLE `webpages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'crawlingdatabase'
--
/*!50003 DROP PROCEDURE IF EXISTS `InsertPage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50020 DEFINER=`root`@`localhost`*/ /*!50003 PROCEDURE `InsertPage`(IN site VARCHAR(2028), IN searchedUrl VARCHAR(2048))
BEGIN
    DECLARE numUrls INT;
    SELECT COUNT(*) INTO numUrls FROM `webpages` WHERE url = searchedUrl;
    IF numUrls = 0 THEN
        INSERT INTO `crawlingdatabase`.`webpages`
            (`site`,`url`,`html_content`)
        VALUES
            (site,searchedUrl,'');
    END IF;
    
    SELECT numUrls;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2010-03-25  7:03:44
