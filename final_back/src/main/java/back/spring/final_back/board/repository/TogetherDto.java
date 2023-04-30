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
    private String boardTgDate;
    private int boardTgViews;
}