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
    private String domain; // VARCHAR(20) NOT NULL (naver || kakao || local)
    private String id; // VARCHAR(80) NOT NULL
    private String password; // VARCHAR(20) NOT NULL
    private String name; // VARCHAR(20) NOT NULL
    private int age; // INT NULL
    private int birth; // DATE NOT NULL
    private String email; // VARCHAR(40) NOT NULL
    private String gender; // VARCHAR(1) NULL
    private String mobile; // VARCHAR(11) NOT NULL
    private String nickname; // VARCHAR(20) NULL
    private String profile_image; // VARCHAR(200) NULL
    private Date register_date; // DATE NOT NULL
}