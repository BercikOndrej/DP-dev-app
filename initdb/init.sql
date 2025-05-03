-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 05, 2025 at 02:40 PM
-- Server version: 8.4.4
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pojdteven`
--

-- --------------------------------------------------------

--
-- Table structure for table `Action`
--

CREATE TABLE `Action` (
  `id` varchar(255) NOT NULL,
  `imagePath` varchar(512) DEFAULT NULL,
  `existsFrom` datetime DEFAULT NULL,
  `note` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Action`
--

INSERT INTO `Action` (`id`, `imagePath`, `existsFrom`, `note`) VALUES
('06ac8089-ddef-4abd-a62e-cb7b580cf53c', 'static/actions/action-06ac8089-ddef-4abd-a62e-cb7b580cf53c.jpg', '2025-03-11 09:05:55', ''),
('2124af9d-b97a-4563-a2f6-196fa5a96a7d', 'static/actions/action-2124af9d-b97a-4563-a2f6-196fa5a96a7d.jpg', '2025-03-15 17:52:02', ''),
('2377dc84-33ad-4b6e-98cd-aeda34edf006', 'static/actions/action-2377dc84-33ad-4b6e-98cd-aeda34edf006.png', '2025-04-04 13:32:55', NULL),
('39bac9c9-fc10-4a29-ade2-f55068217764', 'static/actions/action-39bac9c9-fc10-4a29-ade2-f55068217764.jpg', '2025-02-28 10:01:29', ''),
('e23c22fc-3793-476b-8906-4fc15bb5b682', 'static/actions/action-e23c22fc-3793-476b-8906-4fc15bb5b682.jpg', '2025-02-05 13:54:08', '');

-- --------------------------------------------------------

--
-- Table structure for table `Address`
--

CREATE TABLE `Address` (
  `id` int NOT NULL,
  `street` varchar(512) DEFAULT NULL,
  `houseNumber` varchar(512) DEFAULT NULL,
  `city` varchar(512) NOT NULL,
  `zipCode` varchar(512) NOT NULL,
  `note` varchar(512) DEFAULT NULL,
  `userId` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Address`
--

INSERT INTO `Address` (`id`, `street`, `houseNumber`, `city`, `zipCode`, `note`, `userId`) VALUES
(1, 'Mánesova', '353/13', 'Olomouc', '779 00', NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
(2, 'Test Street', '11/22', 'Test City', '111 11', 'test note', '0b8d33ce-4a75-4062-8daf-6b4a26c06b94'),
(3, 'Test Street', '11/22', 'Test City', '111 11', 'test note', '623eef5a-fe43-4404-b370-5a0923eca4db'),
(5, 'Test Street', '11/22', 'Test City', '111 11', 'test note', 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
(23, 'Lošov', '99', 'Olomouc', '111 11', '', '25402613-a527-4501-9472-b7268cdcc093'),
(25, 'Lošov', '99', 'Olomouc', '783 65', '', '1e6c5e87-eb8f-4200-8636-274b33d23648');

-- --------------------------------------------------------

--
-- Table structure for table `Attendance`
--

CREATE TABLE `Attendance` (
  `id` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `tag` varchar(512) NOT NULL,
  `pickUp` tinyint DEFAULT NULL,
  `childId` varchar(512) DEFAULT NULL,
  `userId` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Attendance`
--

INSERT INTO `Attendance` (`id`, `date`, `tag`, `pickUp`, `childId`, `userId`) VALUES
('0cc7decd-c708-4bba-9887-89651ae02d4e', '2025-06-03', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('122c1cba-9f4b-47a6-a14b-9f09dd3760a4', '2025-06-05', 'normal', 0, NULL, '623eef5a-fe43-4404-b370-5a0923eca4db'),
('1860f4d6-f9af-4b9c-b81d-9eac13ecdcdf', '2025-06-20', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('1b4e4a0d-8f47-4dcb-92e7-434a8b465071', '2025-06-03', 'normal', 0, NULL, '623eef5a-fe43-4404-b370-5a0923eca4db'),
('20467c9f-a265-49ee-8423-4a09d3d83991', '2025-06-26', 'normal', 1, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('2204ad35-5d82-41db-a882-9cea2bf73101', '2025-06-19', 'normal', 0, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('22c964d1-af41-461c-a3ba-f2d5c2c5d6e0', '2025-06-09', 'normal', 1, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('24662eed-a3a9-4736-b13e-ad8c92d9a938', '2025-06-11', 'normal', 1, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('29748130-82a8-43c6-988d-47f9db8bd17d', '2025-06-16', 'normal', 1, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('29da9c53-7a2b-4476-bbd0-7e70e51942eb', '2025-06-25', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('31c83f44-3811-4fc6-bda8-313d8d9ef81f', '2025-06-03', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('3ce995f0-9292-45a4-8fc1-66f6d421d84d', '2025-06-30', 'normal', 1, NULL, '623eef5a-fe43-4404-b370-5a0923eca4db'),
('3ec37b52-a315-46ff-b1b4-487b80737a6f', '2025-06-09', 'normal', 0, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('43041484-96fc-4b9b-bc01-c3f03999ad1e', '2025-06-26', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('4cc62e49-7738-4ad6-a9a7-4e935beddf0a', '2025-06-05', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('50109717-a36c-449d-8122-a6eeecf5b878', '2025-06-26', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('5393193d-6777-44ab-9141-8fc5f7070e71', '2025-06-13', 'normal', 1, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('555080d9-0f2c-461c-aec1-a7bf744b4fd6', '2025-06-06', 'normal', 0, NULL, '623eef5a-fe43-4404-b370-5a0923eca4db'),
('5a85ffec-4c21-4b0a-981d-7fa8378be76e', '2025-06-18', 'normal', 1, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('5b928be9-7523-45f1-9d27-963ecf6ac89d', '2025-06-16', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('5e7f1b98-48f2-47fc-be71-924b0d6651a1', '2025-06-04', 'normal', 1, NULL, '0b8d33ce-4a75-4062-8daf-6b4a26c06b94'),
('6161a295-35b3-45e0-86ec-d7f7bc6a2f65', '2025-06-19', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('6545e9aa-9006-4126-9114-16450f95cc1f', '2025-06-10', 'normal', 0, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('722526a5-06e9-450a-b1a6-ba3a5392f03d', '2025-06-04', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('73cadd96-61aa-481a-a633-2953bc65f7c2', '2025-06-13', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('744f5d89-6600-4c78-b9ba-f4321e82568a', '2025-06-23', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('78e9fde6-1aa5-47ca-b926-3a21dcda7d87', '2025-06-27', 'normal', 0, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('7aee5c7b-5ae7-4502-b142-1bd38afc1a63', '2025-06-05', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('7dc83337-e837-454b-9b56-d6877eadb32a', '2025-06-20', 'normal', 1, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('80a38c4c-21f0-4662-b2fc-2be2659b4abe', '2025-06-17', 'normal', 0, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('82ae85d0-4eac-4b1d-abff-80745eb4ea0e', '2025-06-13', 'normal', 0, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('850b8a72-dc43-4b11-bb9f-f06025de8e35', '2025-06-26', 'normal', 0, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('88826cc1-2d66-48c1-99d2-a4b1fd7febe7', '2025-06-16', 'normal', 0, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('8c1e7f00-e2a2-49cf-871e-fba1a23d1079', '2025-06-06', 'normal', 1, NULL, '0b8d33ce-4a75-4062-8daf-6b4a26c06b94'),
('914a91a5-f493-418f-9349-ab2be4f07ac1', '2025-06-04', 'normal', 0, NULL, '623eef5a-fe43-4404-b370-5a0923eca4db'),
('96a73729-34b9-4f27-8e8c-ee8b336249a0', '2025-06-11', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('96b678f8-a68b-4350-a58c-e3d165fdb37f', '2025-06-12', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('996070ab-86f1-4fc5-8f00-36dafba01081', '2025-06-10', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('9b267dd2-2609-431a-8f23-3ac24171dcf0', '2025-06-23', 'normal', 0, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('9cad1c4f-efe2-432b-b90f-5f71fc3af6b7', '2025-06-24', 'normal', 0, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('a12757fe-edce-46e9-be09-2214d01590f1', '2025-06-12', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('a170dd5c-de61-463d-95f8-0b86f5badc0d', '2025-06-02', 'normal', 0, NULL, '623eef5a-fe43-4404-b370-5a0923eca4db'),
('a4be2df3-8d9b-42fd-9226-fe3f2d281d43', '2025-06-05', 'normal', 1, NULL, '0b8d33ce-4a75-4062-8daf-6b4a26c06b94'),
('a7b1d71b-30e0-44f4-85ca-032d0588695a', '2025-06-19', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('ab24a5b9-d0ed-48a3-b7f2-65837289ce06', '2025-06-11', 'normal', 0, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('ab72c302-65bf-4735-be6a-15eb2a218793', '2025-06-06', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('b7ce6bd1-04f3-472a-aa89-b287e13648a3', '2025-06-09', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('bbc8471f-a657-42bd-b05f-e0245a1e7130', '2025-06-18', 'normal', 0, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('bc980225-99af-4de4-b087-c25dc4457fc6', '2025-06-02', 'normal', 1, NULL, '0b8d33ce-4a75-4062-8daf-6b4a26c06b94'),
('c2ffe595-8073-4b53-ac2f-c47615b49408', '2025-06-27', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('c3c0cd58-83d3-4949-a81b-3202af1eebf2', '2025-06-24', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('c81507ec-7b2d-451c-987d-d98ce2afd8a1', '2025-06-12', 'normal', 0, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('c81ee408-5ad2-4280-b87b-9df83395cb5f', '2025-06-17', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('cd40e5ea-1995-409d-b6d4-c9bd1d93172a', '2025-06-20', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('d498d47a-601b-4d95-b5e0-3f3cec384b29', '2025-06-17', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('d4bc5cd2-c006-4403-a0ce-db431fca038f', '2025-06-24', 'normal', 1, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('d53f9186-7e9f-468c-8601-b9b3823f9a7a', '2025-06-30', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('d93397cc-a453-4a67-b79a-330e408b56ae', '2025-06-13', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('db6e0213-6644-4090-929b-e9575be2e86c', '2025-06-10', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('dbb28f94-df52-4984-b03b-292ec267e96c', '2025-06-25', 'normal', 0, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('de2315e6-ed5d-4f97-a902-8521d00f2f84', '2025-06-24', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('de248ebc-9979-4fc3-9fa6-ec9c0049a4b5', '2025-06-03', 'normal', 1, NULL, '0b8d33ce-4a75-4062-8daf-6b4a26c06b94'),
('de9512dc-a90f-40ea-a342-b0f84e7e49a2', '2025-06-27', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('e0fb7ff8-c402-450b-9486-5a17ad9ccbcc', '2025-06-25', 'normal', 1, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('e2156f60-763d-4c58-bd8b-4ebfc17a6241', '2025-06-02', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('e28880d3-107c-43e9-b4b0-bf0baa375918', '2025-06-12', 'normal', 1, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('e53714d0-6537-4d3a-a2ea-3d33c0e4ec99', '2025-06-10', 'normal', 1, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('e819b83b-5d28-4bd9-979c-e5507f593a43', '2025-06-06', 'normal', NULL, '47519695-023a-4739-9249-90b13e9501ea', NULL),
('e83ef4b4-3623-4771-9cd8-c09c2700342a', '2025-06-19', 'normal', 1, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('e99684b6-7a12-4f98-8ed4-3a77ea99a716', '2025-06-23', 'normal', 1, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('e9b1b338-5288-43af-871c-7678fef9ee29', '2025-06-17', 'normal', 1, NULL, 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('f11a0e54-c74c-4f02-ba10-85fd880ad68c', '2025-06-18', 'normal', NULL, '64fe3899-5ffc-4c4d-b311-0286fe80d67b', NULL),
('f31ca7ab-b184-498f-a073-b3c08c73debc', '2025-06-30', 'normal', 0, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('f61fb11a-03bf-4665-a448-be1a250abc73', '2025-06-20', 'normal', 0, NULL, 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567'),
('fa693ab3-2124-4279-8336-743cf9b82134', '2025-06-27', 'normal', 1, NULL, '8ad5519b-e513-4245-ae4e-800a3aa62016');

-- --------------------------------------------------------

--
-- Table structure for table `Child`
--

CREATE TABLE `Child` (
  `id` varchar(255) NOT NULL,
  `fullName` varchar(512) NOT NULL,
  `dateOfBirth` date NOT NULL,
  `description` varchar(512) DEFAULT NULL,
  `monthlyFee` int NOT NULL,
  `schoolDays` varchar(512) NOT NULL,
  `note` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Child`
--

INSERT INTO `Child` (`id`, `fullName`, `dateOfBirth`, `description`, `monthlyFee`, `schoolDays`, `note`) VALUES
('47519695-023a-4739-9249-90b13e9501ea', 'Andrew Doe', '2025-01-01', 'Testovací popis', 6000, '134', ''),
('64fe3899-5ffc-4c4d-b311-0286fe80d67b', 'Amálie Doe', '2025-01-01', 'Testovací popis', 7500, '01234', '');

-- --------------------------------------------------------

--
-- Table structure for table `ContactInfo`
--

CREATE TABLE `ContactInfo` (
  `id` int NOT NULL,
  `fullName` varchar(512) NOT NULL,
  `email` varchar(512) NOT NULL,
  `phoneNumber` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ContactInfo`
--

INSERT INTO `ContactInfo` (`id`, `fullName`, `email`, `phoneNumber`) VALUES
(1, 'Alena Kubánková', 'al.kubankova@email.cz', '+420 606 921 133'),
(2, 'Hana Kovaříková', 'pojdteven@gmail.com', '+420 608 344 710');

-- --------------------------------------------------------

--
-- Table structure for table `DayActivity`
--

CREATE TABLE `DayActivity` (
  `id` int NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `description` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `DayActivity`
--

INSERT INTO `DayActivity` (`id`, `startTime`, `endTime`, `description`) VALUES
(1, '07:30:00', '09:00:00', 'příjezd do školky'),
(2, '07:30:00', '09:30:00', 'volná hra, práce u stolečku'),
(3, '09:30:00', '10:00:00', 'ranní kruh, svačina'),
(4, '10:00:00', '12:00:00', 'výprava do okolí, dopolední program'),
(5, '12:30:00', '13:45:00', 'příprava na oběd, oběd'),
(6, '13:45:00', '14:45:00', 'odpočinek či spánek'),
(7, '14:15:00', '14:45:00', 'volná hra a tvoření'),
(8, '14:45:00', '15:15:00', 'příprava na svačinu, svačina, vyzvedávání dětí v Lošově'),
(9, '15:15:00', '15:20:00', 'odchod na autobus'),
(10, '16:05:00', '16:10:00', 'předávání dětí na zastávce Hlavní nádraží, Olomouc');

-- --------------------------------------------------------

--
-- Table structure for table `GeneralInfo`
--

CREATE TABLE `GeneralInfo` (
  `id` int NOT NULL,
  `title` varchar(512) DEFAULT NULL,
  `content` longtext,
  `page` varchar(512) DEFAULT NULL,
  `position` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `GeneralInfo`
--

INSERT INTO `GeneralInfo` (`id`, `title`, `content`, `page`, `position`) VALUES
(1, 'Věková kategorie', '<p>1 &ndash; 3 roky, s doprovodem</p>', 'AdaptationProgram', 1),
(2, 'Adresa', '<p>Lesn&iacute; dětsk&yacute; klub Pojďte VEN, Olomouc - Lo&scaron;ov</p>\n<p>Lo&scaron;ov 99, 783 65 Olomouc</p>', 'Global', 2),
(3, 'Provozní období', '<div>\n<p>Vždy v &uacute;ter&yacute; 9:30&ndash;12:00</p>\n<p>Od 10.9. do 3.12. 2024</p>\n<p>Celkem 12 setk&aacute;n&iacute;</p>\n<p>Od 11:30 společn&aacute; pol&eacute;vka, kter&aacute; je v ceně</p>\n</div>', 'AdaptationProgram', 3),
(4, 'Ceník', '<div className=\'flex flex-col gap-4\'><p>Jednorázově 250,- Kč/dítě</p><p>Při zakoupení 10 vstupů 200,- Kč/dítě</p></div>', 'AdaptationProgram', 4),
(5, 'Věková kategorie', '<p>3-7 let</p>', 'ForestClub', 1),
(6, 'Provozní období', '<p>Září - Červen</p>', 'ForestClub', 3),
(7, 'Ceník', '<ul>\n<li>5 dnů v t&yacute;dnu: 8 500,- Kč za měs&iacute;c</li>\n<li>4 dny v t&yacute;dnu: 8 250,- Kč za měs&iacute;c</li>\n<li>3 dny v t&yacute;dnu: 8 000,- Kč za měs&iacute;c</li>\n<li>2 dny v t&yacute;dnu: 7 750,- Kč za měs&iacute;c</li>\n</ul>\n<p>Možn&aacute; sleva ve v&yacute;&scaron;i 2 000,- Kč/měs&iacute;c</p>\n<p>Sleva na sourozence 2 500,- Kč/měs&iacute;c</p>\n<p>Stravn&eacute;: 70 Kč/den doch&aacute;zky</p>\n<p>POZN.: Slevy se daj&iacute; sč&iacute;tat</p>', 'ForestClub', 4);

-- --------------------------------------------------------

--
-- Table structure for table `Parenthood`
--

CREATE TABLE `Parenthood` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(512) NOT NULL,
  `childId` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Parenthood`
--

INSERT INTO `Parenthood` (`id`, `userId`, `childId`) VALUES
('2d8348a8-7b1c-48bf-91af-57e03087f36b', '25402613-a527-4501-9472-b7268cdcc093', '64fe3899-5ffc-4c4d-b311-0286fe80d67b'),
('8c08a8f6-b965-4c6a-85c5-48993f270633', '25402613-a527-4501-9472-b7268cdcc093', '47519695-023a-4739-9249-90b13e9501ea');

-- --------------------------------------------------------

--
-- Table structure for table `Photo`
--

CREATE TABLE `Photo` (
  `id` varchar(255) NOT NULL,
  `existsFrom` datetime DEFAULT NULL,
  `imagePath` varchar(512) DEFAULT NULL,
  `tag` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Photo`
--

INSERT INTO `Photo` (`id`, `existsFrom`, `imagePath`, `tag`) VALUES
('032e73d1-d87d-4812-8f50-22eb196c4435', '2025-02-05 13:54:08', 'static/photogallery/photo-032e73d1-d87d-4812-8f50-22eb196c4435.jpg', 'Places'),
('06fecaf4-cbcc-4410-90ce-4f607740193b', '2025-02-05 13:54:08', 'static/photogallery/photo-06fecaf4-cbcc-4410-90ce-4f607740193b.webp', 'ForestClub'),
('0c24e088-f75d-4275-9e6a-a2ed96f0961f', '2025-02-05 13:54:08', 'static/photogallery/photo-0c24e088-f75d-4275-9e6a-a2ed96f0961f.webp', 'ForestClub'),
('15c0c4d7-5062-4ba5-a5f1-4203b521bd64', '2025-02-05 13:54:08', 'static/photogallery/photo-15c0c4d7-5062-4ba5-a5f1-4203b521bd64.jpg', 'AdaptationProgram'),
('1c14bca9-479e-4a05-8bd8-40c37bd1373a', '2025-02-05 13:54:08', 'static/photogallery/photo-1c14bca9-479e-4a05-8bd8-40c37bd1373a.jpg', 'Places'),
('1eb5d306-31e4-41fc-baa4-92594743d748', '2025-02-05 13:54:08', 'static/photogallery/photo-1eb5d306-31e4-41fc-baa4-92594743d748.webp', 'ForestClub'),
('20050d77-6ab0-4662-ad16-81605d5ec9f0', '2025-02-05 13:54:08', 'static/photogallery/photo-20050d77-6ab0-4662-ad16-81605d5ec9f0.webp', 'ForestClub'),
('325884af-a01d-43b9-a084-6bc9a58d9f6c', '2025-02-05 13:54:08', 'static/photogallery/photo-325884af-a01d-43b9-a084-6bc9a58d9f6c.jpg', 'Places'),
('41e02036-3f8c-42db-892b-fe9110ac579d', '2025-02-05 13:54:08', 'static/photogallery/photo-41e02036-3f8c-42db-892b-fe9110ac579d.webp', 'ForestClub'),
('44b9d8d0-5c06-4e3a-b5b6-1148b8839959', '2025-02-05 13:54:08', 'static/photogallery/photo-44b9d8d0-5c06-4e3a-b5b6-1148b8839959.jpg', 'Places'),
('4bba6cdd-a9b9-4a94-8a10-d886aa17a739', '2025-02-05 13:54:08', 'static/photogallery/photo-4bba6cdd-a9b9-4a94-8a10-d886aa17a739.webp', 'ForestClub'),
('4e99d7cd-a968-4ee9-bbe7-6b4197b95bb8', '2025-02-05 13:54:08', 'static/photogallery/photo-4e99d7cd-a968-4ee9-bbe7-6b4197b95bb8.jpg', 'Places'),
('4ee0d527-dfc5-4d72-a100-b404d6e64fa0', '2025-02-05 13:54:08', 'static/photogallery/photo-4ee0d527-dfc5-4d72-a100-b404d6e64fa0.webp', 'ForestClub'),
('5675a631-1776-4205-88f0-2d3bd4097448', '2025-02-05 13:54:08', 'static/photogallery/photo-5675a631-1776-4205-88f0-2d3bd4097448.webp', 'ForestClub'),
('61e09143-b5e6-4d0e-b43f-f04b331e709d', '2025-02-05 13:54:08', 'static/photogallery/photo-61e09143-b5e6-4d0e-b43f-f04b331e709d.webp', 'ForestClub'),
('6545245e-4933-4f05-98eb-f6060416201b', '2025-02-05 13:54:08', 'static/photogallery/photo-6545245e-4933-4f05-98eb-f6060416201b.webp', 'ForestClub'),
('7016fc6c-97a6-4b2f-8957-6faeeb77230e', '2025-02-05 13:54:08', 'static/photogallery/photo-7016fc6c-97a6-4b2f-8957-6faeeb77230e.jpg', 'AdaptationProgram'),
('7e60bbe2-59cc-4968-aeb6-ebf8ad80bb28', '2025-02-05 13:54:08', 'static/photogallery/photo-7e60bbe2-59cc-4968-aeb6-ebf8ad80bb28.jpg', 'Places'),
('880d3254-1101-4cd2-ae76-fcf0ddfd009b', '2025-02-05 13:54:08', 'static/photogallery/photo-880d3254-1101-4cd2-ae76-fcf0ddfd009b.jpg', 'AdaptationProgram'),
('930bcf14-fee6-48cf-b5ca-29c5099a42e2', '2025-02-05 13:54:08', 'static/photogallery/photo-930bcf14-fee6-48cf-b5ca-29c5099a42e2.webp', 'ForestClub'),
('9b688382-22c5-454e-a123-7d91b26f2c2e', '2025-02-05 13:54:08', 'static/photogallery/photo-9b688382-22c5-454e-a123-7d91b26f2c2e.jpg', 'AdaptationProgram'),
('9b9eb0a4-1246-40e6-b039-e4fa4ba1abd1', '2025-02-05 13:54:08', 'static/photogallery/photo-9b9eb0a4-1246-40e6-b039-e4fa4ba1abd1.webp', 'ForestClub'),
('9c1183e6-7224-49b5-9691-1725e1fdc067', '2025-02-05 13:54:08', 'static/photogallery/photo-9c1183e6-7224-49b5-9691-1725e1fdc067.jpg', 'Places'),
('a902ba68-42e2-4f0a-aeb9-23b7c3ddb58f', '2025-02-05 13:54:08', 'static/photogallery/photo-a902ba68-42e2-4f0a-aeb9-23b7c3ddb58f.webp', 'ForestClub'),
('a9f00c27-553b-40fd-bba3-218c8621d728', '2025-02-05 13:54:08', 'static/photogallery/photo-a9f00c27-553b-40fd-bba3-218c8621d728.webp', 'ForestClub'),
('ae734c1e-89c7-4604-b355-0e6a11b31612', '2025-02-05 13:54:08', 'static/photogallery/photo-ae734c1e-89c7-4604-b355-0e6a11b31612.webp', 'ForestClub'),
('b34f994d-bb99-4c1e-afe6-43d5c88b568f', '2025-02-05 13:54:08', 'static/photogallery/photo-b34f994d-bb99-4c1e-afe6-43d5c88b568f.webp', 'ForestClub'),
('b502783b-39b5-4b62-8397-e89acf1994b3', '2025-02-05 13:54:08', 'static/photogallery/photo-b502783b-39b5-4b62-8397-e89acf1994b3.jpg', 'Places'),
('b554e46c-1877-44a0-8398-4c26443e9507', '2025-02-05 13:54:08', 'static/photogallery/photo-b554e46c-1877-44a0-8398-4c26443e9507.jpg', 'Places'),
('b5582769-82ce-4d05-8d90-6d23e4d37b75', '2025-02-05 13:54:08', 'static/photogallery/photo-b5582769-82ce-4d05-8d90-6d23e4d37b75.jpg', 'AdaptationProgram'),
('baa39c92-5ff4-465c-ad5f-dc9484897534', '2025-02-05 13:54:08', 'static/photogallery/photo-baa39c92-5ff4-465c-ad5f-dc9484897534.webp', 'ForestClub'),
('bd76735d-37b6-46bb-a3bd-7b213f36caf7', '2025-02-05 13:54:08', 'static/photogallery/photo-bd76735d-37b6-46bb-a3bd-7b213f36caf7.jpg', 'AdaptationProgram'),
('bf5c8e8b-d436-42de-b887-dc0c5b33f65b', '2025-02-05 13:54:08', 'static/photogallery/photo-bf5c8e8b-d436-42de-b887-dc0c5b33f65b.jpg', 'AdaptationProgram'),
('c1383158-1e15-4efb-beae-01418bd9e91b', '2025-02-05 13:54:08', 'static/photogallery/photo-c1383158-1e15-4efb-beae-01418bd9e91b.webp', 'ForestClub'),
('c3f81002-24df-4052-8989-abdc1bb0fc2b', '2025-02-05 13:54:08', 'static/photogallery/photo-c3f81002-24df-4052-8989-abdc1bb0fc2b.webp', 'ForestClub'),
('c679444d-9a9b-45ec-a9ac-1e28d2285956', '2025-02-05 13:54:08', 'static/photogallery/photo-c679444d-9a9b-45ec-a9ac-1e28d2285956.jpg', 'AdaptationProgram'),
('c7468226-3ed2-4ed3-a710-4cf62521cdee', '2025-02-05 13:54:08', 'static/photogallery/photo-c7468226-3ed2-4ed3-a710-4cf62521cdee.jpg', 'AdaptationProgram'),
('c9a10b41-97dd-43ce-8434-56c666d1dd1c', '2025-02-05 13:54:08', 'static/photogallery/photo-c9a10b41-97dd-43ce-8434-56c666d1dd1c.webp', 'ForestClub'),
('cb52ef08-c542-49a3-ac4d-d2cac1f468bc', '2025-02-05 13:54:08', 'static/photogallery/photo-cb52ef08-c542-49a3-ac4d-d2cac1f468bc.webp', 'ForestClub'),
('d10ade68-38f6-493f-99b4-2d61f7786186', '2025-02-05 13:54:08', 'static/photogallery/photo-d10ade68-38f6-493f-99b4-2d61f7786186.jpg', 'AdaptationProgram'),
('d2d93a04-0639-4ce4-8bbc-a40db47d884a', '2025-02-05 13:54:08', 'static/photogallery/photo-d2d93a04-0639-4ce4-8bbc-a40db47d884a.webp', 'ForestClub'),
('d70363e7-4afe-4d1a-87fd-4ccda412ef36', '2025-02-05 13:54:08', 'static/photogallery/photo-d70363e7-4afe-4d1a-87fd-4ccda412ef36.jpg', 'AdaptationProgram'),
('e3eaecc7-0f67-42fb-8e5e-415e8aed8432', '2025-02-05 13:54:08', 'static/photogallery/photo-e3eaecc7-0f67-42fb-8e5e-415e8aed8432.jpg', 'Places'),
('e524d058-1bec-41a1-bd05-53e77462bc3a', '2025-02-05 13:54:08', 'static/photogallery/photo-e524d058-1bec-41a1-bd05-53e77462bc3a.webp', 'ForestClub'),
('fe29fe02-a99b-449c-b10a-e26ba37b29e8', '2025-02-05 13:54:08', 'static/photogallery/photo-fe29fe02-a99b-449c-b10a-e26ba37b29e8.jpg', 'Places');

-- --------------------------------------------------------

--
-- Table structure for table `Sponsor`
--

CREATE TABLE `Sponsor` (
  `id` varchar(255) NOT NULL,
  `name` varchar(512) DEFAULT NULL,
  `imagePath` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Sponsor`
--

INSERT INTO `Sponsor` (`id`, `name`, `imagePath`) VALUES
('cc632c35-5605-4753-b44c-24861456a385', 'Olomoucký kraj', 'static/sponsors/sponsor-cc632c35-5605-4753-b44c-24861456a385.webp'),
('e9dd0ce9-7ac8-4b35-a801-8709aec8c0e5', 'Statutární město Olomouc', 'static/sponsors/sponsor-e9dd0ce9-7ac8-4b35-a801-8709aec8c0e5.webp');

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(512) DEFAULT NULL,
  `fullName` varchar(512) DEFAULT NULL,
  `dateOfBirth` varchar(512) DEFAULT NULL,
  `imagePath` varchar(512) DEFAULT NULL,
  `description` longtext,
  `academicTitle` varchar(512) DEFAULT NULL,
  `phoneNumber` varchar(512) DEFAULT NULL,
  `resetPasswordToken` varchar(512) DEFAULT NULL,
  `dateOfLastResetPasswordRequest` varchar(512) DEFAULT NULL,
  `note` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `email`, `role`, `fullName`, `dateOfBirth`, `imagePath`, `description`, `academicTitle`, `phoneNumber`, `resetPasswordToken`, `dateOfLastResetPasswordRequest`, `note`) VALUES
('0b8d33ce-4a75-4062-8daf-6b4a26c06b94', 'teacher2@example.com', 'teacher', 'Hana Pacáčková', '1990-01-01', 'static/users/user-0b8d33ce-4a75-4062-8daf-6b4a26c06b94.jpeg', 'Školka je pro mě místem, kde mohu sdílet radost, tvořivost a inspiraci s dětmi. Baví mě jejich spontánnost, humor a nevyčerpatelná energie, která mi každý den dává nový smysl. Studuji průmyslový design na Technické univerzitě v Ostravě. Mám ráda umění, přírodu a cestování. Práce venku s dětmi mi přináší radost a možnost společně objevovat svět.', '', '111 111 111', '', '', 'test note'),
('1e6c5e87-eb8f-4200-8636-274b33d23648', 'upol.test@seznam.cz', 'admin', 'Test Admin', '1996-01-01', NULL, NULL, NULL, '111 111 111', NULL, NULL, ''),
('25402613-a527-4501-9472-b7268cdcc093', 'pojdteven.itpodpora@gmail.com', 'user', 'Jan Novák', '2003-01-01', NULL, NULL, NULL, '111 111 111', NULL, NULL, ''),
('623eef5a-fe43-4404-b370-5a0923eca4db', 'teacher3@example.com', 'teacher', 'Petr Novotný', '1990-01-01', 'static/users/user-623eef5a-fe43-4404-b370-5a0923eca4db.jpg', 'Vzděláním jsem elektroinženýr, kromě toho jsem horolezec, horský vandrák, vodák, kluk… Jsem vděčný a těším se, že si mohu hrát a ještě mít možnost předat něco ze zkušeností a svého pohledu na svět.', 'Ing.', '111 111 111', '', '', 'test note'),
('8ad5519b-e513-4245-ae4e-800a3aa62016', 'teacher1@example.com', 'teacher', 'Jana Kynclová', '1990-01-01', 'static/users/user-8ad5519b-e513-4245-ae4e-800a3aa62016.png', 'Pro své děti jsem si přála jednoduchost, svobodu, klid a přírodu. To vše jsem jim dopřála v lesní školce a teď to dál dopřávám sobě. Baví mě pozorovat přírodu a děti v ní, ukazovat jim a vysvětlovat, co v ní najdou a jak se v ní mohou citit doma.', 'Mgr.', '111 111 111', '', '', 'test note'),
('a4cecaa8-86c4-4ef7-a2a5-a91fe4502567', 'teacher5@example.com', 'teacher', 'Alexander Fridrich', '1990-01-01', 'static/users/user-a4cecaa8-86c4-4ef7-a2a5-a91fe4502567.jpeg', 'Průvodce.', '', '111 111 111', '', '', 'test note'),
('f28d90fe-4e02-442f-bf5f-ea87d2d1a186', 'pojdteven@gmail.com', 'admin', 'Hana Kovaříková', '1975-06-17', 'static/users/user-f28d90fe-4e02-442f-bf5f-ea87d2d1a186.jpg', 'Mojí pracovní náplní je řízení práce „kanceláře“, zajišťování financí a jejich kontrola. Propojuji a realizuji naše nápady  v sektoru dotací. Ráda ovocnařím, včelalařím, bylinkařím. Svět kolem nás je tak rozmanitý, že mě nepřestává udivovat.', 'Mgr.', '608 344 710', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `UserCredentials`
--

CREATE TABLE `UserCredentials` (
  `id` varchar(255) NOT NULL,
  `password` varchar(512) NOT NULL,
  `userId` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `UserCredentials`
--

INSERT INTO `UserCredentials` (`id`, `password`, `userId`) VALUES
('03504e82-3a09-431a-9d83-3bf3299465b6', '$2b$10$2ERVSeK4eq1pJ08CZSx5x.AYyh6fEOq4UgQwIl57DIoSm2.zzrYda', '1e6c5e87-eb8f-4200-8636-274b33d23648'),
('28cb303d-15b4-4604-a835-e3f6770e8f60', '$2b$10$io7LwNeD3kacF7Bh3oRnN.8tQ5uQosyuLJ4e0pW1a/iIOnt0CrrUm', '8ad5519b-e513-4245-ae4e-800a3aa62016'),
('6c50efec-4280-462e-a75b-adc7cba1f73b', '$2b$10$d1jflSkSeguEdf7xpxiHVOSpZouFmsVX11hBH.sd8CFTreCP.ERMa', '0b8d33ce-4a75-4062-8daf-6b4a26c06b94'),
('7cb0211b-1143-4f7e-896c-c6e67888145c', '$2b$10$3vu5/8YSFNLG2hfNWpsarOPzbxyL8uh7GGOLWMZXUJEJuKd1NlWOu', 'f28d90fe-4e02-442f-bf5f-ea87d2d1a186'),
('ce84e3aa-c70e-4fa1-afd5-b318aad8c442', '$2b$10$rsmpEBRd9N5goftqPF71u.1A9UsCwORePIZ6UIDicHApPR6hqUllu', '25402613-a527-4501-9472-b7268cdcc093'),
('e6f2c703-33af-437d-a06b-1a69c3d08ad0', '$2b$10$YonkgP6XVx0aCNyB1sIBbOGgWWiUPNYCxNXgNkzWcYCraBUEre2W6', '623eef5a-fe43-4404-b370-5a0923eca4db'),
('ebb87f3e-3b8f-423f-a9b7-bb25e1e0dbc6', '$2b$10$4dnjlxPtRE6W1Lnpv1VJv.1zpbm140.QxQVUy3lsEu776Rh1DAi9e', 'a4cecaa8-86c4-4ef7-a2a5-a91fe4502567');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Action`
--
ALTER TABLE `Action`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Address`
--
ALTER TABLE `Address`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Attendance`
--
ALTER TABLE `Attendance`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Child`
--
ALTER TABLE `Child`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `ContactInfo`
--
ALTER TABLE `ContactInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `DayActivity`
--
ALTER TABLE `DayActivity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `GeneralInfo`
--
ALTER TABLE `GeneralInfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Parenthood`
--
ALTER TABLE `Parenthood`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Photo`
--
ALTER TABLE `Photo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Sponsor`
--
ALTER TABLE `Sponsor`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `UserCredentials`
--
ALTER TABLE `UserCredentials`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Address`
--
ALTER TABLE `Address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `ContactInfo`
--
ALTER TABLE `ContactInfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `DayActivity`
--
ALTER TABLE `DayActivity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `GeneralInfo`
--
ALTER TABLE `GeneralInfo`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
