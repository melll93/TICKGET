package back.spring.final_back.board.repository;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor // selectBoardList 얘는 null뜸
public class TogetherReplyDto {
    private int boardTgNo;
    private int boardReplyTgNo;
    private String boardReplyTgMemId;
    private String boardReplyTgTitle;
    private String boardReplyTgContent;
    private String boardReplyTgDate;
    private int boardReplyTgSuperNo;
    private int boardReplyTgGroupNo;
    private int boardReplyTgDepth;
}
