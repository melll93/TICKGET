package back.spring.final_back.service;

import java.util.List;

import back.spring.final_back.payment.repository.PaymentDto;

public interface PaymentService {

	//결제내역 조회
	List<PaymentDto> paymentList(PaymentDto paymentDto);

	//결제내역 상세정보
	List<PaymentDto> paymentDetail(PaymentDto paymentDto);


	//결제정보 입력
	int paymentInsert(PaymentDto paymentDto);

	
	//결제정보 삭제(환불)
	int paymentDelete(PaymentDto paymentDto);


}
