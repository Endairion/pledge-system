-- --------------------------------------------------------
-- Host:                         192.168.1.66
-- Server version:               5.7.42 - MySQL Community Server (GPL)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.8.0.6908
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for pajakmas_db
CREATE DATABASE IF NOT EXISTS `pajakmas_db` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `pajakmas_db`;

-- Dumping structure for table pajakmas_db.adm_gold_rate
CREATE TABLE IF NOT EXISTS `adm_gold_rate` (
  `gold_rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `quality_id` int(11) NOT NULL,
  `min_gold_rate` decimal(10,2) NOT NULL,
  `max_gold_rate` decimal(10,2) NOT NULL,
  `activate` int(11) NOT NULL COMMENT '1 = Activate ; 0 = Deactivate ',
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`gold_rate_id`),
  KEY `quality_id` (`quality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.adm_user
CREATE TABLE IF NOT EXISTS `adm_user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_group_id` int(11) NOT NULL,
  `user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `designation` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `hp_num` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `adm_user_access_type_id` int(11) DEFAULT '1',
  PRIMARY KEY (`user_id`),
  KEY `user_group_id` (`user_group_id`),
  KEY `store_id` (`store_id`),
  KEY `user_status_id` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='HQ Users';

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.adm_user_access_type
CREATE TABLE IF NOT EXISTS `adm_user_access_type` (
  `adm_user_access_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`adm_user_access_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.adm_user_group
CREATE TABLE IF NOT EXISTS `adm_user_group` (
  `user_group_id` int(11) NOT NULL AUTO_INCREMENT,
  `group_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `desc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `status` int(11) NOT NULL DEFAULT '1',
  `created_date` datetime NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_group_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Admin User Group';

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.adm_user_logs
CREATE TABLE IF NOT EXISTS `adm_user_logs` (
  `user_logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `adm_user_id` int(11) NOT NULL DEFAULT '0',
  `adm_user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_logs_created_date` datetime NOT NULL,
  PRIMARY KEY (`user_logs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.adm_user_pass_logs
CREATE TABLE IF NOT EXISTS `adm_user_pass_logs` (
  `aup_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modified_date` datetime NOT NULL,
  PRIMARY KEY (`aup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.auction_buyer
CREATE TABLE IF NOT EXISTS `auction_buyer` (
  `auction_buyer_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL DEFAULT '0',
  `code` varchar(50) NOT NULL DEFAULT '0',
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `company_name` varchar(50) NOT NULL DEFAULT '0',
  `address` varchar(100) NOT NULL DEFAULT '0',
  `state` varchar(25) NOT NULL DEFAULT '0',
  `postal` varchar(25) NOT NULL DEFAULT '0',
  `country` int(11) NOT NULL DEFAULT '0',
  `buyer_ic` varchar(50) NOT NULL DEFAULT '0',
  `buyer_name` varchar(100) NOT NULL DEFAULT '0',
  `buyer_dob` date NOT NULL,
  `gender_id` int(11) NOT NULL DEFAULT '0',
  `race_id` int(11) NOT NULL DEFAULT '0',
  `created_by` int(11) NOT NULL DEFAULT '0',
  `created_date` datetime NOT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`auction_buyer_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.auction_quality_price
CREATE TABLE IF NOT EXISTS `auction_quality_price` (
  `auction_quality_price_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_id` int(11) DEFAULT NULL,
  `quality_id` int(11) DEFAULT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `date_added` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `date_modified` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`auction_quality_price_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.auction_sheet
CREATE TABLE IF NOT EXISTS `auction_sheet` (
  `auction_sheet_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_running_no` int(11) NOT NULL,
  `auction_date` date NOT NULL,
  `auction_remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gold_mks_price` double(10,2) DEFAULT NULL,
  `gold_mks_price_plus_5_percent` double(10,2) DEFAULT NULL,
  `gold_mks_price_sub_10_percent` double(10,2) DEFAULT NULL,
  `silver_mks_price` double(10,2) DEFAULT NULL,
  `silver_mks_price_plus_5_percent` double(10,2) DEFAULT NULL,
  `silver_mks_price_sub_10_percent` double(10,2) DEFAULT NULL,
  `auction_sheet_status_id` int(11) NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`auction_sheet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.auction_sheet_status
CREATE TABLE IF NOT EXISTS `auction_sheet_status` (
  `auction_sheet_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`auction_sheet_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.auction_status
CREATE TABLE IF NOT EXISTS `auction_status` (
  `auction_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`auction_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.batch_redeem_history
CREATE TABLE IF NOT EXISTS `batch_redeem_history` (
  `batch_redeem_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_pledge_redeemed` int(11) DEFAULT NULL,
  `total_to_pay_amount` decimal(10,2) NOT NULL,
  `total_received_amount` decimal(10,2) NOT NULL,
  `total_changed_amount` decimal(10,2) NOT NULL,
  `total_redeem_cash` decimal(10,2) DEFAULT '0.00',
  `total_redeem_bank` decimal(10,2) DEFAULT '0.00',
  `redeem_date` datetime DEFAULT NULL,
  PRIMARY KEY (`batch_redeem_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3198 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.batch_renew_history
CREATE TABLE IF NOT EXISTS `batch_renew_history` (
  `batch_renew_id` int(11) NOT NULL AUTO_INCREMENT,
  `total_pledge_renewed` int(11) NOT NULL,
  `total_to_pay_amount` decimal(10,2) NOT NULL,
  `total_received_amount` decimal(10,2) NOT NULL,
  `total_changed_amount` decimal(10,2) NOT NULL,
  `total_renew_cash` decimal(10,2) DEFAULT '0.00',
  `total_renew_bank` decimal(10,2) DEFAULT '0.00',
  `renew_date` datetime DEFAULT NULL,
  PRIMARY KEY (`batch_renew_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5234 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cancel_pledge_redeem_log
CREATE TABLE IF NOT EXISTS `cancel_pledge_redeem_log` (
  `cancel_pledge_redeem_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL DEFAULT '0',
  `redeem_bank_payment` decimal(10,2) NOT NULL DEFAULT '0.00',
  `redeem_cash_payment` decimal(10,2) NOT NULL DEFAULT '0.00',
  `redeem_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `redeemed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `cancel_date` datetime DEFAULT NULL,
  `cancel_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cancel_pledge_redeem_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cancel_pledge_renew_log
CREATE TABLE IF NOT EXISTS `cancel_pledge_renew_log` (
  `cancel_pledge_renew_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL DEFAULT '0',
  `renew_bank_payment` decimal(10,2) NOT NULL DEFAULT '0.00',
  `renew_cash_payment` decimal(10,2) NOT NULL DEFAULT '0.00',
  `renew_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `renew_date` datetime DEFAULT NULL,
  `renew_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '0',
  `cancel_date` datetime DEFAULT NULL,
  `cancel_by` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cancel_pledge_renew_log_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cash_adjustment
CREATE TABLE IF NOT EXISTS `cash_adjustment` (
  `cash_adj_id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_adj_prefix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cash_adj_running_no` int(11) NOT NULL,
  `date` date NOT NULL,
  `store_id` int(11) NOT NULL,
  `cash_adj_type_id` int(11) NOT NULL,
  `cash_amt_in` decimal(10,2) NOT NULL,
  `cash_amt_out` decimal(10,2) NOT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pledge_type` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=None, 1=New Pawn (counts toward store target), 2=Ticket Income, 3=Redeem',
  `cash_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cash_status_id` int(11) NOT NULL,
  `prepared_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `prepared_date` datetime DEFAULT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approved_date` datetime DEFAULT NULL,
  `reversed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reversed_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cash_adj_id`),
  KEY `store_id` (`store_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3621 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cash_adjustment_type
CREATE TABLE IF NOT EXISTS `cash_adjustment_type` (
  `cash_adj_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_adj_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cash_adj_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cash_control
CREATE TABLE IF NOT EXISTS `cash_control` (
  `cash_trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_trans_prefix` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `cash_trans_running_no` int(11) NOT NULL,
  `cash_trans_date` date NOT NULL,
  `store_id_from` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id_to` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cash_trans_amt` decimal(10,2) NOT NULL DEFAULT '0.00',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cash_status_id` int(11) NOT NULL,
  `transfer_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transfer_date` datetime NOT NULL,
  `approval_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approval_date` datetime DEFAULT NULL,
  `received_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `received_date` datetime DEFAULT NULL,
  `reversed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reversed_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`cash_trans_id`),
  KEY `cash_status_id` (`cash_status_id`)
) ENGINE=MyISAM AUTO_INCREMENT=701 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cash_status
CREATE TABLE IF NOT EXISTS `cash_status` (
  `cash_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cash_status_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.category
CREATE TABLE IF NOT EXISTS `category` (
  `category_id` int(11) NOT NULL AUTO_INCREMENT,
  `category_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `report_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `report_type2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.country
CREATE TABLE IF NOT EXISTS `country` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activate` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`country_id`)
) ENGINE=MyISAM AUTO_INCREMENT=268 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_customer_business_size
CREATE TABLE IF NOT EXISTS `crp_customer_business_size` (
  `crp_customer_business_size_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_customer_business_size_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_customer_type
CREATE TABLE IF NOT EXISTS `crp_customer_type` (
  `crp_customer_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_customer_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_delivery_channel
CREATE TABLE IF NOT EXISTS `crp_delivery_channel` (
  `crp_delivery_channel_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_delivery_channel_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_geographical_risk
CREATE TABLE IF NOT EXISTS `crp_geographical_risk` (
  `crp_geographical_risk_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_geographical_risk_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_mode_of_payment
CREATE TABLE IF NOT EXISTS `crp_mode_of_payment` (
  `crp_mode_of_payment_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_mode_of_payment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_nationality
CREATE TABLE IF NOT EXISTS `crp_nationality` (
  `crp_nationality_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_nationality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_occupation_type
CREATE TABLE IF NOT EXISTS `crp_occupation_type` (
  `crp_occupation_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_occupation_type_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_overall_risk_assessment
CREATE TABLE IF NOT EXISTS `crp_overall_risk_assessment` (
  `crp_overall_risk_assessment_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_overall_risk_assessment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.crp_pep
CREATE TABLE IF NOT EXISTS `crp_pep` (
  `crp_pep_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`crp_pep_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.currency
CREATE TABLE IF NOT EXISTS `currency` (
  `currency_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(32) NOT NULL,
  `code` varchar(3) NOT NULL,
  `symbol_left` varchar(12) NOT NULL,
  `symbol_right` varchar(12) NOT NULL,
  `decimal_separator` char(1) NOT NULL,
  `decimal_place` char(1) NOT NULL,
  `thousand_separator` char(1) NOT NULL,
  `value` double(15,8) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`currency_id`),
  KEY `status` (`status`),
  KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.customer
CREATE TABLE IF NOT EXISTS `customer` (
  `cust_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `cust_ic` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_name` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_addr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_mailing_addr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_state` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_postal` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_telephone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_fax` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_hp1` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_hp2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_dob` date DEFAULT NULL,
  `gender_id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `race_id` int(11) NOT NULL,
  `religion_id` int(11) NOT NULL,
  `nationality_id` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loan_limit` decimal(10,2) NOT NULL DEFAULT '200000.00',
  `authorize_loan_limit` decimal(10,2) NOT NULL DEFAULT '200000.00',
  `daily_cash_limit` decimal(10,2) NOT NULL DEFAULT '5000.00',
  `occupation_type` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `occupation_field` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `purpose_of_transaction` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source_of_gold_id` int(11) DEFAULT NULL,
  `status_id` int(11) NOT NULL,
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cust_id`),
  KEY `type_id` (`type_id`),
  KEY `title_id` (`title_id`),
  KEY `race_id` (`race_id`),
  KEY `religion_id` (`religion_id`),
  KEY `status_id` (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=73029 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.customer_risk_profile
CREATE TABLE IF NOT EXISTS `customer_risk_profile` (
  `customer_risk_profile_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL DEFAULT '0',
  `status` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0 = invalid, 1 = valid',
  `crp_pep_id` int(11) NOT NULL DEFAULT '0',
  `crp_nationality_id` int(11) NOT NULL DEFAULT '0',
  `is_high_net_worth` int(11) NOT NULL DEFAULT '0',
  `crp_customer_type_id` int(11) NOT NULL DEFAULT '0',
  `crp_customer_business_size_id` int(11) NOT NULL DEFAULT '0',
  `crp_occupation_type_id` int(11) NOT NULL DEFAULT '0',
  `is_adverse_remark` int(11) NOT NULL DEFAULT '0',
  `crp_adverse_remark_value` varchar(255) DEFAULT NULL,
  `other_consideration1` varchar(500) DEFAULT NULL,
  `crp_geographical_risk_id` int(11) DEFAULT NULL,
  `other_consideration2` varchar(500) DEFAULT NULL,
  `is_provide_anonymity` int(11) DEFAULT NULL COMMENT '0 = no , 1 = yes',
  `is_offered_commensurate` int(11) DEFAULT NULL COMMENT '0 = no , 1 = yes',
  `is_involve_complex_and_unusual_transaction` int(11) DEFAULT NULL COMMENT '0 = no , 1 = yes',
  `is_require_nominee_services` int(11) DEFAULT NULL COMMENT '0 = no , 1 = yes',
  `is_company_have_nominee` int(11) DEFAULT NULL COMMENT '0 = no , 1 = yes',
  `is_invovle_cross_border_transaction` int(11) DEFAULT NULL COMMENT '0 = no , 1 = yes',
  `other_consideration3` varchar(500) DEFAULT NULL,
  `crp_mode_of_payment_id` int(11) DEFAULT NULL,
  `crp_delivery_channel_id` int(11) DEFAULT NULL,
  `other_consideration4` varchar(500) DEFAULT NULL,
  `other_factor` varchar(500) DEFAULT NULL,
  `crp_overall_risk_assessment_id` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `date_modified` datetime DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`customer_risk_profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cust_loan_limit_history
CREATE TABLE IF NOT EXISTS `cust_loan_limit_history` (
  `cust_loan_limit_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_id` int(11) NOT NULL,
  `loan_limit` double(10,2) NOT NULL,
  `authorize_loan_limit` double(10,2) NOT NULL,
  `remarks` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`cust_loan_limit_history_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6708 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cust_nationality
CREATE TABLE IF NOT EXISTS `cust_nationality` (
  `nationality_id` int(11) NOT NULL AUTO_INCREMENT,
  `nationality` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`nationality_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cust_race
CREATE TABLE IF NOT EXISTS `cust_race` (
  `race_id` int(11) NOT NULL AUTO_INCREMENT,
  `race` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`race_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cust_religion
CREATE TABLE IF NOT EXISTS `cust_religion` (
  `religion_id` int(11) NOT NULL AUTO_INCREMENT,
  `religion` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`religion_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cust_status
CREATE TABLE IF NOT EXISTS `cust_status` (
  `cust_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cust_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cust_title
CREATE TABLE IF NOT EXISTS `cust_title` (
  `title_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`title_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.cust_type
CREATE TABLE IF NOT EXISTS `cust_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for event pajakmas_db.generate_all_yearly_reports_event
DELIMITER //
CREATE EVENT `generate_all_yearly_reports_event` ON SCHEDULE EVERY 1 DAY STARTS '2025-11-20 00:30:00' ON COMPLETION PRESERVE ENABLE DO BEGIN
  DECLARE done INT DEFAULT 0;
  DECLARE v_store_id INT;
  DECLARE cur_stores CURSOR FOR SELECT store_id FROM store WHERE store_status_id = 1;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  OPEN cur_stores;
  fetch_loop: LOOP
    FETCH cur_stores INTO v_store_id;
    IF done THEN
      LEAVE fetch_loop;
    END IF;

    -- Call the per-store population procedure for the current year
    CALL populate_yearly_transaction_report(v_store_id, YEAR(CURDATE()), 'system');
  END LOOP fetch_loop;
  CLOSE cur_stores;
END//
DELIMITER ;

-- Dumping structure for table pajakmas_db.loan_based_opening_balance
CREATE TABLE IF NOT EXISTS `loan_based_opening_balance` (
  `loan_based_opening_balance_id` int(11) NOT NULL AUTO_INCREMENT,
  `financial_year` int(11) NOT NULL DEFAULT '0',
  `store_id` int(11) NOT NULL DEFAULT '0',
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`loan_based_opening_balance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.monthly_balance
CREATE TABLE IF NOT EXISTS `monthly_balance` (
  `monthly_balance_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `month` tinyint(4) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `financial_year` int(11) DEFAULT NULL,
  `opening_balance` decimal(10,2) DEFAULT NULL,
  `new_pledge_balance` decimal(10,2) DEFAULT NULL,
  `redeemed_pledge_balance` decimal(10,2) DEFAULT NULL,
  `auctioned_pledge_balance` decimal(10,2) DEFAULT NULL,
  `sold_pledge_balance` decimal(10,2) DEFAULT NULL,
  `forfeited_pledge_balance` decimal(10,2) DEFAULT NULL,
  `seized_pledge_balance` decimal(10,2) DEFAULT NULL,
  `returned_pledge_balance` decimal(10,2) DEFAULT NULL,
  `cancelled_pledge_balance` decimal(10,2) DEFAULT NULL,
  `closing_balance` decimal(10,2) DEFAULT NULL,
  `ujrah_fee` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`monthly_balance_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=737 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pagination
CREATE TABLE IF NOT EXISTS `pagination` (
  `pag_id` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `per_page` int(11) NOT NULL,
  PRIMARY KEY (`pag_id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.payment_slip_status
CREATE TABLE IF NOT EXISTS `payment_slip_status` (
  `payment_slip_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `class` varchar(50) NOT NULL,
  PRIMARY KEY (`payment_slip_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.payment_type
CREATE TABLE IF NOT EXISTS `payment_type` (
  `payment_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(50) DEFAULT NULL,
  `payment_slip_option_status` tinyint(4) NOT NULL DEFAULT '0',
  `payment_remark_option_status` tinyint(4) NOT NULL DEFAULT '0',
  `status` tinyint(4) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_type_id`),
  KEY `status` (`status`),
  KEY `payment_slip_option_status` (`payment_slip_option_status`),
  KEY `payment_remark_option_status` (`payment_remark_option_status`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge
CREATE TABLE IF NOT EXISTS `pledge` (
  `pledge_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_prefix` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pledge_running_no` int(11) NOT NULL,
  `pledge_date` date NOT NULL,
  `cust_id` int(11) NOT NULL,
  `cust_ic` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_addr` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `pledge_status_id` int(11) NOT NULL,
  `gross_weight` decimal(10,3) NOT NULL,
  `pledge_charge_fee` decimal(10,2) unsigned NOT NULL,
  `pledge_interest_rate` float unsigned NOT NULL DEFAULT '0',
  `month_interest_rate` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `month_interest_rate_remark` varchar(225) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `use_current_month_rate_for_redemption` tinyint(4) DEFAULT NULL,
  `max_pledge` decimal(10,2) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_pledge_amt` decimal(10,2) unsigned NOT NULL,
  `bank_payment` decimal(10,2) DEFAULT '0.00',
  `cash_payment` decimal(10,2) DEFAULT '0.00',
  `total_assessed_value` decimal(10,2) NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_date` datetime NOT NULL,
  `expiry_date` date NOT NULL,
  `extend_expiry_date` date DEFAULT NULL,
  `pay_remarks` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stg_fee_per_mth` decimal(10,2) NOT NULL,
  `stg_fee_paid` decimal(10,2) DEFAULT NULL,
  `stg_fee_balance` decimal(10,2) DEFAULT NULL,
  `total_stg_fee` decimal(10,2) DEFAULT NULL,
  `no_of_mth` int(11) DEFAULT NULL,
  `renew_no_of_mth` int(11) DEFAULT NULL,
  `pledge_balance` decimal(10,2) DEFAULT NULL,
  `net_amt_to_redeem` decimal(10,2) DEFAULT NULL,
  `redeem_bank_payment` decimal(10,2) DEFAULT '0.00',
  `redeem_cash_payment` decimal(10,2) DEFAULT '0.00',
  `redeem_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `redeemed_auction_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_auction_date` datetime DEFAULT NULL,
  `redeemed_auction_status` tinyint(4) DEFAULT NULL,
  `redeemed_auction_settled_date` datetime DEFAULT NULL,
  `redeemed_auction_cust` int(11) DEFAULT NULL,
  `mark_as_sold_by` int(11) DEFAULT NULL,
  `mark_as_sold_date` datetime DEFAULT NULL,
  `mark_as_sold_price` decimal(10,2) DEFAULT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_agreement_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_appendix_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_renew_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_redeem_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_missing_pledge_letter_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_before_auction_letter_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `before_auction_letter_print_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `old_pledge_id` int(11) DEFAULT NULL,
  `old_pledge_prefix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_pledge_running_no` int(11) DEFAULT NULL,
  `old_total_pledge_amt` decimal(10,2) DEFAULT NULL,
  `pmb_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pmb_date_updated` datetime DEFAULT NULL,
  `pmb_updated_by` int(11) DEFAULT NULL,
  `pmb_status` int(11) DEFAULT NULL COMMENT '0 = pending, 1 = complete, 2 = failed',
  `pmb_status_updated_by` int(11) DEFAULT NULL,
  `pmb_status_updated_date` datetime DEFAULT NULL,
  `pmb_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pmb_date_added` date DEFAULT NULL,
  `old_system_pledge_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mark_as_police_case_date` datetime DEFAULT NULL,
  `mark_as_police_case_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_id`),
  KEY `cust_id` (`cust_id`),
  KEY `pledge_status_id` (`pledge_status_id`),
  KEY `idx_pledge_date_store_status` (`pledge_date`,`store_id`,`pledge_status_id`),
  KEY `idx_pledge_status_date` (`pledge_status_id`,`pledge_date`),
  KEY `idx_pledge_store_id` (`store_id`),
  KEY `idx_pledge_date` (`pledge_date`)
) ENGINE=InnoDB AUTO_INCREMENT=99628 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_auction
CREATE TABLE IF NOT EXISTS `pledge_auction` (
  `pledge_auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_id` int(11) NOT NULL,
  `pledge_id` int(11) NOT NULL,
  `pledge_running_no` int(11) NOT NULL,
  `pledge_item_id` int(11) NOT NULL,
  `auction_status_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` double(10,2) NOT NULL,
  `pledge_amount` double(10,2) NOT NULL,
  `item_stg_fee_per_mth` double(10,2) NOT NULL,
  `total_of_month` double(10,2) NOT NULL,
  `total_item_stg_fee` double(10,2) NOT NULL,
  `total_amount_to_paid_by_customer` double(10,2) NOT NULL,
  `purity_percent` double(10,2) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `gold_mks_price` double(10,2) DEFAULT NULL,
  `silver_mks_price` double(10,2) DEFAULT NULL,
  `pgm_bid_per_gram` double(10,2) DEFAULT NULL,
  `pgm_bid_total_gram` double(10,2) DEFAULT NULL,
  `pgm_bid_diff_item_pledge_amt` double(10,2) DEFAULT NULL,
  `pgm_bid_gain_loss` double(10,2) DEFAULT NULL,
  `admin_fee` double(10,2) DEFAULT NULL,
  `actual_admin_fee` double(10,2) DEFAULT NULL,
  `actual_vs_normal` double(10,2) DEFAULT NULL,
  `excess_to_refund` double(10,2) DEFAULT NULL,
  `calculate_by` int(11) DEFAULT NULL,
  `calculate_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledge_auction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_auction_delete_log
CREATE TABLE IF NOT EXISTS `pledge_auction_delete_log` (
  `pledge_auction_delete_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_id` int(11) NOT NULL DEFAULT '0',
  `pledge_id` int(11) NOT NULL DEFAULT '0',
  `deleted_by` int(11) NOT NULL DEFAULT '0',
  `deleted_date` datetime NOT NULL,
  PRIMARY KEY (`pledge_auction_delete_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_charge_fee
CREATE TABLE IF NOT EXISTS `pledge_charge_fee` (
  `pledge_charge_fee_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`pledge_charge_fee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_extend_expiry_date_log
CREATE TABLE IF NOT EXISTS `pledge_extend_expiry_date_log` (
  `pledge_extend_expiry_date_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `old_expiry_date` date DEFAULT NULL,
  `new_expiry_date` date DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_extend_expiry_date_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2701 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_history
CREATE TABLE IF NOT EXISTS `pledge_history` (
  `pledge_hist_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `pledge_prefix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pledge_running_no` int(11) NOT NULL DEFAULT '1',
  `pledge_date` date NOT NULL,
  `activate` int(11) NOT NULL DEFAULT '1' COMMENT '1 = activate , 0 = deactivated',
  `cust_id` int(11) NOT NULL,
  `cust_ic` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_addr` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `pledge_status_id` int(11) NOT NULL,
  `gross_weight` decimal(10,2) NOT NULL,
  `pledge_charge_fee` decimal(10,2) NOT NULL,
  `pledge_interest_rate` float NOT NULL DEFAULT '0',
  `month_interest_rate` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `month_interest_rate_remark` varchar(225) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `use_current_month_rate_for_redemption` tinyint(4) DEFAULT NULL,
  `max_pledge` decimal(10,2) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_pledge_amt` decimal(10,2) NOT NULL,
  `bank_payment` decimal(10,2) DEFAULT '0.00',
  `cash_payment` decimal(10,2) DEFAULT '0.00',
  `total_assessed_value` decimal(10,2) NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_date` datetime NOT NULL,
  `expiry_date` date NOT NULL,
  `extend_expiry_date` date DEFAULT NULL,
  `pay_remarks` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stg_fee_per_mth` decimal(10,2) NOT NULL,
  `stg_fee_paid` decimal(10,2) DEFAULT NULL,
  `stg_fee_balance` decimal(10,2) DEFAULT NULL,
  `total_stg_fee` decimal(10,2) DEFAULT NULL,
  `no_of_mth` int(11) DEFAULT NULL,
  `renew_no_of_mth` int(11) DEFAULT NULL,
  `pledge_balance` decimal(10,2) DEFAULT NULL,
  `net_amt_to_redeem` decimal(10,2) DEFAULT NULL,
  `redeem_bank_payment` decimal(10,2) DEFAULT '0.00',
  `redeem_cash_payment` decimal(10,2) DEFAULT '0.00',
  `redeem_remark` decimal(10,2) DEFAULT NULL,
  `redeemed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `redeemed_auction_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_auction_date` datetime DEFAULT NULL,
  `redeemed_auction_status` tinyint(4) DEFAULT NULL,
  `redeemed_auction_settled_date` datetime DEFAULT NULL,
  `redeemed_auction_cust` int(11) DEFAULT NULL,
  `mark_as_sold_by` int(11) DEFAULT NULL,
  `mark_as_sold_date` datetime DEFAULT NULL,
  `mark_as_sold_price` decimal(10,2) DEFAULT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_agreement_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_appendix_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `is_renew_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_redeem_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_missing_pledge_letter_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_before_auction_letter_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `before_auction_letter_print_date` datetime DEFAULT NULL,
  `old_pledge_id` int(11) DEFAULT NULL,
  `old_pledge_prefix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `old_pledge_running_no` int(11) DEFAULT NULL,
  `old_total_pledge_amt` decimal(10,2) DEFAULT NULL,
  `pmb_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pmb_date_updated` datetime DEFAULT NULL,
  `pmb_updated_by` int(11) DEFAULT NULL,
  `pmb_status` int(11) DEFAULT NULL COMMENT '0 = pending, 1 = complete, 2 = failed',
  `pmb_status_updated_by` int(11) DEFAULT NULL,
  `pmb_status_updated_date` datetime DEFAULT NULL,
  `pmb_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pmb_date_added` date DEFAULT NULL,
  `old_system_pledge_number` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mark_as_police_case_date` datetime DEFAULT NULL,
  `mark_as_police_case_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_hist_id`),
  KEY `cust_id` (`cust_id`),
  KEY `pledge_status_id` (`pledge_status_id`),
  KEY `pledge_id` (`pledge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=99632 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_interest_rate
CREATE TABLE IF NOT EXISTS `pledge_interest_rate` (
  `pledge_interest_rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `value` float(10,2) DEFAULT NULL,
  PRIMARY KEY (`pledge_interest_rate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_item
CREATE TABLE IF NOT EXISTS `pledge_item` (
  `pledge_item_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `pledge_running_no` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `item_desc` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quality_id` int(11) NOT NULL,
  `gold_rate` decimal(10,2) NOT NULL,
  `serial_num` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_remarks` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int(11) NOT NULL,
  `weight` decimal(10,3) NOT NULL,
  `length` decimal(10,2) NOT NULL COMMENT 'in cm',
  `assessed_value` decimal(10,2) NOT NULL,
  `pledge_percent` decimal(10,2) NOT NULL,
  `pledge_amt` decimal(10,2) NOT NULL,
  `item_stg_fee` decimal(10,2) NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `pledge_item_status` tinyint(1) NOT NULL DEFAULT '1',
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_item_id`),
  KEY `pledge_id` (`pledge_id`),
  KEY `product_id` (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `quality_id` (`quality_id`),
  KEY `idx_pledge_item_pledge_id` (`pledge_id`),
  KEY `idx_pledge_item_status` (`pledge_item_status`,`pledge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115617 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_item_history
CREATE TABLE IF NOT EXISTS `pledge_item_history` (
  `pledge_item_hist_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_item_id` int(11) NOT NULL,
  `pledge_id` int(11) NOT NULL,
  `pledge_running_no` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `item_desc` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quality_id` int(11) NOT NULL,
  `serial_num` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `item_remarks` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `qty` int(11) NOT NULL,
  `gold_rate` decimal(10,2) NOT NULL,
  `weight` decimal(10,2) NOT NULL,
  `length` decimal(10,2) NOT NULL COMMENT 'in cm',
  `assessed_value` decimal(10,2) NOT NULL,
  `pledge_percent` decimal(10,2) NOT NULL,
  `pledge_amt` decimal(10,2) NOT NULL,
  `item_stg_fee` decimal(10,2) NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledge_item_hist_id`),
  KEY `pledge_id` (`pledge_id`),
  KEY `product_id` (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `quality_id` (`quality_id`),
  KEY `pledge_item_id` (`pledge_item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=115609 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_item_remark
CREATE TABLE IF NOT EXISTS `pledge_item_remark` (
  `pledge_item_remark_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_item_remark` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activate` int(11) DEFAULT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_item_remark_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_jadual_n
CREATE TABLE IF NOT EXISTS `pledge_jadual_n` (
  `pledge_jadual_n_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `pledge_prefix` varchar(50) DEFAULT NULL,
  `pledge_running_no` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL COMMENT '1 = active, 2 = removed',
  `quantity` int(11) DEFAULT NULL,
  `weight` decimal(10,3) DEFAULT NULL,
  `interest_rate` decimal(10,3) DEFAULT NULL,
  `pledge_amount` decimal(10,2) DEFAULT NULL,
  `stg_fee_per_mth` decimal(10,2) DEFAULT NULL,
  `no_of_mth` decimal(10,2) DEFAULT NULL,
  `total_stg_fee` decimal(10,2) DEFAULT NULL,
  `other_profit` decimal(10,2) DEFAULT NULL,
  `sold_date` datetime DEFAULT NULL,
  `sold_price` decimal(10,2) DEFAULT NULL,
  `surplus_value` decimal(10,2) DEFAULT NULL,
  `buyer_code` varchar(255) DEFAULT NULL,
  `auction_date` date DEFAULT NULL,
  `auction_value` decimal(10,2) DEFAULT NULL,
  `jadual_n_status` int(11) NOT NULL COMMENT '1 = jadual n, 2 = jadual n all , 3 = done auction',
  `auction_buyer_id` int(11) DEFAULT NULL,
  `change_to_jadual_n_all_date` datetime DEFAULT NULL,
  `change_to_jadual_n_all_by` int(11) DEFAULT NULL,
  `done_auction_date` datetime DEFAULT NULL,
  `done_auction_by` int(11) DEFAULT NULL,
  `created_by` int(11) DEFAULT NULL,
  `created_date` datetime DEFAULT NULL,
  `remove_by` int(11) DEFAULT NULL,
  `remove_date` datetime DEFAULT NULL,
  `commission_rate` decimal(10,2) DEFAULT NULL,
  `commission_value` decimal(10,2) DEFAULT NULL,
  `anggaran_nilai_sandaran` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '110% of pledge_amount',
  `is_renew` int(11) NOT NULL DEFAULT '0',
  `is_redeem` int(11) NOT NULL DEFAULT '0',
  `is_extend` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledge_jadual_n_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=799 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_letter_missing_log
CREATE TABLE IF NOT EXISTS `pledge_letter_missing_log` (
  `pledge_letter_missing_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_letter_missing_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=601 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_mark_as_police_case_log
CREATE TABLE IF NOT EXISTS `pledge_mark_as_police_case_log` (
  `pledge_mark_as_police_case_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `old_pledge_status` int(11) DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_mark_as_police_case_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_mark_as_sold_log
CREATE TABLE IF NOT EXISTS `pledge_mark_as_sold_log` (
  `pledge_mark_as_sold_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `old_pledge_status` int(11) DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_mark_as_sold_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_quality
CREATE TABLE IF NOT EXISTS `pledge_quality` (
  `quality_id` int(11) NOT NULL AUTO_INCREMENT,
  `quality_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activate` int(11) NOT NULL,
  `auction_quality_order` int(11) NOT NULL COMMENT 'sort order in auction page',
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`quality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_redeem_bank_slip
CREATE TABLE IF NOT EXISTS `pledge_redeem_bank_slip` (
  `pledge_redeem_bank_slip_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `pledge_redeem_history_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pathway` varchar(252) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attachment_type` int(11) DEFAULT '1' COMMENT '1 = image, 2 = pdf',
  `status` tinyint(1) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_redeem_bank_slip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_redeem_history
CREATE TABLE IF NOT EXISTS `pledge_redeem_history` (
  `pledge_redeem_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `redeem_cash_payment` decimal(10,2) DEFAULT NULL,
  `redeem_bank_payment` decimal(10,2) DEFAULT NULL,
  `to_pay_amount` decimal(10,2) DEFAULT NULL,
  `received_amount` decimal(10,2) DEFAULT NULL,
  `changed_amount` decimal(10,2) DEFAULT NULL,
  `redeem_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_by` int(11) DEFAULT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0' COMMENT '0 = pending, 1 = approved',
  `approved_date` datetime DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `rejected_date` datetime DEFAULT NULL,
  `rejected_by` int(11) DEFAULT NULL,
  `redeem_person_name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeem_person_ic` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeem_person_addr` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeem_person_contact_no` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeem_person_race_id` int(11) DEFAULT NULL,
  `batch_redeem_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_redeem_history_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=35671 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_renew
CREATE TABLE IF NOT EXISTS `pledge_renew` (
  `pledge_renew_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `pledge_prefix` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pledge_running_no` int(11) NOT NULL,
  `store_id` int(11) NOT NULL,
  `total_assessed_value` decimal(10,2) NOT NULL,
  `stg_fee_per_mth` decimal(10,2) NOT NULL,
  `stg_fee_paid` decimal(10,2) NOT NULL,
  `total_stg_fee` decimal(10,2) NOT NULL,
  `stg_fee_balance` decimal(10,2) NOT NULL,
  `no_of_mth_renew` int(11) NOT NULL,
  `renew_bank_payment` decimal(10,2) NOT NULL DEFAULT '0.00',
  `renew_cash_payment` decimal(10,2) NOT NULL DEFAULT '0.00',
  `net_amt_pay` decimal(10,2) NOT NULL,
  `activate` int(11) NOT NULL DEFAULT '1',
  `renew_remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `renew_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `renew_date` datetime NOT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `approved_date` datetime DEFAULT NULL,
  `rejected_by` int(11) DEFAULT NULL,
  `rejected_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `new_pledge_id` int(11) DEFAULT NULL,
  `new_pledge_prefix` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `new_pledge_running_no` int(11) DEFAULT NULL,
  `new_pledge_amt` decimal(10,2) DEFAULT NULL,
  `new_pledge_amt_deduct` decimal(10,2) DEFAULT NULL COMMENT 'the overpay of renew amount will be used to deduct the new pledge amount ',
  `pledge_charge_fee` decimal(10,2) DEFAULT NULL,
  `interest_amount` decimal(10,2) DEFAULT NULL,
  `plus_minus_amount` decimal(10,2) DEFAULT NULL,
  `to_pay_amount` decimal(10,2) DEFAULT NULL,
  `received_amount` decimal(10,2) DEFAULT NULL,
  `changed_amount` decimal(10,2) DEFAULT NULL,
  `renew_person_name` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `renew_person_ic` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `renew_person_addr` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `renew_person_contact_no` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `renew_person_race_id` int(11) DEFAULT NULL,
  `batch_renew_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_renew_id`),
  KEY `idx_pledge_renew_pledge_id` (`pledge_id`),
  KEY `idx_pledge_renew_date` (`renew_date`),
  KEY `idx_pledge_renew_pledge_date` (`pledge_id`,`renew_date`),
  KEY `idx_pledge_renew_activate` (`activate`,`pledge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=37711 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_renew_bank_slip
CREATE TABLE IF NOT EXISTS `pledge_renew_bank_slip` (
  `pledge_renew_bank_slip_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `pledge_renew_id` int(11) NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pathway` varchar(252) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attachment_type` int(11) DEFAULT '1' COMMENT '1 = image, 2 = pdf',
  `status` tinyint(4) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_renew_bank_slip_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.pledge_status
CREATE TABLE IF NOT EXISTS `pledge_status` (
  `pledge_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activate` int(11) NOT NULL DEFAULT '1',
  `created_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure pajakmas_db.populate_loan_based_monthly_balance
DELIMITER //
CREATE PROCEDURE `populate_loan_based_monthly_balance`(
  IN p_month INT,
  IN p_year INT,
  IN p_store_id INT,
  IN p_generated_by VARCHAR(128)
)
BEGIN
  DECLARE v_month_start DATE;
  DECLARE v_month_end DATE;
  DECLARE v_log_id BIGINT DEFAULT 0;
  DECLARE v_started_at DATETIME;
  DECLARE v_records INT DEFAULT 0;
  DECLARE v_exec_seconds INT DEFAULT 0;
  DECLARE v_sqlstate CHAR(5);
  DECLARE v_errno INT;
  DECLARE v_err_msg TEXT;
  DECLARE done INT DEFAULT 0;
  DECLARE v_store_id INT;
  DECLARE v_store_name VARCHAR(255);
  DECLARE v_opening_balance DECIMAL(14,2);
  DECLARE v_financial_year INT;
  DECLARE v_prev_month INT;
  DECLARE v_prev_year INT;
  DECLARE v_balance_found INT DEFAULT 0;

  -- Cursor to iterate through all stores or specific store
  DECLARE store_cursor CURSOR FOR 
    SELECT s.store_id, s.company_name
    FROM store s
    WHERE s.store_status_id = 1
      AND (p_store_id IS NULL OR s.store_id = p_store_id);

  DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

  -- Error handler: record failure into log and re-signal
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1
      v_sqlstate = RETURNED_SQLSTATE, v_errno = MYSQL_ERRNO, v_err_msg = MESSAGE_TEXT;
    IF v_log_id > 0 THEN
      UPDATE procedure_log
      SET status = 'failed',
          message = CONCAT('SQLSTATE=', v_sqlstate, ' ERRNO=', v_errno, ' MSG=', LEFT(v_err_msg, 2000)),
          finished_at = NOW(),
          duration_seconds = TIMESTAMPDIFF(SECOND, started_at, NOW())
      WHERE id = v_log_id;
    END IF;
    RESIGNAL;
  END;

  -- Set month start and end dates
  SET v_month_start = STR_TO_DATE(CONCAT(p_year, '-', LPAD(p_month, 2, '0'), '-01'), '%Y-%m-%d');
  SET v_month_end = LAST_DAY(v_month_start);

  -- Calculate financial year (Aug-Jul cycle)
  IF p_month >= 8 THEN
    SET v_financial_year = p_year + 1;
  ELSE
    SET v_financial_year = p_year;
  END IF;

  -- Calculate previous month for opening balance
  SET v_prev_month = p_month - 1;
  SET v_prev_year = p_year;
  IF v_prev_month = 0 THEN 
    SET v_prev_month = 12; 
    SET v_prev_year = p_year - 1; 
  END IF;

  SET v_started_at = NOW();
  
  -- Create log entry (started)
  INSERT INTO procedure_log (procedure_name, message,status, started_at, generated_by)
  VALUES ('populate_loan_based_monthly_balance', CONCAT('Populating monthly balance for month=', p_month, ', year=', p_year), 'started', v_started_at, p_generated_by);
  
  SET v_log_id = LAST_INSERT_ID();

  -- Delete existing data for this month/year and store(s)
  IF p_store_id IS NULL THEN
    DELETE FROM monthly_balance WHERE month = p_month AND year = p_year;
  ELSE
    DELETE FROM monthly_balance WHERE month = p_month AND year = p_year AND store_id = p_store_id;
  END IF;

  -- Create temporary table to hold monthly calculations
  DROP TEMPORARY TABLE IF EXISTS tmp_monthly_calc;
  CREATE TEMPORARY TABLE tmp_monthly_calc (
    store_id INT NOT NULL PRIMARY KEY,
    store_name VARCHAR(255),
    opening_balance DECIMAL(14,2) DEFAULT 0,
    new_pledge_balance DECIMAL(14,2) DEFAULT 0,
    redeemed_pledge_balance DECIMAL(14,2) DEFAULT 0,
    auctioned_pledge_balance DECIMAL(14,2) DEFAULT 0,
    sold_pledge_balance DECIMAL(14,2) DEFAULT 0,
    forfeited_pledge_balance DECIMAL(14,2) DEFAULT 0,
    seized_pledge_balance DECIMAL(14,2) DEFAULT 0,
    returned_pledge_balance DECIMAL(14,2) DEFAULT 0,
    cancelled_pledge_balance DECIMAL(14,2) DEFAULT 0,
    closing_balance DECIMAL(14,2) DEFAULT 0,
    quantity INT DEFAULT 0,
    ujrah_fee DECIMAL(14,2) DEFAULT 0
  ) ENGINE = MEMORY;

  -- Open cursor and process each store
  OPEN store_cursor;
  
  store_loop: LOOP
    FETCH store_cursor INTO v_store_id, v_store_name;
    IF done THEN
      LEAVE store_loop;
    END IF;

    -- Reset opening balance for each store
    SET v_opening_balance = 0;

    -- Get opening balance from previous month's closing balance (use BEGIN/END to isolate the handler)
    BEGIN
      DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_opening_balance = 0;
      
      SELECT closing_balance INTO v_opening_balance
      FROM monthly_balance
      WHERE store_id = v_store_id 
        AND month = v_prev_month 
        AND year = v_prev_year
      LIMIT 1;
    END;

    -- Initialize row for this store
    INSERT INTO tmp_monthly_calc (store_id, store_name, opening_balance)
    VALUES (v_store_id, v_store_name, v_opening_balance);

    SET v_records = v_records + 1;

  END LOOP store_loop;
  
  CLOSE store_cursor;

  -- Calculate new pledges for this month
  UPDATE tmp_monthly_calc t
  LEFT JOIN (
    SELECT 
      p.store_id,
      SUM(p.total_pledge_amt) AS total_amt,
      COUNT(*) AS total_qty
    FROM pledge p
    WHERE DATE(p.pledge_date) BETWEEN v_month_start AND v_month_end
      AND p.pledge_status_id != 0
      AND (p_store_id IS NULL OR p.store_id = p_store_id)
    GROUP BY p.store_id
  ) np ON np.store_id = t.store_id
  SET t.new_pledge_balance = IFNULL(np.total_amt, 0),
      t.quantity = IFNULL(np.total_qty, 0);

  -- Calculate redeemed pledges (status 2) and ujrah fee for this month
  UPDATE tmp_monthly_calc t
  LEFT JOIN (
    SELECT 
      p.store_id,
      SUM(p.total_pledge_amt) AS total_amt,
      SUM(p.stg_fee_balance) AS total_stg_fee
    FROM pledge p
    WHERE DATE(p.redeemed_date) BETWEEN v_month_start AND v_month_end
      AND p.pledge_status_id = 2
      AND (p_store_id IS NULL OR p.store_id = p_store_id)
    GROUP BY p.store_id
  ) rp ON rp.store_id = t.store_id
  SET t.redeemed_pledge_balance = IFNULL(rp.total_amt, 0),
      t.ujrah_fee = t.ujrah_fee + IFNULL(rp.total_stg_fee, 0);

  UPDATE tmp_monthly_calc t
  LEFT JOIN (
    SELECT 
      p.store_id,
      SUM(p.total_pledge_amt) AS total_amt
    FROM pledge p
    WHERE DATE(p.mark_as_police_case_date) BETWEEN v_month_start AND v_month_end
      AND p.pledge_status_id = 10
      AND (p_store_id IS NULL OR p.store_id = p_store_id)
    GROUP BY p.store_id
  ) fp ON fp.store_id = t.store_id
  SET t.redeemed_pledge_balance = t.redeemed_pledge_balance + IFNULL(fp.total_amt, 0);

  -- Calculate redeemed after auction pledges (status 9) and add to redeemed balance
  UPDATE tmp_monthly_calc t
  LEFT JOIN (
    SELECT 
      p.store_id,
      SUM(p.total_pledge_amt) AS total_amt,
      SUM(p.stg_fee_balance) AS total_stg_fee
    FROM pledge p
    WHERE DATE(p.redeemed_auction_date) BETWEEN v_month_start AND v_month_end
      AND p.pledge_status_id = 9
      AND (p_store_id IS NULL OR p.store_id = p_store_id)
    GROUP BY p.store_id
  ) ra ON ra.store_id = t.store_id
  SET t.redeemed_pledge_balance = t.redeemed_pledge_balance + IFNULL(ra.total_amt, 0),
      t.ujrah_fee = t.ujrah_fee + IFNULL(ra.total_stg_fee, 0);

  -- Calculate renewed pledges (status 3) and add to redeemed balance and ujrah fee
  UPDATE tmp_monthly_calc t
  LEFT JOIN (
    SELECT 
      p.store_id,
      SUM(p.total_pledge_amt) AS total_amt,
      SUM(pr.total_stg_fee) AS total_stg_fee
    FROM pledge p
    JOIN pledge_renew pr ON p.pledge_id = pr.pledge_id
    WHERE DATE(pr.renew_date) BETWEEN v_month_start AND v_month_end
      AND p.pledge_status_id = 3
      AND (p_store_id IS NULL OR p.store_id = p_store_id)
      AND pr.activate = 1
    GROUP BY p.store_id
  ) rn ON rn.store_id = t.store_id
  SET t.redeemed_pledge_balance = t.redeemed_pledge_balance + IFNULL(rn.total_amt, 0),
      t.ujrah_fee = t.ujrah_fee + IFNULL(rn.total_stg_fee, 0);

  -- Calculate auctioned pledges (status 4) for this month
  UPDATE tmp_monthly_calc t
  LEFT JOIN (
    SELECT 
      p.store_id,
      SUM(pjn.pledge_amount) AS total_amt
    FROM pledge p
    JOIN pledge_jadual_n pjn ON p.pledge_id = pjn.pledge_id
    WHERE DATE(pjn.auction_date) BETWEEN v_month_start AND v_month_end
      AND p.pledge_status_id = 4
      AND pjn.status = 1
      AND (p_store_id IS NULL OR p.store_id = p_store_id)
    GROUP BY p.store_id
  ) ap ON ap.store_id = t.store_id
  SET t.auctioned_pledge_balance = IFNULL(ap.total_amt, 0);

  -- Calculate sold pledges (status 8) for this month
  UPDATE tmp_monthly_calc t
  LEFT JOIN (
    SELECT 
      p.store_id,
      SUM(p.total_pledge_amt) AS total_amt
    FROM pledge p
    WHERE DATE(p.mark_as_sold_date) BETWEEN v_month_start AND v_month_end
      AND p.pledge_status_id = 8
      AND (p_store_id IS NULL OR p.store_id = p_store_id)
    GROUP BY p.store_id
  ) sp ON sp.store_id = t.store_id
  SET t.sold_pledge_balance = IFNULL(sp.total_amt, 0);

  -- Calculate closing balance (opening + new - redeemed - auctioned - sold)
  UPDATE tmp_monthly_calc
  SET closing_balance = opening_balance + new_pledge_balance - redeemed_pledge_balance - auctioned_pledge_balance - sold_pledge_balance;

  -- Insert monthly data into permanent table monthly_balance
  INSERT INTO monthly_balance (
    store_id, store_name, month, year, financial_year,
    opening_balance, new_pledge_balance, redeemed_pledge_balance, auctioned_pledge_balance,
    sold_pledge_balance, forfeited_pledge_balance, seized_pledge_balance, returned_pledge_balance,
    cancelled_pledge_balance, closing_balance, quantity, ujrah_fee
  )
  SELECT 
    store_id, 
    store_name, 
    p_month,
    p_year,
    v_financial_year,
    opening_balance, 
    new_pledge_balance, 
    redeemed_pledge_balance, 
    auctioned_pledge_balance,
    sold_pledge_balance,
    forfeited_pledge_balance, 
    seized_pledge_balance, 
    returned_pledge_balance,
    cancelled_pledge_balance, 
    closing_balance,
    quantity, 
    ujrah_fee
  FROM tmp_monthly_calc
  ORDER BY store_id;

  -- Cleanup
  DROP TEMPORARY TABLE IF EXISTS tmp_monthly_calc;
  
  SET v_exec_seconds = TIMESTAMPDIFF(SECOND, v_started_at, NOW());
  
  -- Mark log completed
  IF v_log_id > 0 THEN
    UPDATE procedure_log
    SET status = 'completed', 
        finished_at = NOW(), 
        duration_seconds = v_exec_seconds,
        message = CONCAT('Processed ', v_records, ' stores for ', p_year, '-', LPAD(p_month, 2, '0'))
    WHERE id = v_log_id;
  END IF;

END//
DELIMITER ;

-- Dumping structure for procedure pajakmas_db.populate_yearly_transaction_report
DELIMITER //
CREATE PROCEDURE `populate_yearly_transaction_report`(
	IN `p_store_id` INT,
	IN `p_year` INT,
	IN `p_generated_by` VARCHAR(128)
)
BEGIN
  DECLARE v_start_date DATE;
  DECLARE v_end_date DATE;
  DECLARE v_new_year INT;
  DECLARE v_new_start_date DATE;
  DECLARE v_total_pledge_amt DECIMAL(14,2) DEFAULT 0;
  DECLARE v_total_pledge_amt_ditebus DECIMAL(14,2) DEFAULT 0;
  DECLARE v_total_customers INT DEFAULT 0;
  DECLARE v_report_id INT DEFAULT 0;
  DECLARE v_cat_json TEXT;
  DECLARE v_log_id BIGINT DEFAULT 0;
  DECLARE v_sqlstate CHAR(5);
  DECLARE v_errno INT;
  DECLARE v_err_msg TEXT;
  
  -- User variables for range counts
  DECLARE v_below_200 INT DEFAULT 0;
  DECLARE v_201_500 INT DEFAULT 0;
  DECLARE v_501_1000 INT DEFAULT 0;
  DECLARE v_1001_2500 INT DEFAULT 0;
  DECLARE v_2501_5000 INT DEFAULT 0;
  DECLARE v_5001_10000 INT DEFAULT 0;

  -- Error handler: record failure into log and re-signal
  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    GET DIAGNOSTICS CONDITION 1
      v_sqlstate = RETURNED_SQLSTATE, v_errno = MYSQL_ERRNO, v_err_msg = MESSAGE_TEXT;
    IF v_log_id > 0 THEN
      UPDATE procedure_log
      SET status = 'failed',
          message = CONCAT('SQLSTATE=', v_sqlstate, ' ERRNO=', v_errno, ' MSG=', v_err_msg),
          finished_at = NOW(),
          duration_seconds = TIMESTAMPDIFF(SECOND, started_at, NOW())
      WHERE id = v_log_id;
    END IF;
    RESIGNAL;
  END;

  SET v_start_date = STR_TO_DATE(CONCAT(p_year,'-01-01'), '%Y-%m-%d');
  SET v_end_date = STR_TO_DATE(CONCAT(p_year,'-12-31'), '%Y-%m-%d');
  SET v_new_year = p_year + 1;
  SET v_new_start_date = STR_TO_DATE(CONCAT(v_new_year,'-01-01'), '%Y-%m-%d');

  -- create log entry (started)
  INSERT INTO procedure_log (procedure_name, status, message, started_at, generated_by)
  VALUES ('populate_yearly_transaction_report','started', CONCAT('Populating report for store_id=', p_store_id, ', year=', p_year), NOW(), p_generated_by);
  SET v_log_id = LAST_INSERT_ID();

  -- Delete existing race details first (due to foreign key constraint)
  DELETE rtd 
  FROM yearly_transaction_race_details rtd
  INNER JOIN yearly_transaction_report ytr ON rtd.store_id = ytr.store_id AND rtd.report_year = ytr.report_year
  WHERE ytr.store_id = p_store_id AND ytr.report_year = p_year;

  -- Delete existing report for store+year if exists
  DELETE FROM yearly_transaction_report WHERE store_id = p_store_id AND report_year = p_year;

  -- total pledge amount
  SELECT IFNULL(SUM(CASE WHEN p.pledge_status_id != 0 THEN p.total_pledge_amt ELSE 0 END),0) 
  INTO v_total_pledge_amt
  FROM pledge p
  WHERE p.store_id = p_store_id
    AND p.pledge_date >= v_start_date
    AND p.pledge_date <= v_end_date;

  -- total_pledge_amt_ditebus
  SELECT IFNULL(SUM(
      CASE 
        WHEN p.pledge_status_id = 2 AND DATE(p.redeemed_date) < v_new_start_date THEN p.total_pledge_amt
        WHEN p.pledge_status_id = 3 AND DATE(pr.renew_date) < v_new_start_date THEN p.total_pledge_amt
        WHEN p.pledge_status_id = 4 AND pjn.auction_date < v_new_start_date THEN p.total_pledge_amt
        WHEN p.pledge_status_id = 8 AND DATE(p.mark_as_sold_date) < v_new_start_date THEN p.total_pledge_amt
        WHEN p.pledge_status_id = 9 AND p.redeemed_auction_date < v_new_start_date THEN p.total_pledge_amt
        ELSE 0
      END
    ),0) 
  INTO v_total_pledge_amt_ditebus
  FROM pledge p
  LEFT JOIN pledge_renew pr ON p.pledge_id = pr.pledge_id
  LEFT JOIN pledge_jadual_n pjn ON p.pledge_id = pjn.pledge_id
  WHERE p.store_id = p_store_id
    AND p.pledge_date >= v_start_date
    AND p.pledge_date <= v_end_date;

  -- total customers
  SELECT COUNT(DISTINCT cust_id) INTO v_total_customers
  FROM pledge
  WHERE pledge_date >= v_start_date
    AND pledge_date <= v_end_date
    AND store_id = p_store_id
    AND pledge_status_id != 0;

  -- Compute range counts
  SELECT IFNULL(SUM(CASE WHEN p.total_pledge_amt <= 200 THEN 1 ELSE 0 END),0) INTO v_below_200
  FROM pledge p
  WHERE p.pledge_date >= v_start_date AND p.pledge_date <= v_end_date AND p.store_id = p_store_id AND p.pledge_status_id != 0;

  SELECT IFNULL(SUM(CASE WHEN p.total_pledge_amt BETWEEN 201 AND 500 THEN 1 ELSE 0 END),0) INTO v_201_500
  FROM pledge p
  WHERE p.pledge_date >= v_start_date AND p.pledge_date <= v_end_date AND p.store_id = p_store_id AND p.pledge_status_id != 0;

  SELECT IFNULL(SUM(CASE WHEN p.total_pledge_amt BETWEEN 501 AND 1000 THEN 1 ELSE 0 END),0) INTO v_501_1000
  FROM pledge p
  WHERE p.pledge_date >= v_start_date AND p.pledge_date <= v_end_date AND p.store_id = p_store_id AND p.pledge_status_id != 0;

  SELECT IFNULL(SUM(CASE WHEN p.total_pledge_amt BETWEEN 1001 AND 2500 THEN 1 ELSE 0 END),0) INTO v_1001_2500
  FROM pledge p
  WHERE p.pledge_date >= v_start_date AND p.pledge_date <= v_end_date AND p.store_id = p_store_id AND p.pledge_status_id != 0;

  SELECT IFNULL(SUM(CASE WHEN p.total_pledge_amt BETWEEN 2501 AND 5000 THEN 1 ELSE 0 END),0) INTO v_2501_5000
  FROM pledge p
  WHERE p.pledge_date >= v_start_date AND p.pledge_date <= v_end_date AND p.store_id = p_store_id AND p.pledge_status_id != 0;

  SELECT IFNULL(SUM(CASE WHEN p.total_pledge_amt BETWEEN 5001 AND 10000 THEN 1 ELSE 0 END),0) INTO v_5001_10000
  FROM pledge p
  WHERE p.pledge_date >= v_start_date AND p.pledge_date <= v_end_date AND p.store_id = p_store_id AND p.pledge_status_id != 0;

  -- Insert main report record and get the report_id
  INSERT INTO yearly_transaction_report(
    store_id, report_year, total_pledge_amt, total_pledge_amt_ditebus, total_pledge_amt_tidak_ditebus, total_customers,
    total_below_200, total_201_500, total_501_1000, total_1001_2500, total_2501_5000, total_5001_10000,
    category_details, generated_by
  ) VALUES (
    p_store_id, p_year, v_total_pledge_amt, v_total_pledge_amt_ditebus, v_total_pledge_amt - v_total_pledge_amt_ditebus, v_total_customers,
    v_below_200, v_201_500, v_501_1000, v_1001_2500, v_2501_5000, v_5001_10000,
    NULL, p_generated_by
  );

  -- Get the newly inserted report ID
  SET v_report_id = LAST_INSERT_ID();

  -- Insert race details into separate table
  INSERT INTO yearly_transaction_race_details (
    store_id, report_year, race_id, total_customers, percentage, total_pledge_amt, 
    total_pledge_amt_ditebus, total_pledge_amt_tidak_ditebus,
    below_200, r201_500, r501_1000, r1001_2500, r2501_5000, r5001_10000
  )
	SELECT 
	  p_store_id,
	  p_year,
	  r.race_id,
	  IFNULL(rc.total_customers,0),
	  IFNULL(ROUND((rc.total_customers / NULLIF(v_total_customers,0)) * 100,4),0),
	  IFNULL(rc.total_pledge_amt,0) AS total_pledge_amt,
	  IFNULL(rc_ditebus.total_pledge_amt_ditebus,0) AS total_pledge_amt_ditebus,
	  IFNULL(rc.total_pledge_amt,0) - IFNULL(rc_ditebus.total_pledge_amt_ditebus,0),
	  IFNULL(rc.below_200,0),
	  IFNULL(rc.r201_500,0),
	  IFNULL(rc.r501_1000,0),
	  IFNULL(rc.r1001_2500,0),
	  IFNULL(rc.r2501_5000,0),
	  IFNULL(rc.r5001_10000,0)
	FROM cust_race r
	LEFT JOIN (
	  -- Query 1: Calculate total_pledge_amt WITHOUT LEFT JOINs to avoid duplication
	  SELECT 
	    c.race_id,
	    COUNT(DISTINCT p.cust_id) AS total_customers,
	    IFNULL(SUM(p.total_pledge_amt),0) AS total_pledge_amt,
	    SUM(CASE WHEN p.total_pledge_amt <= 200 THEN 1 ELSE 0 END) AS below_200,
	    SUM(CASE WHEN p.total_pledge_amt BETWEEN 201 AND 500 THEN 1 ELSE 0 END) AS r201_500,
	    SUM(CASE WHEN p.total_pledge_amt BETWEEN 501 AND 1000 THEN 1 ELSE 0 END) AS r501_1000,
	    SUM(CASE WHEN p.total_pledge_amt BETWEEN 1001 AND 2500 THEN 1 ELSE 0 END) AS r1001_2500,
	    SUM(CASE WHEN p.total_pledge_amt BETWEEN 2501 AND 5000 THEN 1 ELSE 0 END) AS r2501_5000,
	    SUM(CASE WHEN p.total_pledge_amt BETWEEN 5001 AND 10000 THEN 1 ELSE 0 END) AS r5001_10000
	  FROM pledge p
	  JOIN customer c ON p.cust_id = c.cust_id
	  WHERE p.pledge_date >= v_start_date 
	    AND p.pledge_date <= v_end_date 
	    AND p.store_id = p_store_id 
	    AND p.pledge_status_id != 0
	  GROUP BY c.race_id
	) rc ON rc.race_id = r.race_id
	LEFT JOIN (
	  -- Query 2: Calculate total_pledge_amt_ditebus WITH LEFT JOINs (separate calculation)
	  SELECT 
	    c.race_id,
	    IFNULL(SUM(
	      CASE 
	        WHEN p.pledge_status_id = 2 AND DATE(p.redeemed_date) < v_new_start_date THEN p.total_pledge_amt
	        WHEN p.pledge_status_id = 3 AND DATE(pr.renew_date) < v_new_start_date THEN p.total_pledge_amt
	        WHEN p.pledge_status_id = 4 AND pjn.auction_date < v_new_start_date THEN p.total_pledge_amt
	        WHEN p.pledge_status_id = 8 AND DATE(p.mark_as_sold_date) < v_new_start_date THEN p.total_pledge_amt
	        WHEN p.pledge_status_id = 9 AND p.redeemed_auction_date < v_new_start_date THEN p.total_pledge_amt
	        ELSE 0
	      END
	    ),0) AS total_pledge_amt_ditebus
	  FROM pledge p
	  JOIN customer c ON p.cust_id = c.cust_id
	  LEFT JOIN pledge_renew pr ON p.pledge_id = pr.pledge_id
	  LEFT JOIN pledge_jadual_n pjn ON p.pledge_id = pjn.pledge_id
	  WHERE p.pledge_date >= v_start_date 
	    AND p.pledge_date <= v_end_date 
	    AND p.store_id = p_store_id 
	    AND p.pledge_status_id != 0
	  GROUP BY c.race_id
	) rc_ditebus ON rc_ditebus.race_id = r.race_id
	WHERE r.status = 1;

  -- Update category details
  SELECT CONCAT('[', 
           IFNULL(GROUP_CONCAT(
             CONCAT('{',
               '"category":"', REPLACE(category, '"', '\\"'), '",',
               '"total_transaction":', total_transaction, ',',
               '"quantity":', quantity, ',',
               '"cash":', total_cash,
             '}'
           ) SEPARATOR ','), ''),
         ']') INTO v_cat_json
  FROM (
    SELECT category, SUM(total_transaction) AS total_transaction, SUM(quantity) AS quantity, SUM(cash) AS total_cash FROM (
      SELECT 
        'Below or Equal 200' AS category,
        COUNT(DISTINCT p.pledge_id) AS total_transaction,
        SUM(p.total_pledge_amt) AS cash,
        SUM(p.total_qty) AS quantity
      FROM pledge p
      WHERE p.pledge_status_id = 8
        AND p.store_id = p_store_id
        AND DATE(p.mark_as_sold_date) BETWEEN v_start_date AND v_end_date
      GROUP BY category

      UNION ALL

      SELECT 
        'Above 200' AS category,
        COUNT(DISTINCT p.pledge_id) AS total_transaction,
        SUM(p.total_pledge_amt) AS cash,
        SUM(p.total_qty) AS quantity
      FROM pledge p
      JOIN pledge_jadual_n pjn ON p.pledge_id = pjn.pledge_id
      WHERE p.pledge_status_id = 4
        AND p.store_id = p_store_id
        AND pjn.auction_date BETWEEN '2025-09-01' AND v_end_date
      GROUP BY category
    ) AS combined_results
    GROUP BY category
  ) t;

  -- Update the main record with category details
  UPDATE yearly_transaction_report 
  SET category_details = v_cat_json 
  WHERE id = v_report_id;

  -- mark log completed
  IF v_log_id > 0 THEN
    UPDATE procedure_log
    SET status = 'completed', message = CONCAT('Completed report for store_id=', p_store_id, ', year=', p_year), finished_at = NOW(), duration_seconds = TIMESTAMPDIFF(SECOND, started_at, NOW())
    WHERE id = v_log_id;
  END IF;

END//
DELIMITER ;

-- Dumping structure for table pajakmas_db.procedure_log
CREATE TABLE IF NOT EXISTS `procedure_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `procedure_name` varchar(128) NOT NULL,
  `status` varchar(20) NOT NULL,
  `message` text,
  `started_at` datetime DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL,
  `duration_seconds` int(11) DEFAULT NULL,
  `generated_by` varchar(128) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4545 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.product
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_id` int(11) NOT NULL DEFAULT '0',
  `product_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pledge_percent` decimal(10,2) NOT NULL,
  `purity_percent` decimal(10,2) DEFAULT NULL,
  `purity` decimal(10,2) NOT NULL,
  `pledge_amount_limit_per_gram` decimal(10,2) DEFAULT NULL,
  `buy_rate` decimal(10,2) NOT NULL,
  `report_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `report_type2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.product_type
CREATE TABLE IF NOT EXISTS `product_type` (
  `product_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`product_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.reminder_first_call
CREATE TABLE IF NOT EXISTS `reminder_first_call` (
  `reminder_first_call_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `activate` int(11) NOT NULL,
  `first_call_remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_call_remarks_by` int(11) DEFAULT NULL,
  `first_call_remarks_date` datetime DEFAULT NULL,
  PRIMARY KEY (`reminder_first_call_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9759 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.reminder_second_letter
CREATE TABLE IF NOT EXISTS `reminder_second_letter` (
  `reminder_second_letter_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `second_letter_view` int(11) DEFAULT NULL,
  `second_letter_view_by` int(11) DEFAULT NULL,
  `second_letter_view_date` datetime DEFAULT NULL,
  PRIMARY KEY (`reminder_second_letter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1074 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.reminder_third_call
CREATE TABLE IF NOT EXISTS `reminder_third_call` (
  `reminder_third_call_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `activate` int(11) NOT NULL,
  `third_call_remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `third_call_remarks_by` int(11) DEFAULT NULL,
  `third_call_remarks_date` datetime DEFAULT NULL,
  PRIMARY KEY (`reminder_third_call_id`)
) ENGINE=InnoDB AUTO_INCREMENT=1522 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.source_of_gold
CREATE TABLE IF NOT EXISTS `source_of_gold` (
  `source_of_gold_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`source_of_gold_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.status
CREATE TABLE IF NOT EXISTS `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `store_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `company_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `company_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `store_addr` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_state_id` int(11) NOT NULL,
  `store_postal` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `store_telephone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_fax` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `message2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_status_id` int(11) NOT NULL,
  `GST_No` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reg_No` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pledge_prefix` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `current_pledge_running_no` int(11) NOT NULL,
  `pledge_receipt_prefix` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surplus_pay_prefix` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cash_trans_prefix` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cur_cash_trans_running_no` int(11) NOT NULL,
  `cash_adj_prefix` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cur_cash_adj_running_no` int(11) NOT NULL,
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `report_sort_order` int(11) DEFAULT '0',
  `report_store_code` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '',
  `is_public_gold_branch` tinyint(2) NOT NULL DEFAULT '0',
  `insurance_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `insurance_policy_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `insurance_policy_start_date` date DEFAULT NULL,
  `insurance_policy_end_date` date DEFAULT NULL,
  `interest_rate` text COLLATE utf8mb4_unicode_ci,
  `jam_tangan_interest_rate` text COLLATE utf8mb4_unicode_ci,
  `third_party_auction_commission_rate` decimal(10,2) DEFAULT NULL,
  `interest_rate_remark` varchar(225) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `use_current_month_rate_for_redemption` tinyint(4) DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  KEY `store_state_id` (`store_state_id`),
  KEY `store_status_id` (`store_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store_category_interest_rate
CREATE TABLE IF NOT EXISTS `store_category_interest_rate` (
  `store_category_interest_rate_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `interest_rate` text,
  `added_date` datetime DEFAULT NULL,
  `added_by` varchar(50) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `modified_by` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`store_category_interest_rate_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store_code
CREATE TABLE IF NOT EXISTS `store_code` (
  `store_code_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_status_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`store_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store_gender
CREATE TABLE IF NOT EXISTS `store_gender` (
  `gender_id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store_state
CREATE TABLE IF NOT EXISTS `store_state` (
  `store_state_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_state` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`store_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store_status
CREATE TABLE IF NOT EXISTS `store_status` (
  `store_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`store_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store_target
CREATE TABLE IF NOT EXISTS `store_target` (
  `store_target_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `start_target` decimal(15,2) NOT NULL DEFAULT '0.00',
  `target_quarter` int(11) NOT NULL COMMENT '1-4 for Q1-Q4',
  `target_year` int(11) NOT NULL COMMENT 'YYYY',
  `created_date` datetime DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`store_target_id`),
  UNIQUE KEY `store_quarter_year` (`store_id`,`target_quarter`,`target_year`),
  KEY `idx_store_id` (`store_id`),
  KEY `idx_target_year_quarter` (`target_year`,`target_quarter`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.store_user_logs
CREATE TABLE IF NOT EXISTS `store_user_logs` (
  `user_logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_user_id` int(11) NOT NULL DEFAULT '0',
  `store_user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_logs_created_date` datetime NOT NULL,
  PRIMARY KEY (`user_logs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=39763 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.third_party_auction_quality_price
CREATE TABLE IF NOT EXISTS `third_party_auction_quality_price` (
  `third_party_auction_quality_price_id` int(11) NOT NULL AUTO_INCREMENT,
  `third_party_auction_sheet_id` int(11) DEFAULT NULL,
  `quality_id` int(11) DEFAULT NULL,
  `price` decimal(20,2) DEFAULT NULL,
  `date_added` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `date_modified` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`third_party_auction_quality_price_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.third_party_auction_sheet
CREATE TABLE IF NOT EXISTS `third_party_auction_sheet` (
  `third_party_auction_sheet_id` int(11) NOT NULL AUTO_INCREMENT,
  `third_party_auction_sheet_running_no` int(11) NOT NULL,
  `third_party_auction_date` date NOT NULL,
  `third_party_auction_remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `gold_mks_price` double(10,2) DEFAULT NULL,
  `gold_mks_price_plus_5_percent` double(10,2) DEFAULT NULL,
  `gold_mks_price_sub_10_percent` double(10,2) DEFAULT NULL,
  `silver_mks_price` double(10,2) DEFAULT NULL,
  `silver_mks_price_plus_5_percent` double(10,2) DEFAULT NULL,
  `silver_mks_price_sub_10_percent` double(10,2) DEFAULT NULL,
  `third_party_auction_sheet_status_id` int(11) NOT NULL,
  `commision_percent` decimal(10,4) DEFAULT NULL,
  `is_confirm` tinyint(2) DEFAULT NULL,
  `confirm_by` int(11) DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` int(11) DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` int(11) DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  PRIMARY KEY (`third_party_auction_sheet_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.third_party_auction_sheet_status
CREATE TABLE IF NOT EXISTS `third_party_auction_sheet_status` (
  `third_party_auction_sheet_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `third_party_auction_sheet_status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`third_party_auction_sheet_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.third_party_pledge_auction
CREATE TABLE IF NOT EXISTS `third_party_pledge_auction` (
  `third_party_pledge_auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `third_party_auction_sheet_id` int(11) NOT NULL,
  `pledge_id` int(11) NOT NULL,
  `pledge_running_no` int(11) NOT NULL,
  `pledge_item_id` int(11) NOT NULL,
  `third_party_auction_status_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` double(10,2) NOT NULL,
  `pledge_amount` double(10,2) NOT NULL,
  `item_stg_fee_per_mth` double(10,2) NOT NULL,
  `total_of_month` double(10,2) NOT NULL,
  `total_item_stg_fee` double(10,2) NOT NULL,
  `total_amount_to_paid_by_customer` double(10,2) NOT NULL,
  `purity_percent` double(10,2) DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  `gold_mks_price` double(10,2) DEFAULT NULL,
  `silver_mks_price` double(10,2) DEFAULT NULL,
  `pgm_bid_per_gram` double(10,2) DEFAULT NULL,
  `pgm_bid_total_gram` double(10,2) DEFAULT NULL,
  `pgm_bid_diff_item_pledge_amt` double(10,2) DEFAULT NULL,
  `pgm_bid_gain_loss` double(10,2) DEFAULT NULL,
  `admin_fee` double(10,2) DEFAULT NULL,
  `actual_admin_fee` double(10,2) DEFAULT NULL,
  `actual_vs_normal` double(10,2) DEFAULT NULL,
  `excess_to_refund` double(10,2) DEFAULT NULL,
  `calculate_by` int(11) DEFAULT NULL,
  `calculate_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`third_party_pledge_auction_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.third_party_pledge_auction_delete_log
CREATE TABLE IF NOT EXISTS `third_party_pledge_auction_delete_log` (
  `third_party_pledge_auction_delete_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `third_party_auction_sheet_id` int(11) NOT NULL DEFAULT '0',
  `pledge_id` int(11) NOT NULL DEFAULT '0',
  `deleted_by` int(11) NOT NULL DEFAULT '0',
  `deleted_date` datetime NOT NULL,
  PRIMARY KEY (`third_party_pledge_auction_delete_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.yearly_transaction_race_details
CREATE TABLE IF NOT EXISTS `yearly_transaction_race_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `report_year` int(11) NOT NULL,
  `race_id` int(11) NOT NULL,
  `total_customers` int(11) DEFAULT '0',
  `percentage` decimal(8,4) DEFAULT '0.0000',
  `total_pledge_amt` decimal(14,2) DEFAULT '0.00',
  `total_pledge_amt_ditebus` decimal(14,2) DEFAULT '0.00',
  `total_pledge_amt_tidak_ditebus` decimal(14,2) DEFAULT '0.00',
  `below_200` int(11) DEFAULT '0',
  `r201_500` int(11) DEFAULT '0',
  `r501_1000` int(11) DEFAULT '0',
  `r1001_2500` int(11) DEFAULT '0',
  `r2501_5000` int(11) DEFAULT '0',
  `r5001_10000` int(11) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_store_year` (`store_id`,`report_year`),
  KEY `idx_race_id` (`race_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27935 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table pajakmas_db.yearly_transaction_report
CREATE TABLE IF NOT EXISTS `yearly_transaction_report` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) NOT NULL,
  `report_year` int(11) NOT NULL,
  `total_pledge_amt` decimal(14,2) DEFAULT '0.00',
  `total_pledge_amt_ditebus` decimal(14,2) DEFAULT '0.00',
  `total_pledge_amt_tidak_ditebus` decimal(14,2) DEFAULT '0.00',
  `total_customers` int(11) DEFAULT '0',
  `total_below_200` int(11) DEFAULT '0',
  `total_201_500` int(11) DEFAULT '0',
  `total_501_1000` int(11) DEFAULT '0',
  `total_1001_2500` int(11) DEFAULT '0',
  `total_2501_5000` int(11) DEFAULT '0',
  `total_5001_10000` int(11) DEFAULT '0',
  `category_details` text,
  `generated_by` varchar(128) DEFAULT NULL,
  `generated_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_store_year` (`store_id`,`report_year`)
) ENGINE=InnoDB AUTO_INCREMENT=3993 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
