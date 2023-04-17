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
public class TogetherDto {
    private int boardTgNo;
    private String boardTgMemId;
    private String boardTgTitle;
    private String boardTgContent;
    private Date boardTgDate;
    private int boardTgViews;
    private int boardTgSuperNo;
    private int boardTgGroupNo;
    private int boardTgDepth;
    private int boardTgReplyCount;
    private String boardTgCheck;
    private String boardTgSecret;
}