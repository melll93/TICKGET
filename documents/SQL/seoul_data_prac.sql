select * from seoul_data;

select distinct guname from seoul_data;

select distinct codename
  from seoul_data;

select concert_no, codename, title, place, player, main_img, date, guname, org_link, use_fee
  from seoul_data
 where codename like "축제%";

select *
  from seoul_data
 where codename like "영화";

select concert_no, codename, title, place, player, main_img, date, guname, org_link, use_fee
  from seoul_data
 where codename like "축제-기타";

select concert_no, codename, title, place, player, main_img, date, guname, org_link, use_fee
  from seoul_data
 where codename like "콘서트";

ALTER TABLE seoul_data MODIFY concert_no INT NOT NULL AUTO_INCREMENT;

select CURDATE() from dual;

select *
from seoul_data
where date like CONCAT(CURDATE(),"%");

select concert_no, codename, title, place, player, main_img, date, guname, org_link, use_fee
  from seoul_data
 where date like CONCAT(CURDATE(),"%");

SELECT date FROM seoul_data;

SELECT SUBSTRING_INDEX('2023-12-05~2023-12-23','~', 1);

SELECT SUBSTRING_INDEX(
    (SELECT date FROM seoul_data),'~', 1);

select a.date
from seoul_data a,seoul_data b
where CURDATE() IN (STR_TO_DATE(SUBSTRING_INDEX(b.date,'~',1),'YYYY-MM-DD'),SUBSTRING_INDEX(b.date,'~',-1))

SELECT (STR_TO_DATE(
    (SELECT SUBSTRING_INDEX('2023-12-05~2023-12-23','~', 1)),
    '%Y-%m-%d'))

SELECT (STR_TO_DATE(
    (SELECT SUBSTRING_INDEX(b.date,'~', 1)),
    '%Y-%m-%d'))

SELECT a.date
  FROM seoul_data a,seoul_data b
 WHERE CURDATE() BETWEEN (
                          SELECT (STR_TO_DATE((SELECT SUBSTRING_INDEX(b.date,'~', 1)),
                                               '%Y-%m-%d')
                                 )
                         )
                      AND
                         (
                          SELECT (STR_TO_DATE((SELECT SUBSTRING_INDEX(b.date,'~', -1)),
                                              '%Y-%m-%d')
                                 )
                         );

SELECT date
  FROM seoul_data
 WHERE CURDATE() BETWEEN (
                          SELECT (STR_TO_DATE((SELECT SUBSTRING_INDEX(date,'~', 1)),
                                               '%Y-%m-%d')
                                 )
                         )
                     AND
                         (
                          SELECT (STR_TO_DATE((SELECT SUBSTRING_INDEX(date,'~', -1)),
                                              '%Y-%m-%d')
                                 )
                         )

SELECT concert_no, codename, title, place, player, main_img, date, guname, org_link, use_fee
          FROM seoul_data
         WHERE CURDATE() BETWEEN (SELECT (STR_TO_DATE((SELECT SUBSTRING_INDEX(date,'~', 1)),
                                                      '%Y-%m-%d')
                                          )
                                  )
                            AND
                                 (SELECT (STR_TO_DATE((SELECT SUBSTRING_INDEX(date,'~', -1)),
                                                      '%Y-%m-%d')
                                          )
                                  )

SELECT date
  FROM seoul_data

