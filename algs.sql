-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 12, 2024 at 05:27 PM
-- Server version: 8.0.24
-- PHP Version: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `algs`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `subcategory` varchar(100) DEFAULT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT '0',
  `author_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_draft` tinyint NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `title`, `file_name`, `category`, `subcategory`, `is_approved`, `author_id`, `created_at`, `is_draft`) VALUES
(21, 'Быстрая сортировка', '356a4255-2a94-466f-9e26-23e42ed296dd', 'Алгоритмы и структуры данных', 'Сортировки', 0, 1, '2024-05-11 20:58:38', 1),
(22, 'Автоматическое тестирование программного обеспечения', '8136279f-9fa9-4e8f-a0a9-a2ddfc08cd3f', 'Разработка программного обеспечения', 'Тестирование программного обеспечения', 1, 1, '2024-05-11 21:03:50', 0),
(23, 'Введение в нейронные сети', 'b74cd744-7823-4423-bef4-8f72968ad9de', 'Искусственный интеллект', 'Машинное обучение', 1, 1, '2024-05-11 21:07:10', 0),
(24, 'Docker: Основные концепции и преимущества использования', '4b3c5ae3-7150-43bc-8be1-b3e01387118d', 'Информационные технологии', 'Виртуализация и контейнеризация', 1, 1, '2024-05-11 21:08:32', 0),
(25, 'Принципы функционального программирования', '4ccff947-3332-4273-afc7-293da0bd699e', 'Программирование', 'Функциональное программирование', 1, 1, '2024-05-11 21:09:46', 0),
(26, 'Введение в алгоритмы поиска', 'a2bb56f7-ef5e-42c6-9ec7-7aa944e5a8a5', 'Алгоритмы и структуры данных', 'Поиск и сортировка', 1, 1, '2024-05-11 21:10:38', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `hash_password` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('admin','user','moderator') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `hash_password`, `role`) VALUES
(1, 'admin', '$2a$07$mTgGhpfE8Gtl/ZlSW2DYJeA2ue28fJ0UPmXfeifMLTxLxUw9H84mm', 'admin'),
(2, 'admin1', '$2a$07$LZNyClGAdIbETiC1m62cMeBXF76v4QmMoQZfTnLW0dXLtFxO7lTvS', 'user'),
(3, 'admin2', '$2a$07$yQttfoY.T0yuwbzgH5Q1QenbaRLctyURKoZZGCTyVh1XO8lkxYmne', 'moderator'),
(4, 'admin3', '$2a$07$5qujGZ5jU8JrvLssRhhFCOR6atXVDS/223M8VYdPusYgXf/ysK3Hi', 'user'),
(5, 'admin4', '$2a$07$UQAKKkXMYyAJ2sMC2PYJvO3TEWYbYz3JkOs.c8XPf9emZj6OBzc5a', 'moderator'),
(6, 'aoa', '$2a$07$axV7aURYQINW3Wap7nlAb.rCgyH.I/9Dmctpm.t6LYOeQXnyx0c2G', 'user'),
(7, 'Модератор', '$2a$07$mffDaFSOkcw4LF4WzZwIDueus7WxaIMLpWkNGkwjlR1MZ83evU5yW', 'moderator');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
