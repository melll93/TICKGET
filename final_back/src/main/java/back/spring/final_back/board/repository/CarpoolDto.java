package back.spring.final_back.board.repository;

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
    private String boardCpDate;
    private int boardCpViews;
    private String boardCpPlace;
}
