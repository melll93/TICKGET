package back.spring.final_back.board.repository;

import java.sql.Date;

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
	private Date boardMkDate;
	private int boardMkHit;
	private Date mkTicketDate;
	private String mkTicketSeat;
	private int mkTicketPrice;
	private String mkTicketCount;
	private String mkTicketPlace;
	private String memName;
	private String boardMkFilename;
	private String boardMkFileurl;
	private String content;
	private String condition;


}
