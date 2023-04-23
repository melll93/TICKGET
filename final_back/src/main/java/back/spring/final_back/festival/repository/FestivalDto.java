package back.spring.final_back.festival.repository;

import java.sql.Date;
import java.sql.Time;

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
	private String festMId;
	private String festMAuthor;
	private String festMName;
	private Date festMStart; // date
	private Date festMEnd; // date
	private String festMLoc;
	private String festMImg;
	private String festMGenre;
	private String festMArea;
	private Integer festMHit;

	private Integer festTcPrice;
	private String festTcType;
	private String festTcTime;
	
	
	private String festDtAge;
	private String festDtRuntime;
	private String festDtId;
	private String festDtCasting;
	private String festDtCrew;
	
	private int festPsNo;
	private String festPsId;
	private String festPsUrl;
	

}

 
//private int festId;
//private String festTitle;
//private String festLocation;
//private String festCategory;
//private Date festStartday; // date
//private Date festEndday; // date
//private String festDetail;
//private int festPrice;
//private String festDesc;