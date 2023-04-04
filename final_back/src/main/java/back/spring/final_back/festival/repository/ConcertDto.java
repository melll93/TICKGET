package back.spring.final_back.festival.repository;

import lombok.*;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class ConcertDto {
    private int concertNo;
    private String orgName;
    private String useFee;
    private String player;
    private String orgLink;
    private String guname;
    private String mainImg;
    private String themecode;
    private String date;
    private String etcDesc;
    private long endDate;
    private String title;
    private String ticket;
    private String codename;
    private String useTrgt;
    private String program;
    private String rgstdate;
    private long strtdate;
    private String place;

}
