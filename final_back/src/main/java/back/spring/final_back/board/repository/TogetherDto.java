package back.spring.final_back.board.repository;

import java.sql.Date;

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
// @AllArgsConstructor //selectBoardList 얘 만됌
@NoArgsConstructor  //selectBoardList 얘는 null뜸
public class TogetherDto {
    private int boardTgNo;
    private String boardTgMemId;
    private String boardTgTitle;
    private String boardTgContent;
    private Date boardTgDate;
    private String boardTgViews;
    private int boardTgSuperNo;
    private int boardTgGroupNo;
    private int boardTgDepth;
    private int boardTgReplyCount;
    private String boardTgCheck;
    private String boardTgSecret;
}
