-- --------------------------------------------------------
-- Host:                         192.168.1.233
-- Server version:               5.7.42-0ubuntu0.18.04.1 - (Ubuntu)
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


-- Dumping database structure for kde_my
CREATE DATABASE IF NOT EXISTS `kde_my` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `kde_my`;

-- Dumping structure for table kde_my.adm_gold_rate
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
) ENGINE=InnoDB AUTO_INCREMENT=160 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.adm_user
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
) ENGINE=InnoDB AUTO_INCREMENT=360 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='HQ Users';

-- Data exporting was unselected.

-- Dumping structure for table kde_my.adm_user_access_type
CREATE TABLE IF NOT EXISTS `adm_user_access_type` (
  `adm_user_access_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT '1',
  PRIMARY KEY (`adm_user_access_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.adm_user_group
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

-- Dumping structure for table kde_my.adm_user_group_to_gap_pledge_status
CREATE TABLE IF NOT EXISTS `adm_user_group_to_gap_pledge_status` (
  `adm_user_group_id` int(11) NOT NULL,
  `gap_pledge_status_id` int(11) NOT NULL,
  `next_gap_pledge_status_id` varchar(50) NOT NULL,
  PRIMARY KEY (`adm_user_group_id`,`gap_pledge_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.adm_user_group_to_payment_slip_status
CREATE TABLE IF NOT EXISTS `adm_user_group_to_payment_slip_status` (
  `adm_user_group_id` int(11) NOT NULL,
  `payment_slip_status_id` int(11) NOT NULL,
  `next_payment_slip_status_id` varchar(50) NOT NULL,
  PRIMARY KEY (`adm_user_group_id`,`payment_slip_status_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.adm_user_logs
CREATE TABLE IF NOT EXISTS `adm_user_logs` (
  `user_logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `adm_user_id` int(11) NOT NULL DEFAULT '0',
  `adm_user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_logs_created_date` datetime NOT NULL,
  PRIMARY KEY (`user_logs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32306 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.adm_user_pass_logs
CREATE TABLE IF NOT EXISTS `adm_user_pass_logs` (
  `aup_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modified_date` datetime NOT NULL,
  PRIMARY KEY (`aup_id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.auction_balance_payment_type
CREATE TABLE IF NOT EXISTS `auction_balance_payment_type` (
  `auction_balance_payment_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`auction_balance_payment_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.auction_quality_price
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
) ENGINE=InnoDB AUTO_INCREMENT=838 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.auction_sheet
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
) ENGINE=InnoDB AUTO_INCREMENT=144 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.auction_sheet_status
CREATE TABLE IF NOT EXISTS `auction_sheet_status` (
  `auction_sheet_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`auction_sheet_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.auction_status
CREATE TABLE IF NOT EXISTS `auction_status` (
  `auction_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_status` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`auction_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.bsas
CREATE TABLE IF NOT EXISTS `bsas` (
  `bsas_id` int(11) NOT NULL AUTO_INCREMENT,
  `bsas_charge_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `total_charge` decimal(10,2) NOT NULL,
  `bsas_date` date NOT NULL,
  `status` tinyint(4) NOT NULL,
  `date_added` datetime NOT NULL,
  `added_by` int(11) NOT NULL,
  `added_user` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`bsas_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.bsas_charge
CREATE TABLE IF NOT EXISTS `bsas_charge` (
  `bsas_charge_id` int(11) NOT NULL AUTO_INCREMENT,
  `amount` decimal(10,2) NOT NULL,
  `charge` decimal(10,2) NOT NULL,
  `status` int(11) NOT NULL,
  `date_added` datetime NOT NULL,
  PRIMARY KEY (`bsas_charge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure kde_my.calc_monthly_balance
DELIMITER //
CREATE PROCEDURE `calc_monthly_balance`(
	IN `in_month` INT,
	IN `in_year` INT,
	IN `in_refresh_type` VARCHAR(30)
)
BEGIN
  DECLARE v_start DATETIME;
  DECLARE v_end DATETIME;
  DECLARE v_prev_month INT;
  DECLARE v_prev_year INT;
  DECLARE v_financial_year INT DEFAULT NULL;
  DECLARE v_log_id BIGINT DEFAULT NULL;
  DECLARE v_started_at DATETIME;
  DECLARE v_records INT DEFAULT 0;
  DECLARE v_exec_seconds INT DEFAULT 0;
  DECLARE v_refresh_type VARCHAR(30) DEFAULT 'cash_report';
  DECLARE v_err_msg TEXT DEFAULT NULL;
  DECLARE v_sqlstate CHAR(5) DEFAULT NULL;
  DECLARE v_diag_msg TEXT DEFAULT NULL;
  
  -- GAP variables declared here at the top
  DECLARE v_gap_new DECIMAL(20,2) DEFAULT 0;
  DECLARE v_gap_qty INT DEFAULT 0;
  DECLARE v_gap_redeemed DECIMAL(20,2) DEFAULT 0;
  DECLARE v_gap_ujrah_fee DECIMAL(20,2) DEFAULT 0;
  DECLARE v_gap_auctioned DECIMAL(20,2) DEFAULT 0;
  DECLARE v_gap_pgm_bid_diff DECIMAL(20,2) DEFAULT 0;
  DECLARE v_gap_excess DECIMAL(20,2) DEFAULT 0;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    -- capture SQL diagnostics where supported (MySQL 5.7+)
    GET DIAGNOSTICS CONDITION 1
      v_sqlstate = RETURNED_SQLSTATE,
      v_diag_msg = MESSAGE_TEXT;

    SET v_err_msg = CONCAT('SQLSTATE=', IFNULL(v_sqlstate, ''), ' MSG=', IFNULL(LEFT(v_diag_msg, 2000), ''), ' during calc_monthly_balance for ', in_month, '/', in_year);
    SET v_exec_seconds = TIMESTAMPDIFF(SECOND, v_started_at, NOW());
    IF v_log_id IS NOT NULL THEN
      UPDATE procedure_log
      SET status = 'failed', 
          message = v_err_msg,
          duration_seconds = v_exec_seconds, 
          finished_at = NOW() 
      WHERE id = v_log_id;
    END IF;
    DROP TEMPORARY TABLE IF EXISTS tmp_monthly_calc;
  END;

  SET v_start = STR_TO_DATE(CONCAT(in_year, '-', LPAD(in_month, 2, '00'), '-01 00:00:00'), '%Y-%m-%d %H:%i:%s');
  SET v_end = CONCAT(DATE_FORMAT(LAST_DAY(v_start), '%Y-%m-%d'), ' 23:59:59');

  IF in_refresh_type IS NOT NULL AND TRIM(in_refresh_type) <> '' THEN
    SET v_refresh_type = in_refresh_type;
  ELSE
    IF DATE_FORMAT(v_start, '%Y-%m') < DATE_FORMAT(CURDATE(), '%Y-%m') THEN
      SET v_refresh_type = 'historical_fix';
    ELSE
      SET v_refresh_type = 'monthly_balance';
    END IF;
  END IF;

  SET v_started_at = NOW();
  
  INSERT INTO procedure_log (procedure_name, status, message, started_at, generated_by, created_at)
  VALUES ('calc_monthly_balance', 'started','Calculating monthly balance', v_started_at,'system', v_started_at);
  
  SET v_log_id = LAST_INSERT_ID();

  SET v_prev_month = in_month - 1;
  SET v_prev_year = in_year;
  IF v_prev_month = 0 THEN 
    SET v_prev_month = 12; 
    SET v_prev_year = in_year - 1; 
  END IF;

  -- financial year logic: if month >= Aug (8) then FY = year+1 else FY = year
  IF in_month >= 8 THEN
    SET v_financial_year = in_year + 1;
  ELSE
    SET v_financial_year = in_year;
  END IF;

  CREATE TEMPORARY TABLE IF NOT EXISTS tmp_monthly_calc (
    store_id INT NOT NULL PRIMARY KEY,
    store_name VARCHAR(255),
    opening_balance DECIMAL(20,2) DEFAULT 0,
    new_pledge_balance DECIMAL(20,2) DEFAULT 0,
    redeemed_pledge_balance DECIMAL(20,2) DEFAULT 0,
    auctioned_pledge_balance DECIMAL(20,2) DEFAULT 0,
    forfeited_pledge_balance DECIMAL(20,2) DEFAULT 0,
    seized_pledge_balance DECIMAL(20,2) DEFAULT 0,
    returned_pledge_balance DECIMAL(20,2) DEFAULT 0,
    closing_balance DECIMAL(20,2) DEFAULT 0,
    quantity INT DEFAULT 0,
    ujrah_fee DECIMAL(20,2) DEFAULT 0,
    ujrah_lelong DECIMAL(20,2) DEFAULT 0,
    ujrah_total DECIMAL(20,2) DEFAULT 0,
    structure_fee DECIMAL(20,2) DEFAULT 0
  ) ENGINE = MEMORY;

  TRUNCATE TABLE tmp_monthly_calc;
  
  INSERT INTO tmp_monthly_calc (store_id, store_name)
  SELECT store_id, store_name FROM store
  UNION
  SELECT 0, 'GAP';

  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT store_id, closing_balance 
    FROM monthly_balance 
    WHERE month = v_prev_month AND year = v_prev_year
  ) mb ON mb.store_id = t.store_id
  SET t.opening_balance = IFNULL(mb.closing_balance, 0);

  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT p.store_id, IFNULL(SUM(p.total_pledge_amt), 0) AS sum_new, COUNT(*) AS cnt 
    FROM pledge p 
    WHERE DATE_SUB(p.approved_date, INTERVAL 5 MINUTE) BETWEEN v_start AND v_end 
      AND p.pledge_status_id <> 0
    GROUP BY p.store_id
  ) np ON np.store_id = t.store_id
  SET t.new_pledge_balance = IFNULL(np.sum_new, 0), t.quantity = IFNULL(np.cnt, 0);

  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT p.store_id, IFNULL(SUM(p.total_pledge_amt), 0) AS sum_redeem, IFNULL(SUM(p.stg_fee_balance), 0) AS sum_stg 
    FROM pledge p 
    WHERE p.redeemed_date BETWEEN v_start AND v_end 
      AND p.pledge_status_id = 2
    GROUP BY p.store_id
  ) rp ON rp.store_id = t.store_id
  SET t.redeemed_pledge_balance = t.redeemed_pledge_balance + IFNULL(rp.sum_redeem, 0), t.ujrah_fee = IFNULL(rp.sum_stg, 0);
  
  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT p.store_id, IFNULL(SUM(p.total_pledge_amt), 0) AS sum_redeem
    FROM pledge p 
    WHERE p.mark_as_police_case_date BETWEEN v_start AND v_end 
      AND p.pledge_status_id = 7
    GROUP BY p.store_id
  ) rp ON rp.store_id = t.store_id
  SET t.redeemed_pledge_balance = t.redeemed_pledge_balance + IFNULL(rp.sum_redeem, 0);

  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT p.store_id, IFNULL(SUM(pa.pledge_amount), 0) AS sum_auctioned, IFNULL(SUM(pa.pgm_bid_diff_item_pledge_amt), 0) AS sum_pgm_bid_diff, IFNULL(SUM(pa.excess_to_refund), 0) AS sum_excess 
    FROM pledge_auction pa
    JOIN pledge p ON p.pledge_id = pa.pledge_id
    WHERE pa.created_date BETWEEN v_start AND v_end 
      AND pa.auction_status_id = 1
      AND p.pledge_status_id = 4
    GROUP BY p.store_id
  ) ap ON ap.store_id = t.store_id
  SET t.auctioned_pledge_balance = IFNULL(ap.sum_auctioned, 0), t.ujrah_lelong = IFNULL(ap.sum_pgm_bid_diff, 0) - IFNULL(ap.sum_excess, 0);

  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT r.store_id, IFNULL(SUM(r.net_amt_pay), 0) AS sum_renew 
    FROM pledge_renew r 
    WHERE r.renew_date BETWEEN v_start AND v_end 
    GROUP BY r.store_id
  ) rr ON rr.store_id = t.store_id
  SET t.ujrah_fee = t.ujrah_fee + IFNULL(rr.sum_renew, 0);

  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT p.store_id, IFNULL(SUM(p.structure_fee), 0) AS sum_structure_fee_mode3
    FROM pledge p 
    WHERE p.pledge_date BETWEEN v_start AND v_end 
      AND p.structure_fee_mode = 3
      AND p.pledge_status_id != 0
    GROUP BY p.store_id
  ) sf3 ON sf3.store_id = t.store_id
  SET t.structure_fee = t.structure_fee + IFNULL(sf3.sum_structure_fee_mode3, 0);

  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT p.store_id, IFNULL(SUM(p.total_structure_fee), 0) AS sum_structure_fee_mode5
    FROM pledge p 
    WHERE p.redeemed_date BETWEEN v_start AND v_end 
      AND p.structure_fee_mode = 5
      AND p.pledge_status_id != 0
    GROUP BY p.store_id
  ) sf5 ON sf5.store_id = t.store_id
  SET t.structure_fee = t.structure_fee + IFNULL(sf5.sum_structure_fee_mode5, 0);

  -- Cash adjustments where fee_type is NULL or 'Storage Fee': subtract from ujrah_fee
  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT ca.store_id, IFNULL(SUM(ca.cash_amt_out), 0) AS sum_cash_adj 
    FROM cash_adjustment ca 
    WHERE ca.date BETWEEN v_start AND v_end 
      AND ca.cash_status_id IN (2,3)
      AND ca.cash_adj_type_id IN (2,4)
      AND (ca.fee_type IS NULL OR ca.fee_type = 'Storage Fee')
    GROUP BY ca.store_id
  ) ca ON ca.store_id = t.store_id
  SET t.ujrah_fee = t.ujrah_fee - IFNULL(ca.sum_cash_adj, 0);

  -- Cash adjustments where fee_type is 'Structure Fee': add to structure_fee
  UPDATE tmp_monthly_calc t 
  LEFT JOIN (
    SELECT ca.store_id, IFNULL(SUM(ca.cash_amt_out), 0) AS sum_cash_adj 
    FROM cash_adjustment ca 
    WHERE ca.date BETWEEN v_start AND v_end 
      AND ca.cash_status_id IN (2,3)
      AND ca.cash_adj_type_id IN (2,4)
      AND ca.fee_type = 'Structure Fee'
    GROUP BY ca.store_id
  ) ca ON ca.store_id = t.store_id
  SET t.structure_fee = t.structure_fee + IFNULL(ca.sum_cash_adj, 0);

  UPDATE tmp_monthly_calc 
  SET closing_balance = opening_balance + new_pledge_balance - redeemed_pledge_balance - auctioned_pledge_balance, 
      ujrah_total = ujrah_fee + ujrah_lelong + structure_fee;

  -- Special handling for GAP (store_id = 0) to match Cron controller logic

  -- New GAP pledges
  SELECT IFNULL(SUM(gp.total_pledge_amount),0), IFNULL(COUNT(*),0)
  INTO v_gap_new, v_gap_qty
  FROM gap_pledge gp
  WHERE gp.pledge_date BETWEEN v_start AND v_end
    AND gp.gap_pledge_status_id <> 7;

  -- Redeemed GAP pledges and ujrah fee (month-diff * total_storage_fee_per_month)
  SELECT IFNULL(SUM(gp.total_pledge_amount),0), IFNULL(SUM((TIMESTAMPDIFF(MONTH, gp.pledge_date, STR_TO_DATE(gpsh.remarks, '%Y-%m-%d')) + 1) * gp.total_storage_fee_per_month),0)
  INTO v_gap_redeemed, v_gap_ujrah_fee
  FROM gap_pledge_status_history gpsh
  JOIN gap_pledge gp ON gpsh.gap_pledge_id = gp.gap_pledge_id
  WHERE DATE(gpsh.remarks) BETWEEN DATE(v_start) AND DATE(v_end)
    AND gpsh.previous = '4' AND gpsh.current = '5'
    AND gp.gap_pledge_status_id <> '7';

  -- Auctioned GAP pledges
  SELECT IFNULL(SUM(gpa.pledge_amount),0), IFNULL(SUM(gpa.pgm_bid_diff_pledge_amount),0), IFNULL(SUM(CASE WHEN gpa.excess_to_refund > 0 THEN gpa.excess_to_refund ELSE 0 END),0)
  INTO v_gap_auctioned, v_gap_pgm_bid_diff, v_gap_excess
  FROM gap_pledge_auction gpa
  JOIN gap_auction_sheet gas ON gpa.gap_auction_sheet_id = gas.gap_auction_sheet_id
  JOIN gap_pledge gp ON gp.gap_pledge_id = gpa.gap_pledge_id
  WHERE gas.is_confirm = '1'
    AND gpa.gap_auction_status_id = '1'
    AND gp.gap_pledge_status_id = '6'
    AND DATE(gas.confirm_date) BETWEEN DATE(v_start) AND DATE(v_end);

  -- Update tmp table for GAP row (store_id = 0)
  UPDATE tmp_monthly_calc
  SET new_pledge_balance = v_gap_new,
      quantity = v_gap_qty,
      redeemed_pledge_balance = v_gap_redeemed,
      ujrah_fee = v_gap_ujrah_fee,
      auctioned_pledge_balance = v_gap_auctioned,
      ujrah_lelong = v_gap_pgm_bid_diff - v_gap_excess
  WHERE store_id = 0;

  -- Recalculate closing balance and ujrah total after GAP updates
  UPDATE tmp_monthly_calc 
  SET closing_balance = opening_balance + new_pledge_balance - redeemed_pledge_balance - auctioned_pledge_balance, 
      ujrah_total = ujrah_fee + ujrah_lelong + structure_fee;

  -- Persist into monthly_balance by deleting existing month/year rows then inserting fresh (match insert_batch behaviour)
  DELETE FROM monthly_balance WHERE month = in_month AND year = in_year;

  INSERT INTO monthly_balance (store_id, store_name, month, year, financial_year, opening_balance, new_pledge_balance, redeemed_pledge_balance, auctioned_pledge_balance, forfeited_pledge_balance, seized_pledge_balance, returned_pledge_balance, closing_balance, quantity, ujrah_fee, ujrah_lelong, ujrah_total, structure_fee)
  SELECT t.store_id, t.store_name, in_month, in_year, v_financial_year, t.opening_balance, t.new_pledge_balance, t.redeemed_pledge_balance, t.auctioned_pledge_balance, t.forfeited_pledge_balance, t.seized_pledge_balance, t.returned_pledge_balance, t.closing_balance, t.quantity, t.ujrah_fee, t.ujrah_lelong, t.ujrah_total, t.structure_fee
  FROM tmp_monthly_calc t;

  SELECT COUNT(*) INTO v_records FROM tmp_monthly_calc;
  
  DROP TEMPORARY TABLE IF EXISTS tmp_monthly_calc;
  
  SET v_exec_seconds = TIMESTAMPDIFF(SECOND, v_started_at, NOW());
  
  IF v_log_id IS NOT NULL THEN
    UPDATE procedure_log 
    SET status = 'completed', 
        message = CONCAT('Processed ', IFNULL(v_records, 0), ' records'),
        duration_seconds = v_exec_seconds, 
        finished_at = NOW() 
    WHERE id = v_log_id;
  END IF;
  
END//
DELIMITER ;

-- Dumping structure for table kde_my.cancel_pledge_redeem_log
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
  `redeem_running_no` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cancel_pledge_redeem_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cash_adjustment
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
  `fee_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
  KEY `store_id` (`store_id`),
  KEY `idx_cash_adjustment_approved_date` (`approved_date`)
) ENGINE=MyISAM AUTO_INCREMENT=15339 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cash_adjustment_type
CREATE TABLE IF NOT EXISTS `cash_adjustment_type` (
  `cash_adj_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_adj_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cash_adj_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cash_control
CREATE TABLE IF NOT EXISTS `cash_control` (
  `cash_trans_id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_trans_prefix` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `cash_trans_running_no` int(11) NOT NULL,
  `cash_trans_date` date NOT NULL,
  `store_id_from` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_id_to` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cash_trans_amt` decimal(10,2) NOT NULL DEFAULT '0.00',
  `remarks` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cash_status_id` int(11) NOT NULL,
  `transfer_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `transfer_date` datetime NOT NULL,
  `approval_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approval_date` datetime DEFAULT NULL,
  `received_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `received_date` datetime DEFAULT NULL,
  `reversed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reversed_date` datetime DEFAULT NULL,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cash_trans_id`),
  KEY `cash_status_id` (`cash_status_id`),
  KEY `idx_cash_control_received_date` (`received_date`)
) ENGINE=MyISAM AUTO_INCREMENT=8516 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cash_report_summary
CREATE TABLE IF NOT EXISTS `cash_report_summary` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `report_date` datetime NOT NULL,
  `store_id` int(11) NOT NULL,
  `transaction_type` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reference_no` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cash_in_amt` decimal(15,2) DEFAULT '0.00',
  `cash_out_amt` decimal(15,2) DEFAULT '0.00',
  `total_amount` decimal(15,2) DEFAULT '0.00',
  `fee_type` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `structure_fee` decimal(15,2) DEFAULT NULL,
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `remark3` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_date_store` (`report_date`,`store_id`),
  KEY `idx_report_date` (`report_date`),
  KEY `idx_store_id` (`store_id`),
  KEY `idx_transaction_type` (`transaction_type`),
  KEY `idx_reference_no` (`reference_no`),
  KEY `idx_crs_store_type_date_amts` (`store_id`,`transaction_type`,`report_date`,`cash_in_amt`,`cash_out_amt`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=58041571 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cash_status
CREATE TABLE IF NOT EXISTS `cash_status` (
  `cash_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `cash_status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cash_status_id`)
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.category
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

-- Dumping structure for table kde_my.country
CREATE TABLE IF NOT EXISTS `country` (
  `country_id` int(11) NOT NULL AUTO_INCREMENT,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activate` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`country_id`)
) ENGINE=MyISAM AUTO_INCREMENT=268 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.customer
CREATE TABLE IF NOT EXISTS `customer` (
  `cust_id` int(11) NOT NULL AUTO_INCREMENT,
  `type_id` int(11) NOT NULL,
  `title_id` int(11) NOT NULL,
  `cust_ic` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_name` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_addr` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_mailing_addr` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_city` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_state` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_postal` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cust_telephone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_fax` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_hp1` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_hp2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cust_dob` date DEFAULT NULL,
  `gender_id` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `race_id` int(11) DEFAULT NULL,
  `religion_id` int(11) DEFAULT NULL,
  `nationality_id` int(11) DEFAULT NULL,
  `store_id` int(11) DEFAULT NULL,
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `loan_limit` decimal(10,2) NOT NULL DEFAULT '200000.00',
  `authorize_loan_limit` decimal(10,2) NOT NULL DEFAULT '200000.00',
  `daily_cash_limit` decimal(10,2) NOT NULL DEFAULT '0.00',
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
) ENGINE=InnoDB AUTO_INCREMENT=96606 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cust_loan_limit_history
CREATE TABLE IF NOT EXISTS `cust_loan_limit_history` (
  `cust_loan_limit_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_id` int(11) NOT NULL,
  `loan_limit` double(10,2) NOT NULL,
  `authorize_loan_limit` double(10,2) NOT NULL,
  `remarks` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_by` int(11) NOT NULL,
  `created_date` datetime NOT NULL,
  PRIMARY KEY (`cust_loan_limit_history_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22158 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cust_nationality
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

-- Dumping structure for table kde_my.cust_race
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

-- Dumping structure for table kde_my.cust_religion
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

-- Dumping structure for table kde_my.cust_status
CREATE TABLE IF NOT EXISTS `cust_status` (
  `cust_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `cust_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cust_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.cust_title
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

-- Dumping structure for table kde_my.cust_type
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

-- Dumping structure for table kde_my.daily_cash_report
CREATE TABLE IF NOT EXISTS `daily_cash_report` (
  `cash_report_id` int(11) NOT NULL AUTO_INCREMENT,
  `transaction` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date` datetime NOT NULL,
  `store` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `reference_no` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `total_amount` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cash_in_amt` decimal(10,2) NOT NULL DEFAULT '0.00',
  `cash_out_amt` decimal(10,2) NOT NULL DEFAULT '0.00',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remark2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remark3` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `store_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`cash_report_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=855771 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.daily_opening_balance
CREATE TABLE IF NOT EXISTS `daily_opening_balance` (
  `opening_balance_id` int(11) NOT NULL AUTO_INCREMENT,
  `opening_balance` decimal(20,2) NOT NULL DEFAULT '0.00',
  `closing_balance` decimal(20,2) DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`opening_balance_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=126523 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for event kde_my.evt_refresh_monthly_balance_daily
DELIMITER //
CREATE EVENT `evt_refresh_monthly_balance_daily` ON SCHEDULE EVERY 1 DAY STARTS '2025-11-19 00:00:00' ON COMPLETION PRESERVE ENABLE DO BEGIN
	DECLARE v_target_date DATE;
	SET v_target_date = DATE_SUB(CURDATE(), INTERVAL 1 DAY);
	
	-- Call the procedure using yesterday's Month and Year
	CALL calc_monthly_balance(MONTH(v_target_date), YEAR(v_target_date), 'monthly_balance');
END//
DELIMITER ;

-- Dumping structure for table kde_my.gap_auction_balance_payment_type
CREATE TABLE IF NOT EXISTS `gap_auction_balance_payment_type` (
  `gap_auction_balance_payment_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`gap_auction_balance_payment_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_auction_sheet
CREATE TABLE IF NOT EXISTS `gap_auction_sheet` (
  `gap_auction_sheet_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_auction_sheet_no` int(11) NOT NULL,
  `auction_date` date NOT NULL,
  `remarks` text,
  `pgm_bid_per_gram` double(10,2) NOT NULL,
  `auction_sheet_status_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL DEFAULT '',
  `is_calculated` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0 = not calculate, 1 = calculated',
  `is_confirm` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0 = not confirm, 1 = confirm',
  `confirm_by` int(11) DEFAULT NULL,
  `confirm_date` datetime DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`gap_auction_sheet_id`),
  KEY `gap_auction_sheet_no` (`gap_auction_sheet_no`),
  KEY `auction_date` (`auction_date`),
  KEY `auction_sheet_status_id` (`auction_sheet_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge
CREATE TABLE IF NOT EXISTS `gap_pledge` (
  `gap_pledge_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_no` int(11) NOT NULL,
  `gap_pledge_status_id` int(11) NOT NULL,
  `gsap_customer_id` int(11) DEFAULT NULL,
  `customer_pgcode` varchar(50) NOT NULL,
  `customer_name` varchar(500) NOT NULL,
  `customer_ic` varchar(50) NOT NULL,
  `customer_business_unit` varchar(50) DEFAULT NULL,
  `customer_address` text,
  `customer_email` varchar(96) DEFAULT NULL,
  `customer_telephone` varchar(32) DEFAULT NULL,
  `customer_bank_code` varchar(20) NOT NULL,
  `customer_bank_name` varchar(255) NOT NULL,
  `customer_bank_account_number` varchar(50) NOT NULL,
  `customer_account_holder_name` varchar(255) NOT NULL,
  `ic_attachment` varchar(255) NOT NULL,
  `bank_attachment` varchar(255) NOT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `race` varchar(50) DEFAULT NULL,
  `nationality` varchar(50) DEFAULT NULL,
  `branch_business_unit` varchar(50) DEFAULT NULL,
  `pledge_date` date NOT NULL,
  `mature_date` date NOT NULL,
  `gap_pledge_option_id` int(11) NOT NULL,
  `redemption_month` int(11) NOT NULL,
  `total_quantity` int(11) NOT NULL,
  `total_weight` decimal(18,4) NOT NULL,
  `total_assessed_value` decimal(18,4) NOT NULL,
  `total_storage_fee_per_month` decimal(18,4) NOT NULL,
  `total_pledge_amount` decimal(18,4) NOT NULL,
  `total_storage_fee` decimal(18,4) NOT NULL,
  `total_redeem_amount` decimal(18,4) NOT NULL,
  `total_structure_fee` decimal(18,4) NOT NULL,
  `store_id` int(11) DEFAULT '0',
  `user_id` int(11) DEFAULT '0',
  `username` varchar(50) DEFAULT NULL,
  `gsap_transfer_id` int(11) DEFAULT NULL,
  `gsap_transfer_no` int(11) DEFAULT NULL,
  `transfer_customer_pgcode` varchar(50) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `company_code` varchar(5) DEFAULT NULL,
  `company_code_id` int(11) DEFAULT NULL,
  `program` varchar(50) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `branch_id` int(11) DEFAULT NULL,
  `system_remarks` text,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `is_fpx` tinyint(1) DEFAULT '0' COMMENT '0 = not fpx, 1 = fpx',
  `gram_transfer_to_kde_datetime` datetime DEFAULT NULL,
  `auction_balance_payment_date` date DEFAULT NULL,
  `auction_balance_payment_type` int(11) DEFAULT NULL,
  `auction_balance_added_date` datetime DEFAULT NULL,
  `auction_balance_added_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`),
  KEY `gap_pledge_status_id` (`gap_pledge_status_id`),
  KEY `customer_pgcode` (`customer_pgcode`),
  KEY `customer_name` (`customer_name`),
  KEY `customer_ic` (`customer_ic`),
  KEY `gsap_customer_id` (`gsap_customer_id`),
  KEY `pledge_date` (`pledge_date`),
  KEY `mature_date` (`mature_date`),
  KEY `gsap_transfer_no` (`gsap_transfer_no`),
  KEY `date_added` (`date_added`),
  KEY `date_modified` (`date_modified`)
) ENGINE=InnoDB AUTO_INCREMENT=115284 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_auction
CREATE TABLE IF NOT EXISTS `gap_pledge_auction` (
  `gap_pledge_auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_auction_sheet_id` int(11) NOT NULL,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `gap_pledge_detail_id` int(11) NOT NULL,
  `gap_auction_status_id` tinyint(2) NOT NULL DEFAULT '0' COMMENT '0 = disabled, 1 = enabled',
  `pledge_date` date NOT NULL,
  `mature_date` date NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `purity` decimal(10,2) NOT NULL DEFAULT '0.00',
  `purity_percent` decimal(18,2) NOT NULL DEFAULT '0.00',
  `quantity` int(11) NOT NULL,
  `weight` decimal(18,4) NOT NULL DEFAULT '0.0000',
  `storage_fee_per_month_percent` decimal(18,2) NOT NULL DEFAULT '0.00',
  `storage_fee_per_month` decimal(18,4) NOT NULL DEFAULT '0.0000',
  `pledge_percent` decimal(18,2) NOT NULL DEFAULT '0.00',
  `pledge_amount` decimal(18,4) NOT NULL DEFAULT '0.0000',
  `redemption_month` int(11) NOT NULL DEFAULT '0',
  `total_storage_fee_to_paid` decimal(18,4) NOT NULL DEFAULT '0.0000',
  `total_redeem_amount_to_paid` decimal(18,4) NOT NULL DEFAULT '0.0000',
  `pgm_bid_per_gram` decimal(18,4) DEFAULT NULL,
  `pgm_bid_total_gram` decimal(18,4) DEFAULT NULL,
  `pgm_bid_diff_pledge_amount` decimal(18,4) DEFAULT NULL,
  `pgm_bid_gain_loss` decimal(18,4) DEFAULT NULL,
  `admin_fee` decimal(18,4) DEFAULT NULL,
  `excess_to_refund` decimal(18,4) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`gap_pledge_auction_id`),
  KEY `gap_auction_sheet_id` (`gap_auction_sheet_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6494 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_auction_delete_log
CREATE TABLE IF NOT EXISTS `gap_pledge_auction_delete_log` (
  `gap_pledge_auction_delete_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_auction_sheet_id` int(11) NOT NULL DEFAULT '0',
  `gap_pledge_auction_id` int(11) NOT NULL DEFAULT '0',
  `deleted_by` int(11) NOT NULL DEFAULT '0',
  `deleted_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_auction_delete_log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_detail
CREATE TABLE IF NOT EXISTS `gap_pledge_detail` (
  `gap_pledge_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `product_type_id` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `purity` decimal(10,2) NOT NULL,
  `purity_percent` decimal(18,2) NOT NULL,
  `price_per_gram` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` decimal(18,4) NOT NULL,
  `assessed_value` decimal(18,4) NOT NULL,
  `storage_fee_per_month_percent` decimal(18,2) NOT NULL,
  `storage_fee_per_month` decimal(18,4) NOT NULL,
  `pledge_percent` decimal(18,2) NOT NULL,
  `pledge_amount` decimal(18,4) NOT NULL,
  `gsap_transfer_id` int(11) DEFAULT NULL,
  `gsap_transfer_detail_id` int(11) DEFAULT NULL,
  `gsap_transfer_no` int(11) DEFAULT NULL,
  `gsap_product_id` int(11) DEFAULT NULL,
  `currency_code` varchar(3) DEFAULT NULL,
  `company_code` varchar(5) DEFAULT NULL,
  `company_code_id` int(11) DEFAULT NULL,
  `program` varchar(50) DEFAULT NULL,
  `program_id` int(11) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_detail_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`)
) ENGINE=InnoDB AUTO_INCREMENT=115284 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_log
CREATE TABLE IF NOT EXISTS `gap_pledge_log` (
  `gap_pledge_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `logs` text,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_log_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`)
) ENGINE=InnoDB AUTO_INCREMENT=591688 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_mail
CREATE TABLE IF NOT EXISTS `gap_pledge_mail` (
  `gap_pledge_mail_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `gap_pledge_reminder_type_id` int(11) NOT NULL,
  `mail_count` int(11) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_mail_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`),
  KEY `reminder_type_id` (`gap_pledge_reminder_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27415 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_option
CREATE TABLE IF NOT EXISTS `gap_pledge_option` (
  `gap_pledge_option_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_code_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `redemption_month` int(11) NOT NULL,
  `storage_fee_per_month_percent` decimal(18,2) NOT NULL,
  `structure_fee_percent` decimal(18,2) NOT NULL,
  `pledge_percent` decimal(18,2) NOT NULL,
  `purity` decimal(18,2) NOT NULL,
  `purity_percent` decimal(18,2) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0',
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_option_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_payment_remark
CREATE TABLE IF NOT EXISTS `gap_pledge_payment_remark` (
  `gap_pledge_payment_remark_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_payment_slip_id` int(11) NOT NULL DEFAULT '0',
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `payment_type_id` int(11) NOT NULL,
  `credit` decimal(18,2) NOT NULL,
  `debit` decimal(18,2) NOT NULL,
  `reference_number` varchar(255) DEFAULT NULL,
  `payment_datetime` datetime NOT NULL,
  `remarks` text,
  `status` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_payment_remark_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=88421 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_payment_slip
CREATE TABLE IF NOT EXISTS `gap_pledge_payment_slip` (
  `gap_pledge_payment_slip_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `payment_type_id` int(11) NOT NULL,
  `payment_amount` decimal(10,2) NOT NULL,
  `reference_number` varchar(255) DEFAULT NULL,
  `payment_datetime` datetime NOT NULL,
  `payment_slip_status_id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `date_uploaded` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_payment_slip_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `status` (`status`),
  KEY `gap_pledge_no` (`gap_pledge_no`)
) ENGINE=InnoDB AUTO_INCREMENT=14195 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_payment_slip_status_history
CREATE TABLE IF NOT EXISTS `gap_pledge_payment_slip_status_history` (
  `gap_pledge_payment_slip_status_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_payment_slip_id` int(11) NOT NULL,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `previous` int(11) NOT NULL,
  `current` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_payment_slip_status_history_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`),
  KEY `gap_pledge_payment_slip_id` (`gap_pledge_payment_slip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14153 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_redeem_fpx_error_log
CREATE TABLE IF NOT EXISTS `gap_pledge_redeem_fpx_error_log` (
  `gap_pledge_redeem_fpx_error_log` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) DEFAULT NULL,
  `gap_pledge_no` int(11) DEFAULT NULL,
  `gsap_transfer_no` int(11) DEFAULT NULL,
  `amount` decimal(18,4) DEFAULT NULL,
  `customer_pgcode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fpx_sellerExOrderNo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `error_msg` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  PRIMARY KEY (`gap_pledge_redeem_fpx_error_log`)
) ENGINE=InnoDB AUTO_INCREMENT=1785 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_reminder_log
CREATE TABLE IF NOT EXISTS `gap_pledge_reminder_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) NOT NULL,
  `customer_pgcode` varchar(50) DEFAULT NULL,
  `gsap_customer_id` int(11) DEFAULT NULL,
  `gsap_transfer_id` int(11) DEFAULT NULL,
  `gsap_transfer_no` int(11) DEFAULT NULL,
  `pledge_date` date DEFAULT NULL,
  `mature_date` date DEFAULT NULL,
  `total_pledge_amount` decimal(18,4) DEFAULT NULL,
  `branch` varchar(50) DEFAULT NULL,
  `months_elapsed` int(11) NOT NULL,
  `sent_datetime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `api_response` longtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_reminder` (`gap_pledge_id`,`months_elapsed`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `customer_pgcode` (`customer_pgcode`),
  KEY `gsap_customer_id` (`gsap_customer_id`),
  KEY `sent_datetime` (`sent_datetime`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_reminder_type
CREATE TABLE IF NOT EXISTS `gap_pledge_reminder_type` (
  `gap_pledge_reminder_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `condition` varchar(255) NOT NULL,
  `operator` char(1) NOT NULL,
  `date_type` varchar(50) NOT NULL,
  `value` int(11) NOT NULL,
  `email_subject` varchar(50) NOT NULL,
  `email_template` varchar(50) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_reminder_type_id`),
  KEY `status` (`status`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_settlement
CREATE TABLE IF NOT EXISTS `gap_pledge_settlement` (
  `gap_pledge_settlement_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `gap_pledge_status_id` int(11) NOT NULL,
  `gsap_customer_id` int(11) DEFAULT NULL,
  `customer_pgcode` varchar(50) NOT NULL,
  `customer_name` varchar(500) NOT NULL,
  `customer_ic` varchar(50) NOT NULL,
  `customer_business_unit` varchar(50) DEFAULT NULL,
  `customer_address` text,
  `customer_email` varchar(96) DEFAULT NULL,
  `customer_telephone` varchar(32) DEFAULT NULL,
  `customer_bank_code` varchar(50) NOT NULL,
  `customer_bank_account_number` varchar(50) NOT NULL,
  `branch_business_unit` varchar(50) DEFAULT NULL,
  `pledge_date` date NOT NULL,
  `mature_date` date NOT NULL,
  `settlement_date` date NOT NULL,
  `redemption_month` int(11) NOT NULL,
  `total_quantity` int(11) NOT NULL,
  `total_weight` decimal(18,4) NOT NULL,
  `total_assessed_value` decimal(18,4) NOT NULL,
  `total_storage_fee_per_month` decimal(18,4) NOT NULL,
  `total_pledge_amount` decimal(18,4) NOT NULL,
  `total_storage_fee_to_paid` decimal(18,4) NOT NULL,
  `total_redeem_amount_to_paid` decimal(18,4) NOT NULL,
  `store_id` int(11) DEFAULT '0',
  `user_id` int(11) DEFAULT '0',
  `username` varchar(50) DEFAULT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_settlement_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`)
) ENGINE=InnoDB AUTO_INCREMENT=86159 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_settlement_detail
CREATE TABLE IF NOT EXISTS `gap_pledge_settlement_detail` (
  `gap_pledge_settlement_detail_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_settlement_id` int(11) NOT NULL,
  `gap_pledge_detail_id` int(11) NOT NULL,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `code` varchar(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `purity` decimal(10,2) NOT NULL,
  `purity_percent` decimal(18,2) NOT NULL,
  `price_per_gram` decimal(10,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` decimal(18,4) NOT NULL,
  `assessed_value` decimal(18,4) NOT NULL,
  `storage_fee_per_month_percent` decimal(18,2) NOT NULL,
  `storage_fee_per_month` decimal(18,4) NOT NULL,
  `pledge_percent` decimal(18,2) NOT NULL,
  `pledge_amount` decimal(18,4) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_settlement_detail_id`),
  KEY `gap_pledge_settlement_id` (`gap_pledge_settlement_id`)
) ENGINE=InnoDB AUTO_INCREMENT=86159 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_status
CREATE TABLE IF NOT EXISTS `gap_pledge_status` (
  `gap_pledge_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `sort` int(11) NOT NULL,
  PRIMARY KEY (`gap_pledge_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_status_history
CREATE TABLE IF NOT EXISTS `gap_pledge_status_history` (
  `gap_pledge_status_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `gap_pledge_id` int(11) NOT NULL,
  `gap_pledge_no` int(11) NOT NULL,
  `previous` int(11) NOT NULL,
  `current` int(11) NOT NULL,
  `remarks` text,
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`gap_pledge_status_history_id`),
  KEY `gap_pledge_id` (`gap_pledge_id`),
  KEY `gap_pledge_no` (`gap_pledge_no`),
  KEY `idx_gpsh_date_added` (`date_added`),
  KEY `idx_gpsh_previous_current` (`previous`,`current`)
) ENGINE=InnoDB AUTO_INCREMENT=495163 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.gap_pledge_to_gsap_transfer
CREATE TABLE IF NOT EXISTS `gap_pledge_to_gsap_transfer` (
  `gap_pledge_id` int(11) NOT NULL,
  `gsap_transfer_id` int(11) NOT NULL,
  `gsap_transfer_no` int(11) NOT NULL,
  `arrahnu_type` tinyint(4) NOT NULL DEFAULT '0',
  `date_added` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`gap_pledge_id`,`gsap_transfer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for event kde_my.generate_all_yearly_reports_event
DELIMITER //
CREATE EVENT `generate_all_yearly_reports_event` ON SCHEDULE EVERY 1 DAY STARTS '2025-12-15 00:30:00' ON COMPLETION PRESERVE ENABLE DO BEGIN
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

-- Dumping structure for table kde_my.loan_based_monthly_balance
CREATE TABLE IF NOT EXISTS `loan_based_monthly_balance` (
  `loan_based_monthly_balance_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_id` int(11) DEFAULT NULL,
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `month` tinyint(4) DEFAULT NULL,
  `year` int(11) DEFAULT NULL,
  `financial_year` int(11) DEFAULT NULL,
  `opening_balance` decimal(10,2) DEFAULT NULL,
  `new_pledge_balance` decimal(10,2) DEFAULT NULL,
  `redeemed_pledge_balance` decimal(10,2) DEFAULT NULL,
  `auctioned_pledge_balance` decimal(10,2) DEFAULT NULL,
  `forfeited_pledge_balance` decimal(10,2) DEFAULT NULL,
  `seized_pledge_balance` decimal(10,2) DEFAULT NULL,
  `returned_pledge_balance` decimal(10,2) DEFAULT NULL,
  `closing_balance` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `ujrah_fee` decimal(10,2) DEFAULT NULL,
  `ujrah_lelong` decimal(10,2) DEFAULT NULL,
  `ujrah_total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`loan_based_monthly_balance_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1188 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.loan_based_opening_balance
CREATE TABLE IF NOT EXISTS `loan_based_opening_balance` (
  `loan_based_opening_balance_id` int(11) NOT NULL AUTO_INCREMENT,
  `financial_year` int(11) NOT NULL DEFAULT '0',
  `store_id` int(11) NOT NULL DEFAULT '0',
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` decimal(10,2) NOT NULL DEFAULT '0.00',
  `is_gap` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`loan_based_opening_balance_id`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.monthly_balance
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
  `forfeited_pledge_balance` decimal(10,2) DEFAULT NULL,
  `seized_pledge_balance` decimal(10,2) DEFAULT NULL,
  `returned_pledge_balance` decimal(10,2) DEFAULT NULL,
  `closing_balance` decimal(10,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `ujrah_fee` decimal(10,2) DEFAULT NULL,
  `ujrah_lelong` decimal(10,2) DEFAULT NULL,
  `ujrah_total` decimal(10,2) DEFAULT NULL,
  `structure_fee` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`monthly_balance_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5824 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pagination
CREATE TABLE IF NOT EXISTS `pagination` (
  `pag_id` int(11) NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `per_page` int(11) NOT NULL,
  PRIMARY KEY (`pag_id`)
) ENGINE=MyISAM AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.payment_slip_status
CREATE TABLE IF NOT EXISTS `payment_slip_status` (
  `payment_slip_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `class` varchar(50) NOT NULL,
  PRIMARY KEY (`payment_slip_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.payment_type
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

-- Dumping structure for table kde_my.pledge
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
  `gross_weight` decimal(10,4) NOT NULL,
  `max_pledge` decimal(10,2) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_pledge_amt` decimal(10,2) NOT NULL,
  `bank_payment` decimal(10,2) DEFAULT '0.00',
  `cash_payment` decimal(10,2) DEFAULT '0.00',
  `total_assessed_value` decimal(10,2) NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_date` datetime NOT NULL,
  `expiry_date` date NOT NULL,
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
  `redeem_running_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_agreement_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_appendix_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_renew_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_redeem_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `auction_balance_payment_date` date DEFAULT NULL,
  `auction_balance_payment_type` int(11) DEFAULT NULL,
  `auction_balance_added_date` datetime DEFAULT NULL,
  `auction_balance_added_by` int(11) DEFAULT NULL,
  `bsas_order_id` int(11) NOT NULL DEFAULT '0',
  `bsas_status` tinyint(3) NOT NULL DEFAULT '0' COMMENT '0 = not submited,  1 = success, 2 = failed, 3 = submit success but pending process',
  `allow_bsas_cron` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = enabled bursa cron to call',
  `structure_fee_percent` decimal(10,2) NOT NULL DEFAULT '0.00',
  `structure_fee_per_mth` decimal(10,2) NOT NULL DEFAULT '0.00',
  `structure_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_structure_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `monthly_structure_fee_percent` text COLLATE utf8mb4_unicode_ci,
  `structure_fee_mode` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=Charge 6 Months, 1=Charge 6 Months When Redeem,2=Charge Monthly When Redeem,3=Charge 18 Months',
  `mark_as_police_case_date` date DEFAULT NULL,
  `mark_as_police_case_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_id`),
  KEY `cust_id` (`cust_id`),
  KEY `pledge_status_id` (`pledge_status_id`),
  KEY `idx_pledge_store` (`store_id`),
  KEY `idx_pledge_store_status` (`store_id`,`pledge_status_id`),
  KEY `idx_pledge_running_no` (`pledge_running_no`),
  KEY `idx_approved_date` (`approved_date`),
  KEY `idx_redeemed_date` (`redeemed_date`),
  KEY `idx_pledge_status_date` (`pledge_status_id`,`pledge_date`),
  KEY `idx_pledge_status_redeemed_date` (`pledge_status_id`,`redeemed_date`),
  KEY `idx_pledge_date` (`pledge_date`)
) ENGINE=InnoDB AUTO_INCREMENT=574252 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge3
CREATE TABLE IF NOT EXISTS `pledge3` (
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
  `max_pledge` decimal(10,2) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_pledge_amt` decimal(10,2) NOT NULL,
  `bank_payment` decimal(10,2) DEFAULT '0.00',
  `cash_payment` decimal(10,2) DEFAULT '0.00',
  `total_assessed_value` decimal(10,2) NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_date` datetime NOT NULL,
  `expiry_date` date NOT NULL,
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
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_agreement_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_appendix_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_renew_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_redeem_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledge_id`),
  KEY `cust_id` (`cust_id`),
  KEY `pledge_status_id` (`pledge_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=163944 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge4
CREATE TABLE IF NOT EXISTS `pledge4` (
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
  `max_pledge` decimal(10,2) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_pledge_amt` decimal(10,2) NOT NULL,
  `bank_payment` decimal(10,2) DEFAULT '0.00',
  `cash_payment` decimal(10,2) DEFAULT '0.00',
  `total_assessed_value` decimal(10,2) NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_date` datetime NOT NULL,
  `expiry_date` date NOT NULL,
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
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_agreement_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_appendix_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_renew_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_redeem_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledge_id`),
  KEY `cust_id` (`cust_id`),
  KEY `pledge_status_id` (`pledge_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=163751 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge5
CREATE TABLE IF NOT EXISTS `pledge5` (
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
  `max_pledge` decimal(10,2) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_pledge_amt` decimal(10,2) NOT NULL,
  `bank_payment` decimal(10,2) DEFAULT '0.00',
  `cash_payment` decimal(10,2) DEFAULT '0.00',
  `total_assessed_value` decimal(10,2) NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_date` datetime NOT NULL,
  `expiry_date` date NOT NULL,
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
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_agreement_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_appendix_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_renew_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_redeem_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledge_id`),
  KEY `cust_id` (`cust_id`),
  KEY `pledge_status_id` (`pledge_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=163944 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_auction
CREATE TABLE IF NOT EXISTS `pledge_auction` (
  `pledge_auction_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_id` int(11) NOT NULL,
  `pledge_id` int(11) NOT NULL,
  `pledge_running_no` int(11) NOT NULL,
  `pledge_item_id` int(11) NOT NULL,
  `auction_status_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` double(10,3) NOT NULL,
  `pledge_amount` double(10,2) NOT NULL,
  `item_stg_fee_per_mth` double(10,2) DEFAULT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=35216 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_auction_delete_log
CREATE TABLE IF NOT EXISTS `pledge_auction_delete_log` (
  `pledge_auction_delete_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `auction_sheet_id` int(11) NOT NULL DEFAULT '0',
  `pledge_id` int(11) NOT NULL DEFAULT '0',
  `deleted_by` int(11) NOT NULL DEFAULT '0',
  `deleted_date` datetime NOT NULL,
  PRIMARY KEY (`pledge_auction_delete_log_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_history
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
  `cust_addr` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remarks` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `store_id` int(11) NOT NULL,
  `pledge_status_id` int(11) NOT NULL,
  `gross_weight` decimal(10,2) NOT NULL,
  `max_pledge` decimal(10,2) NOT NULL,
  `total_qty` int(11) NOT NULL,
  `total_pledge_amt` decimal(10,2) NOT NULL,
  `bank_payment` decimal(10,2) DEFAULT '0.00',
  `cash_payment` decimal(10,2) DEFAULT '0.00',
  `total_assessed_value` decimal(10,2) NOT NULL,
  `approved_by` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `approved_date` datetime NOT NULL,
  `expiry_date` date NOT NULL,
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
  `redeem_running_no` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `is_agreement_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_appendix_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `auction_balance_payment_date` date DEFAULT NULL,
  `auction_balance_payment_type` int(11) DEFAULT NULL,
  `auction_balance_added_date` datetime DEFAULT NULL,
  `auction_balance_added_by` int(11) DEFAULT NULL,
  `is_renew_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `is_redeem_invoice_print` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0 = not print yet, 1 = printed',
  `bsas_order_id` int(11) NOT NULL DEFAULT '0',
  `bsas_status` tinyint(1) NOT NULL DEFAULT '0',
  `allow_bsas_cron` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1 = enabled bursa cron to call',
  `structure_fee_percent` decimal(10,2) NOT NULL DEFAULT '0.00',
  `structure_fee_per_mth` decimal(10,2) NOT NULL DEFAULT '0.00',
  `structure_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_structure_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `monthly_structure_fee_percent` text COLLATE utf8mb4_unicode_ci,
  `structure_fee_mode` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=Charge 6 Months, 1=Charge 6 Months When Redeem,2=Charge Monthly When Redeem,3=Charge 18 Months',
  `mark_as_police_case_date` date DEFAULT NULL,
  `mark_as_police_case_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_hist_id`),
  KEY `cust_id` (`cust_id`),
  KEY `pledge_status_id` (`pledge_status_id`),
  KEY `pledge_id` (`pledge_id`)
) ENGINE=InnoDB AUTO_INCREMENT=573229 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_item
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
  `assessed_value` decimal(10,2) NOT NULL,
  `pledge_percent` decimal(10,2) NOT NULL,
  `pledge_amt` decimal(10,2) NOT NULL,
  `item_stg_fee` decimal(10,2) NOT NULL,
  `modified_by` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_item_id`),
  KEY `pledge_id` (`pledge_id`),
  KEY `product_id` (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `quality_id` (`quality_id`)
) ENGINE=InnoDB AUTO_INCREMENT=673778 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_item_history
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
) ENGINE=InnoDB AUTO_INCREMENT=673778 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_item_remark
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_mark_as_police_case_log
CREATE TABLE IF NOT EXISTS `pledge_mark_as_police_case_log` (
  `pledge_mark_as_police_case_log_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `old_pledge_status` int(11) DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  PRIMARY KEY (`pledge_mark_as_police_case_log_id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_quality
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

-- Dumping structure for table kde_my.pledge_redeem_bank_slip
CREATE TABLE IF NOT EXISTS `pledge_redeem_bank_slip` (
  `pledge_redeem_bank_slip_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `pledge_redeem_history_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pathway` varchar(252) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attachment_type` int(11) DEFAULT '1' COMMENT '1 = image, 2 = pdf',
  `status` tinyint(1) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_redeem_bank_slip_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27270 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_redeem_history
CREATE TABLE IF NOT EXISTS `pledge_redeem_history` (
  `pledge_redeem_history_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) DEFAULT NULL,
  `redeem_cash_payment` decimal(10,2) DEFAULT NULL,
  `redeem_bank_payment` decimal(10,2) DEFAULT NULL,
  `redeem_remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redeemed_by` int(11) DEFAULT NULL,
  `redeemed_date` datetime DEFAULT NULL,
  `status` int(11) DEFAULT '0' COMMENT '0 = pending, 1 = approved',
  `approved_date` datetime DEFAULT NULL,
  `approved_by` int(11) DEFAULT NULL,
  `rejected_date` datetime DEFAULT NULL,
  `rejected_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_redeem_history_id`)
) ENGINE=InnoDB AUTO_INCREMENT=371745 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_renew
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
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`pledge_renew_id`),
  KEY `idx_renew_date` (`renew_date`)
) ENGINE=InnoDB AUTO_INCREMENT=8384 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_renew_bank_slip
CREATE TABLE IF NOT EXISTS `pledge_renew_bank_slip` (
  `pledge_renew_bank_slip_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `pledge_renew_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pathway` varchar(252) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `attachment_type` int(11) DEFAULT '1' COMMENT '1 = image, 2 = pdf',
  `status` tinyint(1) DEFAULT NULL,
  `date_added` datetime DEFAULT NULL,
  `added_by` int(11) DEFAULT NULL,
  PRIMARY KEY (`pledge_renew_bank_slip_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.pledge_status
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure kde_my.populate_yearly_transaction_report
DELIMITER //
CREATE PROCEDURE `populate_yearly_transaction_report`(
  IN p_store_id INT,
  IN p_year INT,
  IN p_generated_by VARCHAR(128)
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
  DECLARE v_pledge_count INT DEFAULT 0;
  
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

  -- Check if there are any pledges for this store and year with pledge_status_id != 0
  SELECT COUNT(*) INTO v_pledge_count
  FROM pledge
  WHERE store_id = p_store_id
    AND pledge_date >= v_start_date
    AND pledge_date <= v_end_date
    AND pledge_status_id != 0;

  -- If pledges found, proceed with creating the report
  IF v_pledge_count > 0 THEN

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
        ELSE 0
      END
    ),0) 
  INTO v_total_pledge_amt_ditebus
  FROM pledge p
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
    IFNULL(rc.total_pledge_amt,0),
    IFNULL(rc.total_pledge_amt_ditebus,0),
    IFNULL(rc.total_pledge_amt,0) - IFNULL(rc.total_pledge_amt_ditebus,0),
    IFNULL(rc.below_200,0),
    IFNULL(rc.r201_500,0),
    IFNULL(rc.r501_1000,0),
    IFNULL(rc.r1001_2500,0),
    IFNULL(rc.r2501_5000,0),
    IFNULL(rc.r5001_10000,0)
  FROM cust_race r
  LEFT JOIN (
    SELECT c.race_id,
      COUNT(DISTINCT p.cust_id) AS total_customers,
      IFNULL(SUM(p.total_pledge_amt),0) AS total_pledge_amt,
      IFNULL(SUM(CASE WHEN p.pledge_status_id = 2 AND DATE(p.redeemed_date) < v_new_start_date THEN p.total_pledge_amt
        ELSE 0 END),0) AS total_pledge_amt_ditebus,
      SUM(CASE WHEN p.total_pledge_amt <= 200 THEN 1 ELSE 0 END) AS below_200,
      SUM(CASE WHEN p.total_pledge_amt BETWEEN 201 AND 500 THEN 1 ELSE 0 END) AS r201_500,
      SUM(CASE WHEN p.total_pledge_amt BETWEEN 501 AND 1000 THEN 1 ELSE 0 END) AS r501_1000,
      SUM(CASE WHEN p.total_pledge_amt BETWEEN 1001 AND 2500 THEN 1 ELSE 0 END) AS r1001_2500,
      SUM(CASE WHEN p.total_pledge_amt BETWEEN 2501 AND 5000 THEN 1 ELSE 0 END) AS r2501_5000,
      SUM(CASE WHEN p.total_pledge_amt BETWEEN 5001 AND 10000 THEN 1 ELSE 0 END) AS r5001_10000
    FROM pledge p
    JOIN customer c ON p.cust_id = c.cust_id
    WHERE p.pledge_date >= v_start_date AND p.pledge_date <= v_end_date AND p.store_id = p_store_id AND p.pledge_status_id != 0
    GROUP BY c.race_id
  ) rc ON rc.race_id = r.race_id
  WHERE r.status = 1;

  -- mark log completed
  IF v_log_id > 0 THEN
    UPDATE procedure_log
    SET status = 'completed', message = CONCAT('Completed report for store_id=', p_store_id, ', year=', p_year), finished_at = NOW(), duration_seconds = TIMESTAMPDIFF(SECOND, started_at, NOW())
    WHERE id = v_log_id;
  END IF;

  END IF;

END//
DELIMITER ;

-- Dumping structure for table kde_my.procedure_log
CREATE TABLE IF NOT EXISTS `procedure_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `procedure_name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `message` text COLLATE utf8mb4_unicode_ci,
  `started_at` datetime DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL,
  `duration_seconds` int(11) DEFAULT NULL,
  `generated_by` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7660 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.product
CREATE TABLE IF NOT EXISTS `product` (
  `product_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_id` int(11) NOT NULL DEFAULT '0',
  `product_type` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `desc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `desc2` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `pledge_percent` decimal(10,2) NOT NULL,
  `purity_percent` decimal(10,2) DEFAULT NULL,
  `purity` decimal(10,2) NOT NULL,
  `assessed_value_limit_per_gram` decimal(10,2) DEFAULT NULL,
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

-- Dumping structure for table kde_my.product_type
CREATE TABLE IF NOT EXISTS `product_type` (
  `product_type_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_type_name` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`product_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure kde_my.RefreshCashReportSummary
DELIMITER //
CREATE PROCEDURE `RefreshCashReportSummary`(
	IN `p_start_date` DATE,
	IN `p_end_date` DATE
)
BEGIN
    DECLARE v_log_id BIGINT;
    DECLARE v_record_count INT DEFAULT 0;
    DECLARE v_start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

    -- Error Handler
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Log error to procedure_log
        UPDATE procedure_log 
        SET status = 'failed',
            message = 'SQL Exception occurred during cash report refresh',
            finished_at = CURRENT_TIMESTAMP,
            duration_seconds = TIMESTAMPDIFF(SECOND, v_start_time, CURRENT_TIMESTAMP)
        WHERE id = v_log_id;
        RESIGNAL;
    END;
    
    -- Log start into procedure_log
    INSERT INTO procedure_log (
        procedure_name, 
        status, 
        started_at, 
        generated_by
    )
    VALUES (
        'refresh_cash_report', 
        'running', 
        v_start_time, 
        'system'
    );
    SET v_log_id = LAST_INSERT_ID();
    
    -- Delete existing records in date range
    IF p_start_date IS NULL OR p_end_date IS NULL THEN
        DELETE FROM cash_report_summary;
    ELSE
        DELETE FROM cash_report_summary 
        WHERE DATE(report_date) BETWEEN p_start_date AND p_end_date;
    END IF;
    
    -- Insert Cash Transfer IN records
    INSERT INTO cash_report_summary (
        report_date, store_id, transaction_type, reference_no,
        cash_in_amt, cash_out_amt, total_amount, fee_type, remark, remark2, remark3
    )
    SELECT 
        cc.received_date,
        cc.store_id_to,
        'Cash Transfer - IN',
        CONCAT(cc.cash_trans_prefix, '-', cc.cash_trans_running_no),
        cc.cash_trans_amt,
        0.00,
        0.00,
        NULL,
        '',
        '',
        cc.remarks
    FROM cash_control cc
    WHERE DATE(cc.received_date) BETWEEN p_start_date AND p_end_date
    AND cc.cash_status_id = 3;
    
    SET v_record_count = v_record_count + ROW_COUNT();
    
    -- Insert Cash Transfer OUT records
    INSERT INTO cash_report_summary (
        report_date, store_id, transaction_type, reference_no,
        cash_in_amt, cash_out_amt, total_amount, fee_type, remark, remark2, remark3
    )
    SELECT 
        cc.received_date,
        cc.store_id_from,
        'Cash Transfer - OUT',
        CONCAT(cc.cash_trans_prefix, '-', cc.cash_trans_running_no),
        0.00,
        cc.cash_trans_amt,
        0.00,
        NULL,
        '',
        '',
        cc.remarks
    FROM cash_control cc
    WHERE DATE(cc.received_date) BETWEEN p_start_date AND p_end_date
    AND cc.cash_status_id = 3;
    
    SET v_record_count = v_record_count + ROW_COUNT();
    
    -- Insert Cash Adjustments
    INSERT INTO cash_report_summary (
        report_date, store_id, transaction_type, reference_no,
        cash_in_amt, cash_out_amt, total_amount, fee_type, remark, remark2, remark3
    )
    SELECT 
        ca.approved_date,
        ca.store_id,
        CASE ca.cash_adj_type_id
            WHEN 1 THEN 'Adjustment - Cash IN'
            WHEN 2 THEN 'Adjustment - Cash OUT'
            WHEN 3 THEN 'Adjustment - Bank IN'
            WHEN 4 THEN 'Adjustment - Bank OUT'
            ELSE 'Adjustment - Unknown'
        END,
        CONCAT(ca.cash_adj_prefix, '-', ca.cash_adj_running_no),
        CASE WHEN ca.cash_adj_type_id = 1 THEN ca.cash_amt_in ELSE 0.00 END,
        CASE WHEN ca.cash_adj_type_id IN (1, 2) THEN ca.cash_amt_out ELSE 0.00 END,
        0.00,
        ca.fee_type,
        CASE 
            WHEN ca.cash_adj_type_id = 3 THEN CONCAT('Bank IN - ', ca.cash_amt_in)
            WHEN ca.cash_adj_type_id = 4 THEN CONCAT('Bank OUT - ', ca.cash_amt_out)
            ELSE ''
        END,
        CASE 
            WHEN ca.cash_adj_type_id = 1 THEN CONCAT('Cash IN - ', ca.cash_amt_in)
            WHEN ca.cash_adj_type_id = 2 THEN CONCAT('Cash OUT - ', ca.cash_amt_out)
            ELSE ''
        END,
        ca.remarks
    FROM cash_adjustment ca
    WHERE DATE(ca.approved_date) BETWEEN p_start_date AND p_end_date
    AND ca.cash_status_id = 2;
    
    SET v_record_count = v_record_count + ROW_COUNT();
    
    -- Insert New Pledges
    INSERT INTO cash_report_summary (
        report_date, store_id, transaction_type, reference_no,
        cash_in_amt, cash_out_amt, total_amount, fee_type, remark, remark2, remark3
    )
    SELECT 
        p.approved_date,
        p.store_id,
        'Pledge - New',
        CONCAT(p.pledge_prefix, '-', p.pledge_running_no),
        0.00,
        p.cash_payment,
        p.total_pledge_amt,
        NULL,
        CONCAT('Bank Payment - ', p.bank_payment),
        CONCAT('Cash Payment - ', p.cash_payment),
        p.remarks
    FROM pledge p
    WHERE DATE(p.approved_date) BETWEEN p_start_date AND p_end_date
    AND p.pledge_status_id != 0;
    
    SET v_record_count = v_record_count + ROW_COUNT();
    
    -- Insert Redeemed Pledges
    INSERT INTO cash_report_summary (
        report_date, store_id, transaction_type, reference_no,
        cash_in_amt, cash_out_amt, total_amount, structure_fee, remark, remark2, remark3
    )
		SELECT 
		    p.redeemed_date,
		    p.store_id,
		    'Pledge - Redeem',
		    CONCAT(p.pledge_prefix, '-', p.pledge_running_no),
		    p.redeem_cash_payment,
		    0.00,
		    p.net_amt_to_redeem,
		    -- Dynamic structure fee logic using CASE
		    CASE 
		        WHEN p.structure_fee_mode = 5 THEN p.total_structure_fee
		        ELSE 0.00 -- Replace 0.00 with p.some_other_column if needed when mode is not 0
		    END,
		    CONCAT('Bank Payment - ', COALESCE(p.redeem_bank_payment, 0)),
		    CONCAT('Cash Payment - ', p.redeem_cash_payment),
		    p.redeem_remark
		FROM pledge p
		WHERE p.redeemed_date IS NOT NULL
		AND DATE(p.redeemed_date) BETWEEN p_start_date AND p_end_date
		AND p.pledge_status_id = 2;
    
    SET v_record_count = v_record_count + ROW_COUNT();
    
    -- Insert Renewed Pledges
    INSERT INTO cash_report_summary (
        report_date, store_id, transaction_type, reference_no,
        cash_in_amt, cash_out_amt, total_amount, fee_type, remark, remark2, remark3
    )
    SELECT 
        pr.renew_date,
        pr.store_id,
        'Pledge - Renew',
        CONCAT(p.pledge_prefix, '-', p.pledge_running_no),
        pr.renew_cash_payment,
        0.00,
        pr.net_amt_pay,
        NULL,
        CONCAT('Bank Payment - ', COALESCE(pr.renew_bank_payment, 0)),
        CONCAT('Cash Payment - ', pr.renew_cash_payment),
        pr.renew_remark
    FROM pledge_renew pr
    INNER JOIN pledge p ON p.pledge_id = pr.pledge_id
    WHERE pr.renew_date IS NOT NULL
    AND DATE(pr.renew_date) BETWEEN p_start_date AND p_end_date
    AND p.pledge_status_id NOT IN (0, 1);
    
    SET v_record_count = v_record_count + ROW_COUNT();
    
    -- Log completion
    UPDATE procedure_log 
    SET status = 'completed',
        message = CONCAT('Processed ', v_record_count, ' records.'),
        finished_at = CURRENT_TIMESTAMP,
        duration_seconds = TIMESTAMPDIFF(SECOND, v_start_time, CURRENT_TIMESTAMP)
    WHERE id = v_log_id;
    
END//
DELIMITER ;

-- Dumping structure for procedure kde_my.RefreshCashReportSummaryPledgesOnly
DELIMITER //
CREATE PROCEDURE `RefreshCashReportSummaryPledgesOnly`(
    IN p_start_date DATE,
    IN p_end_date DATE
)
BEGIN
    DECLARE v_log_id BIGINT;
    DECLARE v_record_count INT DEFAULT 0;
    DECLARE v_start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

    -- Error Handler
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Log error to procedure_log
        UPDATE procedure_log 
        SET status = 'failed',
            message = 'SQL Exception occurred during pledge refresh',
            finished_at = CURRENT_TIMESTAMP,
            duration_seconds = TIMESTAMPDIFF(SECOND, v_start_time, CURRENT_TIMESTAMP)
        WHERE id = v_log_id;
        RESIGNAL;
    END;
    
    -- Log start into procedure_log
    INSERT INTO procedure_log (
        procedure_name, 
        status, 
        started_at
    )
    VALUES (
        'RefreshCashReportSummaryPledgesOnly', 
        'running', 
        v_start_time
    );
    SET v_log_id = LAST_INSERT_ID();
    
    -- Delete only Pledge - New records in date range (most frequently edited)
    DELETE FROM cash_report_summary 
    WHERE transaction_type = 'Pledge - New'
    AND DATE(report_date) BETWEEN p_start_date AND p_end_date;
    
    -- Insert only New Pledges (the part that changes most)
    INSERT INTO cash_report_summary (
        report_date, store_id, transaction_type, reference_no,
        cash_in_amt, cash_out_amt, total_amount, fee_type, remark, remark2, remark3
    )
    SELECT 
        p.approved_date,
        p.store_id,
        'Pledge - New',
        CONCAT(p.pledge_prefix, '-', p.pledge_running_no),
        0.00,
        p.cash_payment,
        p.total_pledge_amt,
        NULL,
        CONCAT('Bank Payment - ', p.bank_payment),
        CONCAT('Cash Payment - ', p.cash_payment),
        p.remarks
    FROM pledge p
    WHERE DATE(p.approved_date) BETWEEN p_start_date AND p_end_date
    AND p.pledge_status_id != 0;
    
    SET v_record_count = ROW_COUNT();
    
    -- Log completion
    UPDATE procedure_log 
    SET status = 'completed',
        message = CONCAT('Processed ', v_record_count, ' pledge records.'),
        finished_at = CURRENT_TIMESTAMP,
        duration_seconds = TIMESTAMPDIFF(SECOND, v_start_time, CURRENT_TIMESTAMP)
    WHERE id = v_log_id;
    
END//
DELIMITER ;

-- Dumping structure for event kde_my.refresh_recent_summaries
DELIMITER //
CREATE EVENT `refresh_recent_summaries` ON SCHEDULE EVERY 1 DAY STARTS '2025-11-03 00:00:00' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Daily refresh of cash report summary for recent data' DO BEGIN
    DECLARE v_start_date DATE;
    DECLARE v_end_date   DATE;
    DECLARE v_snap_date  DATE;

    SET v_start_date = DATE_SUB(CURDATE(), INTERVAL 8 MONTH);
    SET v_end_date   = CURDATE();

    CALL RefreshCashReportSummary(v_start_date, v_end_date);
END//
DELIMITER ;

-- Dumping structure for table kde_my.reminder_first_call
CREATE TABLE IF NOT EXISTS `reminder_first_call` (
  `reminder_first_call_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `activate` int(11) NOT NULL,
  `first_call_remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_call_remarks_by` int(11) DEFAULT NULL,
  `first_call_remarks_date` datetime DEFAULT NULL,
  PRIMARY KEY (`reminder_first_call_id`)
) ENGINE=InnoDB AUTO_INCREMENT=59464 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.reminder_second_letter
CREATE TABLE IF NOT EXISTS `reminder_second_letter` (
  `reminder_second_letter_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `second_letter_view` int(11) DEFAULT NULL,
  `second_letter_view_by` int(11) DEFAULT NULL,
  `second_letter_view_date` datetime DEFAULT NULL,
  PRIMARY KEY (`reminder_second_letter_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5903 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.reminder_third_call
CREATE TABLE IF NOT EXISTS `reminder_third_call` (
  `reminder_third_call_id` int(11) NOT NULL AUTO_INCREMENT,
  `pledge_id` int(11) NOT NULL,
  `activate` int(11) NOT NULL,
  `third_call_remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `third_call_remarks_by` int(11) DEFAULT NULL,
  `third_call_remarks_date` datetime DEFAULT NULL,
  PRIMARY KEY (`reminder_third_call_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9666 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for procedure kde_my.RunCashReport
DELIMITER //
CREATE PROCEDURE `RunCashReport`()
BEGIN
    DECLARE v_start_date DATE;
    DECLARE v_end_date DATE;
    
    SET v_start_date = DATE_SUB(CURDATE(), INTERVAL 8 MONTH);
    SET v_end_date = CURDATE();
    
    CALL RefreshCashReportSummary(v_start_date, v_end_date);
END//
DELIMITER ;

-- Dumping structure for table kde_my.status
CREATE TABLE IF NOT EXISTS `status` (
  `status_id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.store
CREATE TABLE IF NOT EXISTS `store` (
  `store_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `company_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `store_addr` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `cur_pledge_redeem_running_no_year` year(4) NOT NULL,
  `cur_pledge_redeem_running_no` int(11) NOT NULL DEFAULT '0',
  `created_by` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_date` datetime NOT NULL,
  `modified_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `modified_date` datetime DEFAULT NULL,
  `deleted_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_date` datetime DEFAULT NULL,
  `report_sort_order` int(11) DEFAULT NULL,
  `report_store_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `structure_fee_percent` decimal(10,2) NOT NULL DEFAULT '0.00',
  `monthly_structure_fee_percent` text COLLATE utf8mb4_unicode_ci,
  `structure_fee_mode` tinyint(4) NOT NULL DEFAULT '5' COMMENT '0=Charge 6 Months, 1=Charge 6 Months When Redeem,2=Charge Monthly When Redeem,3=Charge 18 Months',
  `is_public_gold_branch` tinyint(2) NOT NULL DEFAULT '0',
  `is_sync_dashboard` tinyint(1) NOT NULL DEFAULT '0',
  `opening_date` date DEFAULT NULL,
  PRIMARY KEY (`store_id`),
  KEY `store_state_id` (`store_state_id`),
  KEY `store_status_id` (`store_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.store_code
CREATE TABLE IF NOT EXISTS `store_code` (
  `store_code_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `store_status_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`store_code_id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.store_gender
CREATE TABLE IF NOT EXISTS `store_gender` (
  `gender_id` int(11) NOT NULL AUTO_INCREMENT,
  `gender` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`gender_id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.store_state
CREATE TABLE IF NOT EXISTS `store_state` (
  `store_state_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_state` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`store_state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.store_status
CREATE TABLE IF NOT EXISTS `store_status` (
  `store_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`store_status_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.store_target
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
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.store_user_logs
CREATE TABLE IF NOT EXISTS `store_user_logs` (
  `user_logs_id` int(11) NOT NULL AUTO_INCREMENT,
  `store_user_id` int(11) NOT NULL DEFAULT '0',
  `store_user_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `remarks` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_logs_created_date` datetime NOT NULL,
  PRIMARY KEY (`user_logs_id`)
) ENGINE=InnoDB AUTO_INCREMENT=358493 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.summary_refresh_log
CREATE TABLE IF NOT EXISTS `summary_refresh_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `refresh_type` enum('cash_report','historical_fix','monthly_balance') COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `status` enum('running','completed','failed') COLLATE utf8mb4_unicode_ci DEFAULT 'running',
  `records_processed` int(11) DEFAULT '0',
  `error_message` text COLLATE utf8mb4_unicode_ci,
  `execution_time_seconds` int(11) DEFAULT '0',
  `started_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `completed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_refresh_type` (`refresh_type`),
  KEY `idx_status` (`status`),
  KEY `idx_started_at` (`started_at`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.yearly_transaction_race_details
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
) ENGINE=InnoDB AUTO_INCREMENT=47857 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.

-- Dumping structure for table kde_my.yearly_transaction_report
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
) ENGINE=InnoDB AUTO_INCREMENT=6838 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
