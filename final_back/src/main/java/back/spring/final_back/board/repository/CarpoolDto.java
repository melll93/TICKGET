package back.spring.final_back.board.repository;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CarpoolDto {
    private int boardCpNo;
    private String boardCpMemId;
    private String boardCpTitle;
    private String boardCpContent;
    private Date boardCpDate;
    private int boardCpViews;
    private String boardCpPlace;
}
