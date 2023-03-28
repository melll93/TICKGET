package back.spring.final_back.signup.repository;

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
  private String domain;
  private String id;
  private String password;
  private String name;
  private int age;
  private Date birth;
  private String email;
  private String gender;
  private String mobile;
  private String nickname;
  private String profile_image;
  private Date register_date;
}
