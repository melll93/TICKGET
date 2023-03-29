package back.spring.final_back.board.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.board.repository.BoardDto;
import back.spring.final_back.board.repository.DonationDto;
import back.spring.final_back.board.service.BoardService;
import back.spring.final_back.board.service.DonationService;
import lombok.RequiredArgsConstructor;

@Controller  
@ResponseBody  
@CrossOrigin("http://localhost:3333")
@RequestMapping("/api/*")
@RequiredArgsConstructor
public class DonationController {
	  Logger logger = LoggerFactory.getLogger(BoardController.class);
	private final DonationService donationService;
	
	//도네이션 게시판 게시글 조회
	@GetMapping("/selectDonationList")
	public List<DonationDto> selectDonationList(){
		   logger.info("DonationController : selectDonationList 호출");
	        List<DonationDto> dList = null;
	        dList = donationService.selectDonationList();
	        return dList;
	}
	
	
    //도네이션 게시판 게시글 등록
	 @GetMapping("/insertDonationList")
	  public int insertDonationList(DonationDto donationDto) {
		 logger.info("DonationController : insertDonationList 호출");
		  int result = 0;
		  result = donationService.insertDonationList(donationDto);
		  return result;
	  }
	        
	        
	        
    //도네이션 게시판 게시글 수정
	 @GetMapping("/updateDonationList")
	 public int updateDonationList(DonationDto donationDto) {
		 logger.info("DonationController : updateDonationList 호출");
		 int result = 0;
		 result = donationService.updateDonationList(donationDto);
		 return result;
	 }
	        
	        
    
	//도네이션 게시판 게시글 삭제
	 @GetMapping("/deleteDonationList")
	 public int deleteDonationList(DonationDto donationDto) {
		 logger.info("DonationController : deleteDonationList 호출");
         int result = 0;
         result = donationService.deleteDonationList(donationDto);
         return result;
	        
	
	}
}
