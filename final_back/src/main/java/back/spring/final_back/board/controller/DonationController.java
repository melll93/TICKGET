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
@RequestMapping("/donation/*")
@RequiredArgsConstructor
public class DonationController {
	  Logger logger = LoggerFactory.getLogger(BoardController.class);
	private final DonationService donationService;
	
	//도네이션 게시판 게시글 조회
	@GetMapping("/don_boardList")
	public List<DonationDto> don_boardList(){
		   logger.info("DonationController : don_boardList 호출");
	        List<DonationDto> dList = null;
	        dList = donationService.don_boardList(); 
	        return dList;
	}
	
	
    //도네이션 게시판 게시글 등록
	 @GetMapping("/don_boardInsert")
	  public int don_boardInsert(DonationDto donationDto) {
		 logger.info("DonationController : don_boardInsert 호출");
		  int result = 0;
		  result = donationService.don_boardInsert(donationDto);
		  return result;
	  }
	        
	        
	        
    //도네이션 게시판 게시글 수정
	 @GetMapping("/don_boardUpdate")
	 public int don_boardUpdate(DonationDto donationDto) {
		 logger.info("DonationController : don_boardUpdate 호출");
		 int result = 0;
		 result = donationService.don_boardUpdate(donationDto);
		 return result;
	 }
	        
	        
    
	//도네이션 게시판 게시글 삭제
	 @GetMapping("/don_boardDelete")
	 public int don_boardDelete(DonationDto donationDto) {
		 logger.info("DonationController : don_boardDelete 호출");
         int result = 0;
         result = donationService.don_boardDelete(donationDto);
         return result;
	        
	
	}
}
