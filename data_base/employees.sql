-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 23, 2023 at 10:31 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employees_time_clock`
--

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `EmployeeID` int(11) NOT NULL,
  `ImageURL` varchar(255) DEFAULT NULL,
  `FirstName` varchar(50) DEFAULT NULL,
  `LastName` varchar(50) DEFAULT NULL,
  `IDNumber` varchar(20) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `PhoneNumber` varchar(15) DEFAULT NULL,
  `JobTitle` varchar(100) DEFAULT NULL,
  `StartDate` date DEFAULT NULL,
  `HourlySalary` decimal(10,2) DEFAULT NULL,
  `BankAccountDetails` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`EmployeeID`, `ImageURL`, `FirstName`, `LastName`, `IDNumber`, `Address`, `Email`, `PhoneNumber`, `JobTitle`, `StartDate`, `HourlySalary`, `BankAccountDetails`) VALUES
(21, '/photos/ציון_עמר.webp', 'ציון', 'עמר', '012345678', 'טבריה', 'zion0549774827@gmail.com', '0549774827', 'מנהל', '2023-10-15', 75.55, 'בנק: 12 סניף:123 חשבון:123456'),
(22, '/photos/חיים_כהן.webp', 'חיים', 'כהן', '123456789', 'חיפה', 'abc123@gmail.com', '050-1111111', 'נקיון', '2023-10-17', 35.00, 'בנק:לאומי. סניף:2. חשבון:111111'),
(23, '/photos/חנה_עמר.png', 'חנה', 'עמר', '098765432', 'טבריה', 'h111@gmail.com', '051-1234567', 'מנכלית', '2023-10-11', 75.00, 'בנק:פועלים. סניף:123. חשבון: 333333'),
(24, '/photos/רות_בוזגלו.webp', 'רות', 'בוזגלו', '112233445', 'מעלות', 'aaa111@gmail.com', '054-0909090', 'אחראית משמרת', '2023-10-18', 45.35, 'בנק: יהב. סניף:345. חשבון:555666');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`EmployeeID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employees`
--
ALTER TABLE `employees`
  MODIFY `EmployeeID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
