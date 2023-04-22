package back.spring.final_back.festival.controller;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import back.spring.final_back.festival.repository.FestivalDto;
import back.spring.final_back.festival.service.FestivalService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@ResponseBody
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3333/")
@RestController
@RequestMapping("/festival/*")
@Slf4j
public class FestivalController {
	Logger logger = LoggerFactory.getLogger(FestivalController.class);
	@Autowired
	private final FestivalService festivalService;

	@GetMapping("festivalListByDate")
	public List<FestivalDto> festivalListByDate(@RequestParam Date date) {
		List<FestivalDto> result = null;
		result = festivalService.festivalListByDate(date);
		// log.info(result.toString());
		return result;
	}

	@GetMapping("festivalHitList")
	public List<FestivalDto> festivalHitList() {
		List<FestivalDto> festival = null;
		festival = festivalService.festivalHitList();
		return festival;
	}

	@GetMapping("festivalList")
	public List<FestivalDto> festivalList() {
		List<FestivalDto> festival = null;
		festival = festivalService.festivalList();
		// logger.info(festival.toString());
		return festival;
	}

	@GetMapping("areaFestivalList")
	public List<FestivalDto> areaFestivalList(@RequestParam String fest_m_area) {
		List<FestivalDto> festival = null;
		festival = festivalService.areaFestivalList(fest_m_area);
		return festival;
	}

	@GetMapping("/festivalDetail")
	public List<FestivalDto> festivalDetail(FestivalDto festivalDto) {
		List<FestivalDto> festival = festivalService.festivalDetail(festivalDto);
		return festival;
	}

	@PostMapping("festivalInsert")
	public int festivalInsert(@RequestBody FestivalDto festivalDto) {
		int result = festivalService.festivalInsert(festivalDto);
		log.info(festivalDto.toString());
		return result;
	}

	@PostMapping("festDetailInsert")
	public int festDetailInsert(@RequestBody FestivalDto festivalDto) {
		int result = festivalService.festDetailInsert(festivalDto);
		log.info(festivalDto.toString());
		return result;
	}

	@PostMapping("festPosterInsert")
	public int festPosterInsert(@RequestBody FestivalDto festivalDto) {
		int result = festivalService.festPosterInsert(festivalDto);
		log.info(festivalDto.toString());
		return result;
	}

	@PostMapping("festTicketInsert")
	public int festTicketInsert(@RequestBody FestivalDto festivalDto) {
		int result = festivalService.festTicketInsert(festivalDto);
		log.info(festivalDto.toString());
		return result;
	}


	@GetMapping("festivalDelete")
	public String festivalDelete(@RequestParam String fest_m_id) {
		logger.info("컨트롤러 페스티발삭제 id넘버 " + fest_m_id);
		int result = 0;
		result = festivalService.festivalDelete(fest_m_id);
		return String.valueOf(result);
	}


	@GetMapping("festivalPosterDelete")
	public String festivalPosterDelete(@RequestParam int fest_ps_no) {
		int result = 0;
		result = festivalService.festivalPosterDelete(fest_ps_no);
		return String.valueOf(result);
	}

	@GetMapping("/festivalThumpsUp")
	public void festivalThumpsUp(@RequestParam Map<String, Object> pMap) {
		festivalService.festivalThumpsUp(pMap);
	}

	@PostMapping("/festivalUpdate")
	public int festivalUpdate(@RequestBody FestivalDto festivalDto) {
		int result = 0;
		result = festivalService.festivalUpdate(festivalDto);
		return result;
	}
}
