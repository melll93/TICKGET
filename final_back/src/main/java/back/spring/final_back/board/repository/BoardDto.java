package back.spring.final_back.board.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
// @Data
@ToString
// @RequiredArgsConstructor    //selectBoardList 얘는 null뜸
@AllArgsConstructor //selectBoardList 얘 만됌
// @NoArgsConstructor  //selectBoardList 얘는 null뜸
public class BoardDto {
    private int boardNo;
    private String memberId;
    private String boardTitle;
    private String boardContent;
    private String boardDate;
    private int boardViews;
    private int boardSuperNo;
    private int boardGroupNo;
    private int boardDepth;
    private int boardReplyCount;
    private String boardCheck;
}
