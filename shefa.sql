-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: נובמבר 02, 2021 בזמן 02:39 PM
-- גרסת שרת: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `shefa`
--

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `carts`
--

CREATE TABLE `carts` (
  `CartID` int(11) NOT NULL,
  `UserUUID` char(36) CHARACTER SET utf8 NOT NULL,
  `Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `carts`
--

INSERT INTO `carts` (`CartID`, `UserUUID`, `Date`) VALUES
(281, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', '2021-10-21'),
(334, 'bf7e6a2a-d579-4c0c-9bab-575bd444f1f5', '2021-10-25'),
(335, 'bf7e6a2a-d579-4c0c-9bab-575bd444f1f5', '2021-10-25'),
(337, 'bf7e6a2a-d579-4c0c-9bab-575bd444f1f5', '2021-10-25'),
(338, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', '2021-10-26');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `categories`
--

CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(15) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `categories`
--

INSERT INTO `categories` (`CategoryID`, `CategoryName`) VALUES
(1, 'Beverages'),
(2, 'Condiments'),
(3, 'Confections'),
(4, 'Dairy Products'),
(5, 'Grains/Cereals'),
(6, 'Meat/Poultry'),
(7, 'Produce'),
(8, 'Seafood');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `cities`
--

CREATE TABLE `cities` (
  `city` varchar(23) CHARACTER SET utf8 NOT NULL,
  `lat` decimal(7,4) NOT NULL,
  `lng` decimal(7,4) NOT NULL,
  `country` varchar(6) CHARACTER SET utf8 NOT NULL,
  `iso2` varchar(2) CHARACTER SET utf8 NOT NULL,
  `admin_name` varchar(9) CHARACTER SET utf8 NOT NULL,
  `capital` varchar(7) CHARACTER SET utf8 DEFAULT NULL,
  `population` int(11) DEFAULT NULL,
  `population_proper` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- הוצאת מידע עבור טבלה `cities`
--

INSERT INTO `cities` (`city`, `lat`, `lng`, `country`, `iso2`, `admin_name`, `capital`, `population`, `population_proper`) VALUES
('Afula', '32.6078', '35.2897', 'Israel', 'IL', 'Northern', NULL, 44930, 44930),
('Al Buţayḩah', '32.9087', '35.6320', 'Israel', 'IL', 'Northern', 'minor', NULL, NULL),
('Al Khushnīyah', '32.9994', '35.8108', 'Israel', 'IL', 'Northern', 'minor', NULL, NULL),
('Ashdod', '31.7978', '34.6503', 'Israel', 'IL', 'Southern', NULL, 220174, 220174),
('Ashqelon', '31.6658', '34.5664', 'Israel', 'IL', 'Southern', NULL, 134454, 134454),
('Bat Yam', '32.0231', '34.7503', 'Israel', 'IL', 'Tel Aviv', NULL, 128800, 128800),
('Beersheba', '31.2589', '34.7978', 'Israel', 'IL', 'Southern', 'admin', 209000, 209000),
('Bené Beraq', '32.0807', '34.8338', 'Israel', 'IL', 'Tel Aviv', NULL, 193774, 193774),
('Bet Shemesh', '31.7514', '34.9886', 'Israel', 'IL', 'Jerusalem', NULL, 114371, 114371),
('Dimona', '31.0700', '35.0300', 'Israel', 'IL', 'Southern', NULL, 34135, 34135),
('Eilat', '29.5500', '34.9500', 'Israel', 'IL', 'Southern', NULL, 51935, 51935),
('El‘ad', '32.0523', '34.9512', 'Israel', 'IL', 'Central', NULL, 46896, 46896),
('Eṭ Ṭaiyiba', '32.2667', '35.0000', 'Israel', 'IL', 'Central', NULL, 43100, 43100),
('Fīq', '32.7793', '35.7003', 'Israel', 'IL', 'Northern', 'minor', NULL, NULL),
('Givatayim', '32.0697', '34.8117', 'Israel', 'IL', 'Tel Aviv', NULL, 59518, 59518),
('Hadera', '32.4500', '34.9167', 'Israel', 'IL', 'Haifa', NULL, 91707, 91707),
('Haifa', '32.8000', '34.9833', 'Israel', 'IL', 'Haifa', 'admin', 281087, 281087),
('Herẕliyya', '32.1556', '34.8422', 'Israel', 'IL', 'Tel Aviv', NULL, 93989, 93989),
('Hod HaSharon', '32.1500', '34.8833', 'Israel', 'IL', 'Central', NULL, 56659, 56659),
('Holon', '32.0167', '34.7667', 'Israel', 'IL', 'Tel Aviv', NULL, 188834, 188834),
('Jerusalem', '31.7833', '35.2167', 'Israel', 'IL', 'Southern', 'primary', 919438, 919438),
('Karmiel', '32.9000', '35.2833', 'Israel', 'IL', 'Northern', NULL, 45300, 45300),
('Kefar Sava', '32.1858', '34.9077', 'Israel', 'IL', 'Central', NULL, 100800, 100800),
('Lod', '31.9500', '34.9000', 'Israel', 'IL', 'Central', NULL, 75700, 75700),
('Ma‘alot Tarshīḥā', '33.0167', '35.2708', 'Israel', 'IL', 'Northern', NULL, 36000, 36000),
('Modi‘in Makkabbim Re‘ut', '31.9339', '34.9856', 'Israel', 'IL', 'Central', NULL, 90013, 90013),
('Nahariyya', '33.0036', '35.0925', 'Israel', 'IL', 'Northern', NULL, 60000, 60000),
('Nazareth', '32.7021', '35.2978', 'Israel', 'IL', 'Northern', 'admin', 83400, 83400),
('Nes Ẕiyyona', '31.9333', '34.8000', 'Israel', 'IL', 'Central', NULL, 50200, 50200),
('Netanya', '32.3328', '34.8600', 'Israel', 'IL', 'Central', NULL, 217244, 217244),
('Netivot', '31.4167', '34.5833', 'Israel', 'IL', 'Southern', NULL, 31314, 31314),
('Or Yehuda', '32.0333', '34.8500', 'Israel', 'IL', 'Tel Aviv', NULL, 36706, 36706),
('Petah Tiqwa', '32.0833', '34.8833', 'Israel', 'IL', 'Central', NULL, 236169, 236169),
('Qiryat Ata', '32.8000', '35.1000', 'Israel', 'IL', 'Haifa', NULL, 55464, 55464),
('Qiryat Bialik', '32.8331', '35.0664', 'Israel', 'IL', 'Haifa', NULL, 39900, 39900),
('Qiryat Gat', '31.6061', '34.7717', 'Israel', 'IL', 'Southern', NULL, 55000, 55000),
('Qiryat Moẕqin', '32.8381', '35.0794', 'Israel', 'IL', 'Haifa', NULL, 40160, 40160),
('Qiryat Ono', '32.0636', '34.8553', 'Israel', 'IL', 'Tel Aviv', NULL, 37791, 37791),
('Qiryat Yam', '32.8331', '35.0664', 'Israel', 'IL', 'Haifa', NULL, 40700, 40700),
('Rahat', '31.3925', '34.7544', 'Israel', 'IL', 'Southern', NULL, 64462, 64462),
('Ramat Gan', '32.0700', '34.8235', 'Israel', 'IL', 'Tel Aviv', NULL, 152596, 152596),
('Ramat HaSharon', '32.1461', '34.8394', 'Israel', 'IL', 'Tel Aviv', NULL, 46700, 46700),
('Ramla', '31.9318', '34.8736', 'Israel', 'IL', 'Central', 'admin', 75500, 75500),
('Ra‘ananna', '32.1833', '34.8667', 'Israel', 'IL', 'Central', NULL, 74000, 74000),
('Reẖovot', '31.8914', '34.8078', 'Israel', 'IL', 'Central', NULL, 132671, 132671),
('Rishon LeZiyyon', '31.9500', '34.8000', 'Israel', 'IL', 'Central', NULL, 249860, 249860),
('Rosh Ha‘Ayin', '32.0833', '34.9500', 'Israel', 'IL', 'Central', NULL, 56300, 56300),
('Sakhnīn', '32.8667', '35.3000', 'Israel', 'IL', 'Northern', NULL, 31100, 31100),
('Tamra', '32.8511', '35.2071', 'Israel', 'IL', 'Northern', NULL, 34000, 34000),
('Tel Aviv-Yafo', '32.0800', '34.7800', 'Israel', 'IL', 'Tel Aviv', 'admin', 451523, 451523),
('Tiberias', '32.7897', '35.5247', 'Israel', 'IL', 'Northern', NULL, 44200, 44200),
('Umm el Faḥm', '32.5158', '35.1525', 'Israel', 'IL', 'Haifa', NULL, 55300, 55300),
('Yehud', '32.0333', '34.8833', 'Israel', 'IL', 'Central', NULL, 29146, 29146),
('Ẕefat', '32.9658', '35.4983', 'Israel', 'IL', 'Northern', NULL, 35700, 35700),
('‘Akko', '32.9261', '35.0839', 'Israel', 'IL', 'Northern', NULL, 47675, 47675);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `items`
--

CREATE TABLE `items` (
  `ItemID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `TotalPrice` int(11) NOT NULL,
  `CartID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `items`
--

INSERT INTO `items` (`ItemID`, `ProductID`, `Quantity`, `TotalPrice`, `CartID`) VALUES
(664, 2, 1, 19, 281),
(764, 2, 1, 19, 337),
(766, 3, 1, 10, 281),
(771, 8, 1, 40, 338),
(775, 4, 1, 22, 338),
(776, 7, 1, 30, 338),
(778, 4, 1, 22, 338),
(779, 2, 1, 19, 338);

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `UserUUID` varchar(36) CHARACTER SET utf8 NOT NULL,
  `CartID` int(11) NOT NULL,
  `TotalPrice` int(11) NOT NULL,
  `City` varchar(30) CHARACTER SET utf8 NOT NULL,
  `Street` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Delivery` date NOT NULL,
  `Date` date NOT NULL,
  `CreditCard` varchar(4) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `orders`
--

INSERT INTO `orders` (`OrderID`, `UserUUID`, `CartID`, `TotalPrice`, `City`, `Street`, `Delivery`, `Date`, `CreditCard`) VALUES
(135, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 281, 19, 'Beersheba', 'Oren 23/2', '2021-10-22', '2021-10-21', '5555'),
(136, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 282, 37, 'Haifa', '4580', '2021-10-21', '2021-10-21', '9789'),
(137, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 283, 19, 'Beersheba', '4580', '2021-10-21', '2021-10-21', '9789'),
(138, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 284, 19, 'Bené Beraq', '10/26/2021', '2021-10-21', '2021-10-21', '0778'),
(139, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 285, 10, 'Ashdod', 'Oren 23/2', '2021-10-22', '2021-10-21', '0889'),
(140, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 330, 25, 'Beersheba', 'Oren 23/2', '2021-10-24', '2021-10-24', '5555'),
(141, 'bf7e6a2a-d579-4c0c-9bab-575bd444f1f5', 337, 19, 'Beersheba', 'whatever', '2021-10-26', '2021-10-25', '8888'),
(142, '49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 281, 19, 'Ashdod', 'Oren 23/2', '2021-10-28', '2021-10-26', '5555');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(40) CHARACTER SET utf8 NOT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `UnitPrice` decimal(19,4) DEFAULT 0.0000
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- הוצאת מידע עבור טבלה `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `CategoryID`, `UnitPrice`) VALUES
(1, 'Chai', 1, '18.0000'),
(2, 'Chang', 1, '19.0000'),
(3, 'Aniseed Syrup', 2, '10.0000'),
(4, 'Chef Anton\'s Cajun Seasoning', 2, '22.0000'),
(5, 'Chef Anton\'s Gumbo Mix', 2, '21.3500'),
(6, 'Grandma\'s Boysenberry Spread', 2, '25.0000'),
(7, 'Uncle Bob\'s Organic Dried Pears', 7, '30.0000'),
(8, 'Northwoods Cranberry Sauce', 2, '40.0000'),
(9, 'Mishi Kobe Niku', 6, '97.0000'),
(10, 'Ikura', 8, '31.0000'),
(11, 'Queso Cabrales', 4, '21.0000'),
(12, 'Queso Manchego La Pastora', 4, '38.0000'),
(13, 'Konbu', 8, '6.0000'),
(14, 'Tofu', 7, '23.2500'),
(15, 'Genen Shouyu', 2, '15.5000'),
(16, 'Pavlova', 3, '17.4500'),
(17, 'Alice Mutton', 6, '39.0000'),
(18, 'Carnarvon Tigers', 8, '62.5000'),
(19, 'Teatime Chocolate Biscuits', 3, '9.2000'),
(20, 'Sir Rodney\'s Marmalade', 3, '81.0000'),
(21, 'Sir Rodney\'s Scones', 3, '10.0000'),
(22, 'Gustaf\'s Knäckebröd', 5, '21.0000'),
(23, 'Tunnbröd', 5, '9.0000'),
(24, 'Guaraná Fantástica', 1, '4.5000'),
(25, 'NuNuCa Nuß-Nougat-Creme', 3, '14.0000'),
(26, 'Gumbär Gummibärchen', 3, '31.2300'),
(27, 'Schoggi Schokolade', 3, '43.9000'),
(28, 'Rössle Sauerkraut', 7, '45.6000'),
(29, 'Thüringer Rostbratwurst', 6, '123.7900'),
(30, 'Nord-Ost Matjeshering', 8, '25.8900'),
(31, 'Gorgonzola Telino', 4, '12.5000'),
(32, 'Mascarpone Fabioli', 4, '32.0000'),
(33, 'Geitost', 4, '2.5000'),
(34, 'Sasquatch Ale', 1, '14.0000'),
(35, 'Steeleye Stout', 1, '18.0000'),
(36, 'Inlagd Sill', 8, '19.0000'),
(37, 'Gravad lax', 8, '26.0000'),
(38, 'Côte de Blaye', 1, '263.5000'),
(39, 'Chartreuse verte', 1, '18.0000'),
(40, 'Boston Crab Meat', 8, '18.4000'),
(41, 'Jack\'s New England Clam Chowder', 8, '9.6500'),
(42, 'Singaporean Hokkien Fried Mee', 5, '14.0000'),
(43, 'Ipoh Coffee', 1, '46.0000'),
(44, 'Gula Malacca', 2, '19.4500'),
(45, 'Rogede sild', 8, '9.5000'),
(46, 'Spegesild', 8, '12.0000'),
(47, 'Zaanse koeken', 3, '9.5000'),
(48, 'Chocolade', 3, '12.7500'),
(49, 'Maxilaku', 3, '20.0000'),
(50, 'Valkoinen suklaa', 3, '16.2500'),
(51, 'Manjimup Dried Apples', 7, '53.0000'),
(52, 'Filo Mix', 5, '7.0000'),
(53, 'Perth Pasties', 6, '32.8000'),
(54, 'Tourtière', 6, '7.4500'),
(55, 'Pâté chinois', 6, '24.0000'),
(56, 'Gnocchi di nonna Alice', 5, '38.0000'),
(57, 'Ravioli Angelo', 5, '19.5000'),
(58, 'Escargots de Bourgogne', 8, '13.2500'),
(59, 'Raclette Courdavault', 4, '55.0000'),
(60, 'Camembert Pierrot', 4, '34.0000'),
(61, 'Sirop d\'érable', 2, '28.5000'),
(62, 'Tarte au sucre', 3, '49.3000'),
(63, 'Vegie-spread', 2, '43.9000'),
(64, 'Wimmers gute Semmelknödel', 5, '33.2500'),
(65, 'Louisiana Fiery Hot Pepper Sauce', 2, '21.0500'),
(66, 'Louisiana Hot Spiced Okra', 2, '17.0000'),
(67, 'Laughing Lumberjack Lager', 1, '14.0000'),
(68, 'Scottish Longbreads', 3, '12.5000'),
(69, 'Gudbrandsdalsost', 4, '36.0000'),
(70, 'Outback Lager', 1, '15.0000'),
(71, 'Flotemysost', 4, '21.5000'),
(72, 'Mozzarella di Giovanni', 4, '34.8000'),
(73, 'Röd Kaviar', 8, '15.0000'),
(74, 'Longlife Tofu', 7, '10.0000'),
(75, 'Rhönbräu Klosterbier', 1, '7.7500'),
(76, 'Lakkalikööri', 1, '18.0000'),
(77, 'Original Frankfurter grüne Soße', 2, '13.0000'),
(81, 'DOGGO4', 2, '4.0000'),
(85, 'TEST4', 1, '3.0000');

-- --------------------------------------------------------

--
-- מבנה טבלה עבור טבלה `users`
--

CREATE TABLE `users` (
  `uuid` char(36) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `password` varchar(128) NOT NULL,
  `idcard` varchar(9) NOT NULL,
  `city` varchar(100) NOT NULL,
  `street` varchar(200) NOT NULL,
  `email` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- הוצאת מידע עבור טבלה `users`
--

INSERT INTO `users` (`uuid`, `firstName`, `lastName`, `password`, `idcard`, `city`, `street`, `email`, `isAdmin`) VALUES
('26fa9d0b-06fb-425c-b2b1-161340a4f080', 'Ploni', 'Almoni', 'd90a495c7e2b00ad1e009a6471de4cbcdefa121c5bd454faa5803de0995dc2db3c0f0eb01a6f679eda0ab87e0ea24bfe67a0f22c1e8c6faf8e2e41f0831dd3ea', '123456789', 'Tel-Aviv', 'Lewinsky', 'ploni@gmail.com', 0),
('49c7ba65-6f8f-4a73-80b3-d3d7415f1fbf', 'YOAV', 'LIFSHITZ', '8d4411584b81eb428a796fdac0c74177f12abb2d4b2213558e3b1ecc2349da73998061fec547dbdee13ad8b70f2cce51f883e71cd08fb2ff143b12b63116d2bd', '043051069', 'Haifa', 'Oren 23/2', 'yoav.lip@gmail.com', 0),
('5f3a28aa-2bf5-4ae0-a76c-a8caa58dcec7', 'Moishe', 'Ufnik', 'dd6ff49baeb6802c954201a4216f690810451a9991247ebe7fd62556bc68218071c7e27de059fecde889215a9a5c17f30d8c87f03c339818fbaa61ca18cd756b', '', '', '', '', 1),
('8ec99f2d-2dfb-4cc4-9a6c-1d2ece72d562', 'Ploni', 'Almoni', 'd90a495c7e2b00ad1e009a6471de4cbcdefa121c5bd454faa5803de0995dc2db3c0f0eb01a6f679eda0ab87e0ea24bfe67a0f22c1e8c6faf8e2e41f0831dd3ea', '123456789', 'Tel-Aviv', 'Lewinsky', 'ploni@gmail.com', 0),
('bf7e6a2a-d579-4c0c-9bab-575bd444f1f5', 'Tomer', 'Sagi', '8d4411584b81eb428a796fdac0c74177f12abb2d4b2213558e3b1ecc2349da73998061fec547dbdee13ad8b70f2cce51f883e71cd08fb2ff143b12b63116d2bd', '333333333', 'Haifa', 'whatever', 'me@tomersagi.com', 0);

--
-- Indexes for dumped tables
--

--
-- אינדקסים לטבלה `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`CartID`);

--
-- אינדקסים לטבלה `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryID`);

--
-- אינדקסים לטבלה `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`city`);

--
-- אינדקסים לטבלה `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`ItemID`),
  ADD KEY `FK_cart` (`CartID`),
  ADD KEY `FK_product` (`ProductID`);

--
-- אינדקסים לטבלה `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `FK_user` (`UserUUID`);

--
-- אינדקסים לטבלה `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `FK_category` (`CategoryID`);

--
-- אינדקסים לטבלה `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `carts`
--
ALTER TABLE `carts`
  MODIFY `CartID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=339;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `ItemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=780;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- הגבלות לטבלאות שהוצאו
--

--
-- הגבלות לטבלה `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `FK_cart` FOREIGN KEY (`CartID`) REFERENCES `carts` (`CartID`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_product` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- הגבלות לטבלה `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_user` FOREIGN KEY (`UserUUID`) REFERENCES `users` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- הגבלות לטבלה `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_category` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
