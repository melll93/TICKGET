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
public class CarpoolDto {
    private int carpoolNo;
    private String carpoolMemId;
    private String carpoolTitle;
    private String carpoolContent;
    private Date carpoolDate;
}
