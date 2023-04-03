package back.spring.final_back.festival.repository;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDto {
	private int reviewNo;
	private int reviewPw;
	private int reviewHit;
	private String reviewContent;
	private Date reviewRegdate; // date
	private String reviewFestmid;  
	private String reviewMemid;
	private String reviewMemnickname;
}

