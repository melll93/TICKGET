package back.spring.final_back.member.repository;

import java.sql.Date;

import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
/************************
 * birth = birthyear + birthday
 ************************/
public class NaverMemberDto {
    private int member_no; // INT auto_increment PRIMARY KEY
    private String member_domain; // VARCHAR(20) NOT NULL (naver || kakao || local)
    private String member_id; // VARCHAR(80) NOT NULL
    private String member_password; // VARCHAR(20) NOT NULL
    private String member_name; // VARCHAR(20) NOT NULL
    private int member_age; // INT NULL
    private int member_birth; // DATE NOT NULL
    private String member_email; // VARCHAR(40) NOT NULL
    private String member_gender; // VARCHAR(1) NULL
    private String member_mobile; // VARCHAR(11) NOT NULL
    private String member_nickname; // VARCHAR(20) NULL
    private String member_profile_image; // VARCHAR(200) NULL
    private Date member_register_date; // DATE NOT NULL
}