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
public class DonationDto {
	// 테이블 컬럼
	// application.yml에 map-underscore-to-camel-case: true 때문에 snake-case로 된 DB의
	// Attibute들을 java에서는 camel-case로 매핑해줌.
	private int donBno;
	private String donTitle;
	private String donPw;
	private Date donTicketDate;
	private String donTicketSeat;
	private String donTicketPrice;
	private String donTicketCount;
	private String donContent;
	private String memName;
	private Date donBoardDate;
	private int donBoardHit;

	// private int don_bno;
	// private String don_title;
	 //private String don_pw;
	 //private Date don_ticket_date;
	 //private String don_ticket_seat;
	 //private int don_ticket_price;
	 //private int don_ticket_count;
	 //private String don_content;
	 //private String mem_name;
	 //private Date don_board_date;
	 //private int don_board_hit;

}
