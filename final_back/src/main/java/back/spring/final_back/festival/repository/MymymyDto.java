package back.spring.final_back.festival.repository;

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
public class MymymyDto {
	private String festMId;
	private String festMAuthor;
	private String festMName;
	private String festMImg;
	private String festMRegdate;

	private int boardCpNo;
	private String boardCpMemId;
	private String boardCpTitle;
	private String boardCpContent;
	private String boardCpDate;
	private int boardCpViews;
	private String boardCpPlace;

	private int boardTgNo;
	private String boardTgMemId;
	private String boardTgTitle;
	private String boardTgContent;
	private String boardTgDate;
	private int boardTgViews;
	
	private int boardMkNo;
	private String boardMkTitle;
	private String boardMkContent;
	private int boardMkHit;
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

}

 