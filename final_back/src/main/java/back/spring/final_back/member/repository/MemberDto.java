package back.spring.final_back.member.repository;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.sql.Date;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class MemberDto {
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
