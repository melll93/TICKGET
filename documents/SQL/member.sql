CREATE TABLE member
(
    member_no     INT auto_increment
        PRIMARY KEY,
    domain        VARCHAR(20)  NOT NULL,
    id            VARCHAR(80)  NOT NULL,
    password      VARCHAR(20)  NOT NULL,
    name          VARCHAR(20)  NOT NULL,
    age           INT          NULL,
    birth         DATE         NOT NULL,
    email         VARCHAR(40)  NOT NULL,
    gender        VARCHAR(1)   NULL,
    mobile        VARCHAR(11)  NOT NULL,
    nickname      VARCHAR(20)  NULL,
    profile_image VARCHAR(200) NULL,
    register_date DATE         NOT NULL
);
