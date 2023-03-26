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



