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
public class PaymentDto {
	// 테이블 컬럼
	// application.yml에 map-underscore-to-camel-case: true 때문에 snake-case로 된 DB의
	// Attibute들을 java에서는 camel-case로 매핑해줌.
 private int paymentId;   //결제번호(PK)
 private String paymentOrderId; //주문번호 (토스필수요소)
 private String paymentOrderName; //주문명 (상품명)
 private int paymentCount; //주문수량
 private int paymentPrice; //결제금액
 private LocalDateTime paymentFestDate; //관람일시
 private int boardMkNo; //판매 게시글 번호 (마켓게시판)
 private int memberNo; //구매자 회원번호
 private String memberName; //구매자 이름
 private String memberEmail; //구매자 이메일
 
 
 
}
 