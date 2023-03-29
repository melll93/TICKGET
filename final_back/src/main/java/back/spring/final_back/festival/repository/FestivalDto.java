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
public class FestivalDto {
	private int festId;
	private String festTitle;
	private String festLocation;
	private String festCategory;
	private Date festStartday; // date
	private Date festEndday; // date
	private String festDetail;
	private int festPrice;
	private String festDesc;
}
