package back.spring.final_back.payment.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.MarketDao;
import back.spring.final_back.payment.repository.PaymentDao;
import back.spring.final_back.payment.repository.PaymentDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService{
       Logger logger = LoggerFactory.getLogger(PaymentService.class);
	private final PaymentDao paymentDao;
       
	//결제내역 조회
	@Override
	public List<PaymentDto> paymentList(PaymentDto paymentDto) {
		logger.info("PaymentServiceImpl : paymentList 호출");
		List<PaymentDto>pList = null;
		pList = paymentDao.paymentList(paymentDto);
		return pList;
	}

	//결제내역 상세정보
	@Override
	public List<PaymentDto> paymentDetail(PaymentDto paymentDto) {
        logger.info("PaymentServiceImpl : paymentDetail 호출");
        List<PaymentDto>pDetail = null;
        pDetail = paymentDao.paymentDetail(paymentDto);
		return pDetail;
	}


	//결제 정보 입력
	@Override
	public int paymentInsert(PaymentDto paymentDto) {
		logger.info("PaymentServiceImpl : paymentInsert 호출");
		int result = 0;
		result = paymentDao.paymentInsert(paymentDto);
		return result;
	}
	
	
	//결제 정보 삭제(환불)
	@Override
	public int paymentDelete(PaymentDto paymentDto) {
		logger.info("PaymentServiceImpl : paymentDelete 호출");
		int result = 0;
		result = paymentDao.paymentDelete(paymentDto);
		return result;
	}   
	

}


