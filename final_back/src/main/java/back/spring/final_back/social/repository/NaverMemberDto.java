package back.spring.final_back.social.repository;

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
    private int member_no;
    private String domain; // naver || kakao || local
    private String id;
    private String name;
    private int age;
    private int birth;
    private String email;
    private String gender;
    private String mobile;
    private String nickname;
    private String profile_image;
    private Date register_date;
}