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
  private int memberNo;
  private String memberDomain;
  private String memberId;
  private String memberPassword;
  private String memberName;
  private int memberAge;
  private Date memberBirth;
  private String memberEmail;
  private String memberGender;
  private String memberMobile;
  private String memberNickname;
  private String memberProfileImage;
  private Date memberRegisterDate;
}
