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
    private int board_no;
    private String member_id;
    private String board_title;
    private String board_content;
    private String board_date;
    private int board_views;
    private int board_super_no;
    private int board_group_no;
    private int board_depth;
    private int board_reply_count;
    private String board_check;
}
