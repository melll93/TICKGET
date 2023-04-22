package back.spring.final_back.payment.repository;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class WishlistDto {
	
	private int wishlistId; //위시리스트 번호 (pk)
	private String wishlistTitle; //상품제목
	private String wishlistPrice; //상품제목
	private String wishlistCategory; //상품 카테고리
    private int boardMkNo; //마켓게시판 글번호 (FK)
    private int memberNo; //회원번호

}
