package back.spring.final_back.board.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.board.repository.CarpoolDto;
import back.spring.final_back.board.service.CarpoolService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/carpool")
@RequiredArgsConstructor
public class CarpoolController {
    Logger logger = LoggerFactory.getLogger(CarpoolController.class);
    private final CarpoolService carpoolService;

    // Carpool 게시판 조회(SelectAll)
    @GetMapping("/selectCarpool")
    public List<CarpoolDto> selectCarpool() {
        logger.info("CarpoolController : selectCarpool 호출");
        List<CarpoolDto> mList = null;
        mList = carpoolService.selectCarpool();
        return mList;
    }

    // Carpool 게시글 상세보기(SelectOne)
    @GetMapping("/carpoolDetail")
    public CarpoolDto CarpoolDetail(CarpoolDto carpoolDto) {
        logger.info("CarpoolController : CarpoolDetail 호출");
        CarpoolDto mList = carpoolService.CarpoolDetail(carpoolDto);
        return mList;
    }

        // Carpool 게시판 조회(SelectAll)
        @GetMapping("/getBoardCpNo")
        public int getBoardCpNo() {
            logger.info("CarpoolController : getBoardCpNo 호출");
            return carpoolService.getBoardCpNo();
        }

    // Carpool 게시판 등록(Insert)
    @GetMapping("/insertCarpool")
    public int insertCarpool(CarpoolDto carpoolDto) {
        logger.info("CarpoolController : insertCarpool 호출");
        int result = carpoolService.insertCarpool(carpoolDto);
        return result;
    }

    // Carpool 게시판 삭제(Delete)
    @GetMapping("/deleteCarpool")
    public int deleteCarpool(CarpoolDto carpoolDto) {
        logger.info("CarpoolController : deleteCarpool 호출");
        int result = 0;
        result = carpoolService.deleteCarpool(carpoolDto);
        return result;
    }

    // Carpool 게시글 수정(Update)
    @GetMapping("/updateCarpool")
    public CarpoolDto updateCarpool(CarpoolDto carpoolDto) {
        logger.info("CarpoolController : updateCarpool select");
        CarpoolDto mList = carpoolService.CarpoolDetail(carpoolDto);
        return mList;
    }

    // Carpool 게시판 수정(Update)
    @PostMapping("/updateCarpool")
    public int updateCarpoolSubmit(@RequestBody CarpoolDto carpoolDto) {
        logger.info("CarpoolController : updateCarpoolSubmit submit");
        int result = 0;
        logger.error("carpoolDto = {}", carpoolDto);
        result = carpoolService.updateCarpool(carpoolDto);
        return result;
    }

	// Carpool 조회수 증가시켜줘
	@GetMapping("/carpoolViewUp")
	public void viewUp(@RequestParam Map<String, Object> pMap) {
		logger.info("CarpoolController : viewUp 호출");
        logger.error("pMap = {}", pMap);
		carpoolService.viewUp(pMap);
	}
}
