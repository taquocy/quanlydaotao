-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 03, 2023 at 03:48 AM
-- Server version: 8.1.0
-- PHP Version: 7.4.3-4ubuntu2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlydaotao`
--

-- --------------------------------------------------------

--
-- Table structure for table `ChuongTrinhDaoTao`
--

CREATE TABLE `ChuongTrinhDaoTao` (
  `ID` int NOT NULL,
  `TenChuongTrinh` varchar(255) NOT NULL,
  `NamHoc` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ChuongTrinhDaoTao`
--

INSERT INTO `ChuongTrinhDaoTao` (`ID`, `TenChuongTrinh`, `NamHoc`) VALUES
(1, 'Chương trình Kỹ thuật máy tính', 2022),
(2, 'Chương trình Kỹ thuật máy tính', 2023),
(3, 'Chương trình Kỹ thuật máy tính', 2024);

-- --------------------------------------------------------

--
-- Table structure for table `HocPhan`
--

CREATE TABLE `HocPhan` (
  `ID` int NOT NULL,
  `MaHocPhan` varchar(50) NOT NULL,
  `TenHocPhan` varchar(255) NOT NULL,
  `SoTinChi` int NOT NULL,
  `ModuleID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `HocPhan`
--

INSERT INTO `HocPhan` (`ID`, `MaHocPhan`, `TenHocPhan`, `SoTinChi`, `ModuleID`) VALUES
(1, 'HP001', 'Học phần 1', 3, 2),
(2, 'HP002', 'Học phần 2', 4, NULL),
(3, 'HP003', 'Học phần 3', 3, 1),
(4, 'HP004', 'Học phần 4', 3, NULL),
(5, 'HP005', 'Học phần 5', 4, 2),
(6, 'HP006', 'Học phần 6', 3, NULL),
(7, 'HP007', 'Học phần 7', 4, 3),
(8, 'HP008', 'Học phần 8', 3, 4);

-- --------------------------------------------------------

--
-- Table structure for table `Module`
--

CREATE TABLE `Module` (
  `ID` int NOT NULL,
  `TenModule` varchar(255) DEFAULT NULL,
  `ModuleChaID` int DEFAULT NULL,
  `idPhanDaoTao` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Module`
--

INSERT INTO `Module` (`ID`, `TenModule`, `ModuleChaID`, `idPhanDaoTao`) VALUES
(1, 'Module Cơ sở ngành', NULL, 1),
(2, 'Module lập trình web', 1, 2),
(3, 'Module lập trình di động', 1, 2),
(4, 'Module lập trình web 1', 2, 2),
(5, 'Module lập trình web 2', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `PhanDaoTao`
--

CREATE TABLE `PhanDaoTao` (
  `ID` int NOT NULL,
  `TenPhan` varchar(255) NOT NULL,
  `ChuongTrinhDaoTaoID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PhanDaoTao`
--

INSERT INTO `PhanDaoTao` (`ID`, `TenPhan`, `ChuongTrinhDaoTaoID`) VALUES
(1, 'Giáo dục đại cương', 1),
(2, 'Giáo dục chuyên nghiệp', 1),
(3, 'Khóa luận tốt nghiệp', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ChuongTrinhDaoTao`
--
ALTER TABLE `ChuongTrinhDaoTao`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `HocPhan`
--
ALTER TABLE `HocPhan`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ModuleID` (`ModuleID`);

--
-- Indexes for table `Module`
--
ALTER TABLE `Module`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ModuleChaID` (`ModuleChaID`);

--
-- Indexes for table `PhanDaoTao`
--
ALTER TABLE `PhanDaoTao`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `ChuongTrinhDaoTaoID` (`ChuongTrinhDaoTaoID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ChuongTrinhDaoTao`
--
ALTER TABLE `ChuongTrinhDaoTao`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `HocPhan`
--
ALTER TABLE `HocPhan`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Module`
--
ALTER TABLE `Module`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `PhanDaoTao`
--
ALTER TABLE `PhanDaoTao`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `HocPhan`
--
ALTER TABLE `HocPhan`
  ADD CONSTRAINT `HocPhan_ibfk_1` FOREIGN KEY (`ModuleID`) REFERENCES `Module` (`ID`);

--
-- Constraints for table `Module`
--
ALTER TABLE `Module`
  ADD CONSTRAINT `Module_ibfk_1` FOREIGN KEY (`ModuleChaID`) REFERENCES `Module` (`ID`);

--
-- Constraints for table `PhanDaoTao`
--
ALTER TABLE `PhanDaoTao`
  ADD CONSTRAINT `PhanDaoTao_ibfk_1` FOREIGN KEY (`ChuongTrinhDaoTaoID`) REFERENCES `ChuongTrinhDaoTao` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
