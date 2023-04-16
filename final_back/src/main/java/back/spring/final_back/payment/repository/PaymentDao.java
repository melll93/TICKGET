package back.spring.final_back.payment.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface PaymentDao {

	//결제내역 조회
	public List<PaymentDto> paymentList(PaymentDto paymentDto);

	//결제내역 상세정보
	public List<PaymentDto> paymentDetail(PaymentDto paymentDto);


	//결제 정보 입력
	public int paymentInsert(PaymentDto paymentDto);
	
	
	//결제 정보 삭제(환불)
	public int paymentDelete(PaymentDto paymentDto);
	

}
