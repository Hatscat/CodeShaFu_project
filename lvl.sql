-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Dim 25 Mai 2014 à 09:25
-- Version du serveur :  5.6.17
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `test`
--

-- --------------------------------------------------------

--
-- Structure de la table `lvl`
--

CREATE TABLE IF NOT EXISTS `lvl` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `nomFichier` varchar(30) NOT NULL,
  `hints` text NOT NULL,
  `rules` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=15 ;

--
-- Contenu de la table `lvl`
--

INSERT INTO `lvl` (`ID`, `nomFichier`, `hints`, `rules`) VALUES
(5, 'chuck noris', 'nope', ''),
(6, 'Test', 'it''s a trap', ''),
(7, 'zerg', 'Hints : no it is not', ''),
(8, 'SuperName', 'Hints : none', ''),
(9, 'SuperName', 'Hints : none', ''),
(10, 'SuperName', 'Hints : none', ''),
(11, 'SuperName', 'Hints : none', ''),
(12, 'noName', 'Hints : nope', ''),
(13, 'Ma super map', 'Hints : there''s no point in this map', 'Rules : anarchy;'),
(14, 'Ma super map', 'Hints : no point', 'Rules : anarchy');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
