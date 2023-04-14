package back.spring.final_back.board.repository;

import java.sql.Date;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
// @Data
@ToString
// @RequiredArgsConstructor //selectBoardList 얘는 null뜸
// @AllArgsConstructor //selectBoardList 얘 만됌
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
