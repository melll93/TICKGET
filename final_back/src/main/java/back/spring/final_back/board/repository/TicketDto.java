package back.spring.final_back.board.repository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@AllArgsConstructor
public class TicketDto {
   private int concert_no;
   private String org_name;
   private String use_fee;
   private String player;
   private String org_link;
   private String guname;
   private String main_img;
   private String themecode;
   private String date;
   private String etc_desc;
   private long end_date;
   private String title;
   private String ticket;
   private String codename;
   private String use_trgt;
   private String program;
   private String rgstdate;
   private long strtdate;
   private String place;
}
