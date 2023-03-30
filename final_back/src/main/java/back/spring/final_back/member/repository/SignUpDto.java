package back.spring.final_back.member.repository;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class SignUpDto {
  private int member_no;
  private String member_domain;
  private String member_id;
  private String member_password;
  private String member_name;
  private int member_age;
  private Date member_birth;
  private String member_email;
  private String member_gender;
  private String member_mobile;
  private String member_nickname;
  private String member_profile_image;
  private Date member_register_date;
}
