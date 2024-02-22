-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               11.0.3-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for f8_project_final
CREATE DATABASE IF NOT EXISTS `f8_project_final` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `f8_project_final`;

-- Dumping structure for table f8_project_final.answers
CREATE TABLE IF NOT EXISTS `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `teacherId` int(11) DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `questionId` (`questionId`),
  KEY `teacherId` (`teacherId`),
  CONSTRAINT `answers_ibfk_1` FOREIGN KEY (`questionId`) REFERENCES `questions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `answers_ibfk_2` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.answers: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.classes
CREATE TABLE IF NOT EXISTS `classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `startDate` date DEFAULT NULL,
  `endDate` date DEFAULT NULL,
  `timeLearn` varchar(50) DEFAULT NULL,
  `teacherId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  KEY `teacherId` (`teacherId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `classes_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.classes: ~3 rows (approximately)
INSERT INTO `classes` (`id`, `name`, `quantity`, `startDate`, `endDate`, `timeLearn`, `teacherId`, `courseId`, `createdAt`, `updatedAt`) VALUES
	(1, 'Back-end K1', 16, '2024-02-22', '2024-06-05', '20:00-22:00', 2, 1, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(2, 'Front-end K1', 16, '2024-02-22', '2024-05-24', '07:00-09:00', 2, 2, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(3, 'Fullstack K1', 16, '2024-02-22', '2024-04-20', '14:00-16:00', 2, 3, '2024-02-22 06:13:59', '2024-02-22 06:13:59');

-- Dumping structure for table f8_project_final.classes_schedule
CREATE TABLE IF NOT EXISTS `classes_schedule` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `schedule` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `classes_schedule_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.classes_schedule: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.classes_teachers
CREATE TABLE IF NOT EXISTS `classes_teachers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `classes_teachers_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `classes_teachers_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.classes_teachers: ~3 rows (approximately)
INSERT INTO `classes_teachers` (`id`, `teacherId`, `classId`, `createdAt`, `updatedAt`) VALUES
	(1, 2, 1, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(2, 2, 2, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(3, 2, 3, '2024-02-22 06:13:59', '2024-02-22 06:13:59');

-- Dumping structure for table f8_project_final.comments
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  KEY `userId` (`userId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.comments: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.courses
CREATE TABLE IF NOT EXISTS `courses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `price` int(11) DEFAULT 0,
  `tryLearn` tinyint(1) DEFAULT 0,
  `duration` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.courses: ~3 rows (approximately)
INSERT INTO `courses` (`id`, `name`, `price`, `tryLearn`, `duration`, `createdAt`, `updatedAt`) VALUES
	(1, 'Lập trình cơ bản với Javascript', 2000000, 3, 32, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(2, 'Lập trình nâng cao với Javascript', 3000000, 2, 24, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(3, 'Lập trình cơ bản với HTML/CSS', 1000000, 1, 40, '2024-02-22 06:13:59', '2024-02-22 06:13:59');

-- Dumping structure for table f8_project_final.course_modules
CREATE TABLE IF NOT EXISTS `course_modules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `course_modules_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.course_modules: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.exercises
CREATE TABLE IF NOT EXISTS `exercises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `classId` int(11) DEFAULT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `classId` (`classId`),
  CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.exercises: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.exercises_submit
CREATE TABLE IF NOT EXISTS `exercises_submit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `exercisesId` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `exercisesId` (`exercisesId`),
  KEY `studentId` (`studentId`),
  CONSTRAINT `exercises_submit_ibfk_1` FOREIGN KEY (`exercisesId`) REFERENCES `exercises` (`id`) ON DELETE CASCADE,
  CONSTRAINT `exercises_submit_ibfk_2` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.exercises_submit: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.learning_status
CREATE TABLE IF NOT EXISTS `learning_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.learning_status: ~4 rows (approximately)
INSERT INTO `learning_status` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Đang học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(2, 'Bảo lưu', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(3, 'Thôi học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(4, 'Hoàn thành', '2024-02-22 06:14:00', '2024-02-22 06:14:00');

-- Dumping structure for table f8_project_final.login_tokens
CREATE TABLE IF NOT EXISTS `login_tokens` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `login_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.login_tokens: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.module_document
CREATE TABLE IF NOT EXISTS `module_document` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT NULL,
  `pathName` varchar(200) DEFAULT NULL,
  `moduleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `moduleId` (`moduleId`),
  CONSTRAINT `module_document_ibfk_1` FOREIGN KEY (`moduleId`) REFERENCES `course_modules` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.module_document: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `value` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.permissions: ~21 rows (approximately)
INSERT INTO `permissions` (`id`, `value`, `createdAt`, `updatedAt`) VALUES
	(1, 'Phân quyền', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(2, 'Thêm người dùng', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(3, 'Sửa người dùng', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(4, 'Xóa người dùng', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(5, 'Xem người dùng', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(6, 'Thêm học viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(7, 'Sửa học viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(8, 'Xóa học viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(9, 'Xem học viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(10, 'Thêm giảng viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(11, 'Sửa giảng viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(12, 'Xóa giảng viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(13, 'Xem giảng viên', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(14, 'Thêm khóa học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(15, 'Sửa khóa học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(16, 'Xóa khóa học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(17, 'Xem khóa học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(18, 'Thêm lớp học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(19, 'Sửa lớp học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(20, 'Xóa lớp học', '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(21, 'Xem lớp học', '2024-02-22 06:14:00', '2024-02-22 06:14:00');

-- Dumping structure for table f8_project_final.questions
CREATE TABLE IF NOT EXISTS `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` text DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `attachment` varchar(200) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  CONSTRAINT `questions_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `questions_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.questions: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.roles: ~1 rows (approximately)
INSERT INTO `roles` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Super Admin', '2024-02-22 06:14:00', '2024-02-22 06:14:00');

-- Dumping structure for table f8_project_final.role_permission
CREATE TABLE IF NOT EXISTS `role_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `role_permission_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_permission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.role_permission: ~21 rows (approximately)
INSERT INTO `role_permission` (`id`, `roleId`, `permissionId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(2, 1, 2, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(3, 1, 3, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(4, 1, 4, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(5, 1, 5, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(6, 1, 6, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(7, 1, 7, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(8, 1, 8, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(9, 1, 9, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(10, 1, 10, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(11, 1, 11, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(12, 1, 12, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(13, 1, 13, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(14, 1, 14, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(15, 1, 15, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(16, 1, 16, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(17, 1, 17, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(18, 1, 18, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(19, 1, 19, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(20, 1, 20, '2024-02-22 06:14:00', '2024-02-22 06:14:00'),
	(21, 1, 21, '2024-02-22 06:14:00', '2024-02-22 06:14:00');

-- Dumping structure for table f8_project_final.sequelizemeta
CREATE TABLE IF NOT EXISTS `sequelizemeta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

-- Dumping data for table f8_project_final.sequelizemeta: ~28 rows (approximately)
INSERT INTO `sequelizemeta` (`name`) VALUES
	('20231122151111-create-type.js'),
	('20231122152650-create-user.js'),
	('20231122153559-create-login-tokens.js'),
	('20231122154125-create-user-social.js'),
	('20231122154418-create-role.js'),
	('20231122154522-create-permission.js'),
	('20231122154805-user_role.js'),
	('20231122155301-role_permission.js'),
	('20231122155446-user_permission.js'),
	('20231122155654-create-user-otp.js'),
	('20231122160027-create-course.js'),
	('20231122160410-create-course-module.js'),
	('20231122160648-create-module-document.js'),
	('20231122161001-create-class.js'),
	('20231122161312-classes_teachers.js'),
	('20231122161816-create-teacher-calendar.js'),
	('20231122161999-create-learning-status.js'),
	('20231122162025-create-student-class.js'),
	('20231122162322-create-student-attendance.js'),
	('20231122162529-create-setting.js'),
	('20231122162748-create-exercise.js'),
	('20231122163201-create-excercise-submit.js'),
	('20231122163406-create-comment.js'),
	('20231122163557-create-user-column.js'),
	('20231205145658-create-token-forgot-pass.js'),
	('20231226081526-create-class-schedule.js'),
	('20240207093527-create-question.js'),
	('20240209093934-create-answer.js');

-- Dumping structure for table f8_project_final.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `optKey` varchar(200) DEFAULT NULL,
  `optValue` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.settings: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.students_attendance
CREATE TABLE IF NOT EXISTS `students_attendance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateLearning` datetime DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  CONSTRAINT `students_attendance_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students_attendance_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.students_attendance: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.students_classes
CREATE TABLE IF NOT EXISTS `students_classes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `studentId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `completed` date DEFAULT NULL,
  `dropDate` date DEFAULT NULL,
  `recover` date DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `classId` (`classId`),
  KEY `statusId` (`statusId`),
  CONSTRAINT `students_classes_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students_classes_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `students_classes_ibfk_3` FOREIGN KEY (`statusId`) REFERENCES `learning_status` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.students_classes: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.teacher_calendar
CREATE TABLE IF NOT EXISTS `teacher_calendar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `teacherId` int(11) DEFAULT NULL,
  `classId` int(11) DEFAULT NULL,
  `scheduleDate` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teacherId` (`teacherId`),
  KEY `classId` (`classId`),
  CONSTRAINT `teacher_calendar_ibfk_1` FOREIGN KEY (`teacherId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `teacher_calendar_ibfk_2` FOREIGN KEY (`classId`) REFERENCES `classes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.teacher_calendar: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.token_forgot_pass
CREATE TABLE IF NOT EXISTS `token_forgot_pass` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(30) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `expire` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `userId` (`userId`),
  CONSTRAINT `token_forgot_pass_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.token_forgot_pass: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.types
CREATE TABLE IF NOT EXISTS `types` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.types: ~4 rows (approximately)
INSERT INTO `types` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	(1, 'Admin', '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(2, 'Teacher', '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(3, 'Student', '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(4, 'Tutor', '2024-02-22 06:13:59', '2024-02-22 06:13:59');

-- Dumping structure for table f8_project_final.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `typeId` int(11) DEFAULT NULL,
  `firstLogin` tinyint(1) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `typeId` (`typeId`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `types` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.users: ~4 rows (approximately)
INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `address`, `typeId`, `firstLogin`, `createdAt`, `updatedAt`) VALUES
	(1, 'Phương', 'phuong@gmail.com', '$2b$10$j25aL8Re92e60nUFgPWZeuaslUut97dKP20A7MgR8FjtK5S6wotly', '0123456789', 'Hà Nội', 1, 0, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(2, 'Phương1', 'phuong1@gmail.com', '$2b$10$j25aL8Re92e60nUFgPWZeuaslUut97dKP20A7MgR8FjtK5S6wotly', '0123456789', 'Hà Nội', 2, 0, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(3, 'Phương2', 'phuong2@gmail.com', '$2b$10$j25aL8Re92e60nUFgPWZeuaslUut97dKP20A7MgR8FjtK5S6wotly', '0123456789', 'Hà Nội', 3, 0, '2024-02-22 06:13:59', '2024-02-22 06:13:59'),
	(4, 'Phương3', 'phuong3@gmail.com', '$2b$10$j25aL8Re92e60nUFgPWZeuaslUut97dKP20A7MgR8FjtK5S6wotly', '0123456789', 'Hà Nội', 4, 0, '2024-02-22 06:13:59', '2024-02-22 06:13:59');

-- Dumping structure for table f8_project_final.user_columns
CREATE TABLE IF NOT EXISTS `user_columns` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `featureName` varchar(100) DEFAULT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_columns_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.user_columns: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.user_otp
CREATE TABLE IF NOT EXISTS `user_otp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `otp` varchar(10) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `expire` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `otp` (`otp`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_otp_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.user_otp: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.user_permission
CREATE TABLE IF NOT EXISTS `user_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `permissionId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `user_permission_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_permission_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.user_permission: ~0 rows (approximately)

-- Dumping structure for table f8_project_final.user_role
CREATE TABLE IF NOT EXISTS `user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `roleId` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `roleId` (`roleId`),
  CONSTRAINT `user_role_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_role_ibfk_2` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.user_role: ~1 rows (approximately)
INSERT INTO `user_role` (`id`, `userId`, `roleId`, `createdAt`, `updatedAt`) VALUES
	(1, 1, 1, '2024-02-22 06:14:00', '2024-02-22 06:14:00');

-- Dumping structure for table f8_project_final.user_socials
CREATE TABLE IF NOT EXISTS `user_socials` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) DEFAULT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `providerId` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `user_socials_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Dumping data for table f8_project_final.user_socials: ~0 rows (approximately)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
