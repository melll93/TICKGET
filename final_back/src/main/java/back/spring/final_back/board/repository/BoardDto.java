package back.spring.final_back.board.repository;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class BoardDto {
    private int BOARD_NO;
    private String MEMBER_ID;
    private String BOARD_TITLE;
    private String BOARD_CONTENT;
    private String BOARD_DATE;
    private int BOARD_VIEWS;
    private int BOARD_SUPER_NO;
    private int BOARD_GROUP_NO;
    private int BOARD_DEPTH;
    private int BOARD_REPLY_COUNT;
    private String BOARD_CHECK;
}
