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
    private int memberNo; // INT auto_increment PRIMARY KEY
    private String memberDomain; // VARCHAR(20) NULL (naver || kakao || local)
    private String memberId; // VARCHAR(80) NOT NULL
    private String memberPassword; // VARCHAR(20) NOT NULL
    private String memberName; // VARCHAR(20) NOT NULL
    private int memberAge; // INT NULL
    private int memberBirth; // DATE NOT NULL
    private String memberEmail; // VARCHAR(40) NOT NULL
    private String memberGender; // VARCHAR(1) NULL
    private String memberMobile; // VARCHAR(11) NOT NULL
    private String memberNickname; // VARCHAR(20) NULL
    private String memberProfileImage; // VARCHAR(200) NULL
    private Date memberRegisterDate; // DATE NOT NULL
    private String memberZipcode; // VARCHAR(6) NULL
    private String memberAddress; // VARCHAR(100) NULL
    private String memberAddrDetail; // VARCHAR(40) NULL
}
