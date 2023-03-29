CREATE TABLE `fest_main` (
	`fest_m_id`	VARCHAR(20)	NOT NULL,
	`fest_m_name`	VARCHAR(255)	NOT NULL,
	`fest_m_start`	DATE	NULL,
	`fest_m_end`	DATE	NULL,
	`fest_m_loc`	VARCHAR(40)	NULL,
	`fest_m_img`	VARCHAR(255)	NULL,
	`fest_m_genre`	VARCHAR(40)	NULL,
	`fest_m_area`	VARCHAR(10)	NULL
);

CREATE TABLE `fest_detail` (
	`fest_m_id`	VARCHAR(20)	NOT NULL,
	`fest_dt_casting`	VARCHAR(255)	NULL,
	`fest_dt_crew`	VARCHAR(255)	NULL,
	`fest_dt_runtime`	VARCHAR(20)	NULL,
	`fest_dt_age`	VARCHAR(40)	NULL,
	`fest_dt_enter`	VARCHAR(255)	NULL,
	`fest_dt_poster`	VARCHAR(255)	NULL
);

CREATE TABLE `fest_ticket` (
	`fest_m_id`	VARCHAR(20)	NOT NULL,
	`fest_tc_date`	DATE	NULL,
	`fest_tc_time`	TIME	NULL,
	`fest_tc_type`	VARCHAR(40)	NULL,
	`fest_tc_price`	INT	NULL,
	`fest_tc_available`	SMALLINT	NULL,
	`fest_tc_seats`	SMALLINT	NULL
);

ALTER TABLE `fest_main` ADD CONSTRAINT `PK_FEST_MAIN` PRIMARY KEY (
	`fest_m_id`
);

ALTER TABLE `fest_detail` ADD CONSTRAINT `PK_FEST_DETAIL` PRIMARY KEY (
	`fest_m_id`
);

ALTER TABLE `fest_ticket` ADD CONSTRAINT `PK_FEST_TICKET` PRIMARY KEY (
	`fest_m_id`
);

ALTER TABLE `fest_detail` ADD CONSTRAINT `FK_fest_main_TO_fest_detail_1` FOREIGN KEY (
	`fest_m_id`
)
REFERENCES `fest_main` (
	`fest_m_id`
);

ALTER TABLE `fest_ticket` ADD CONSTRAINT `FK_fest_main_TO_fest_ticket_1` FOREIGN KEY (
	`fest_m_id`
)
REFERENCES `fest_main` (
	`fest_m_id`
);

