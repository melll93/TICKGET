package back.spring.final_back.board.repository;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class CarpoolReplyDto {
    private int boardCpNo;
    private int boardReplyCpNo;
    private String boardReplyCpMemId;
    private String boardReplyCpTitle;
    private String boardReplyCpContent;
    private String boardReplyCpDate;
}