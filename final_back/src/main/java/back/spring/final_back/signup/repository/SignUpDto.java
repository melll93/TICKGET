package back.spring.final_back.signup.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class SignUpDto {
  private int member_age;
  private String member_birth;
  // private Localdate member_birth 
  private String member_email;
  private String member_gender;
  private String member_id;
  private String memeber_tel;
  private String memeber_name;
  private String member_nickname;
}
