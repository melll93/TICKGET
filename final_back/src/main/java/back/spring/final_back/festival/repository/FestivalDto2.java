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
public class FestivalDto2 {
	private String festMId;
	private String festMName;
	private String festMLoc;
	private String festMGenre;
	private Date festMStart; // date
	private Date festMEnd; // date
	private String festMImg;
	private String festMArea;
}

