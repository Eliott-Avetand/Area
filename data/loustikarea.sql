-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: database:3306
-- Generation Time: Nov 10, 2022 at 08:11 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `loustikarea`
--

-- --------------------------------------------------------

--
-- Table structure for table `actions`
--

CREATE TABLE `actions` (
  `actionId` int NOT NULL,
  `reactionId` int NOT NULL,
  `userId` int NOT NULL,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `actions`
--

INSERT INTO `actions` (`actionId`, `reactionId`, `userId`, `id`) VALUES
(7, 12, 17, 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `firstname` varchar(256) NOT NULL,
  `lastname` varchar(256) NOT NULL,
  `email` varchar(256) NOT NULL,
  `password` varchar(256) NOT NULL,
  `actions` json DEFAULT NULL,
  `google` json DEFAULT NULL,
  `twitter` json DEFAULT NULL,
  `github` json DEFAULT NULL,
  `twitch` json DEFAULT NULL,
  `id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`firstname`, `lastname`, `email`, `password`, `actions`, `google`, `twitter`, `github`, `twitch`, `id`) VALUES
('Eliott', 'Avetand', 'soryoz03@gmail.com', '$2a$08$NHNRcvvb0JheOMvA5fMAReyf1jtF67aSdk9GPJ5ACfJIPngh5/XPK', NULL, '{\"token\": \"ya29.a0AeTM1ifLE995W_OsbC8KE7OvjpObP2n-lUYQt_3RXaZrO2-MmCoPrWDQdm3tjtpm-K5pBNwUwjsgoSpGbRokU-GtlL7wo1H007Zi2ZhDwuIgANAiihSbwekxVQChaVCBhOSsmvnnauaSEXSC4QMd0BvGbxWEaCgYKAYgSARMSFQHWtWOmvBBbgWw-2tG9lGbZhejI8A0163\", \"refreshToken\": \"1//03-GDoTI2rAltCgYIARAAGAMSNwF-L9IrdIlthhli4n3yCsd59HayXOVG7WSlu7IaVJkt5ZmmONihOcm_3heM2hCvx3ieZPO3twA\"}', NULL, '{\"token\": \"ghu_m6R3jpDAXxgn3QjfdhALIMZ6GINMwv0P4a0S\"}', '{\"id\": \"148560777\", \"name\": \"soryozz\", \"token\": \"sh7od9su6bmo5oob72p469xdc8wygk\"}', 17);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `actions`
--
ALTER TABLE `actions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
