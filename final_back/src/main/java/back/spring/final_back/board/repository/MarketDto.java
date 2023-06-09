package back.spring.final_back.board.repository;

import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class MarketDto {
	// 테이블 컬럼
	// application.yml에 map-underscore-to-camel-case: true 때문에 snake-case로 된 DB의
	// Attibute들을 java에서는 camel-case로 매핑해줌.
	private int boardMkNo;
	private String boardMkTitle;
	private String boardMkContent;
	private Timestamp boardMkDate;
	private int boardMkHit;
	private LocalDateTime mkTicketDate;
	private String mkTicketSeat;
	private int mkTicketPrice;
	private int mkTicketCount;
	private String mkTicketPlace;
	private String boardMkFilename;
	private String boardMkFileurl;
	private String memberNickname;
	private String memberId;
	private int memberNo;
	private int boardMkStatus;
	private int boardMkLikes;
	
	
	//조건검색 시 필요
	private String content;
	private String condition;


}