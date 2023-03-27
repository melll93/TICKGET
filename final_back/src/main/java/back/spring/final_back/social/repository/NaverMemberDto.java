package back.spring.final_back.social.repository;

import lombok.*;

@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class NaverMemberDto {
    private int age;
    private String birthday;
    private int birthyear;
    private String email;
    private String gender;
    private String id;
    private String mobile;
    private String name;
    private String nickname;
    private String profile_image;
}
