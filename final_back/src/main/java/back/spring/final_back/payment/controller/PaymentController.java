package back.spring.final_back.payment.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.board.controller.MarketController;
import back.spring.final_back.payment.repository.PaymentDto;
import back.spring.final_back.service.PaymentService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/payment/*")
@RequiredArgsConstructor
public class PaymentController {
	Logger logger = LoggerFactory.getLogger(PaymentController.class);
	private final PaymentService paymentService;
	
	
	//결제내역 조회
	@GetMapping("/paymentList")
	public List<PaymentDto> paymentList(PaymentDto paymentDto) {
		logger.info("PaymentController : paymentList 호출");
		List<PaymentDto>pList = null;
		pList = paymentService.paymentList(paymentDto);
		return pList;
	}
	
	
	//결제내역 상세정보
	@GetMapping("/paymentDetail")
	public List<PaymentDto> paymentDetail(PaymentDto paymentDto) {
		logger.info("PaymentController : paymentDetail 호출");
		List<PaymentDto>pDetail = null;
		pDetail = paymentService.paymentDetail(paymentDto);
		return pDetail;
	}
	
	
	//결제 정보 입력
    @PostMapping("/paymentInsert")
    public int paymentInsert(PaymentDto paymentDto) {
    	logger.info("PaymentController : paymentInsert 호출");
        int result = 0;
        result = paymentService.paymentInsert(paymentDto);
        return result;
    }


    
	//결제 정보 삭제 (환불)
    @GetMapping("/paymentDelete")
    public int paymentDelete(PaymentDto paymentDto) {
    	logger.info("PaymentController : paymentDelete 호출");
    	int result = 0;
    	result = paymentService.paymentDelete(paymentDto);
    	return result;
    }

}
