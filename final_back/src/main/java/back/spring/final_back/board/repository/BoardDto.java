package back.spring.final_back.board.repository;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class BoardDto {
    private int board_no;
    private String board_title;
    private String board_content;

//    public BoardDto(int board_no, String board_title, String board_content) {
//        this.board_no = board_no;
//        this.board_title = board_title;
//        this.board_content = board_content;
//    }
}
