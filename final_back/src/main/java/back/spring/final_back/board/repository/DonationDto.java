package back.spring.final_back.board.repository;

import java.sql.Date;

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
	private int don_bno;
	private String don_title;
	private String don_pw;
	private Date don_ticket_date;
	private String don_ticket_seat;
	private String don_ticket_price;
	private String don_ticket_count;
	private String don_content;
	private String mem_name;
	private Date don_board_date;
	private int don_board_hit;
	
	
}
