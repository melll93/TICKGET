package back.spring.final_back.festival.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import back.spring.final_back.festival.repository.FestivalDto;
import back.spring.final_back.festival.service.FestivalService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3333/")
@RestController
@RequestMapping("/festival/*")
public class FestivalController {
	Logger logger = LoggerFactory.getLogger(FestivalController.class);
	@Autowired
	private final FestivalService festivalService;

	@GetMapping("festivalToday")
	public List<FestivalDto> festivalToday() {
		return festivalService.festivalToday();
	}

	@GetMapping("festivalList")
	public List<FestivalDto> festivalList() {
		List<FestivalDto> festival = null;
		festival = festivalService.festivalList();
		// logger.info(festival.toString());
		return festival;
	}

	@GetMapping("seoulFestivalList")
	public List<FestivalDto> seoulFestivalList() {
		List<FestivalDto> festival = null;
		festival = festivalService.seoulFestivalList();
		return festival;
	}

	@GetMapping("kyeongkiFestivalList")
	public List<FestivalDto> kyeongkiFestivalList() {
		List<FestivalDto> festival = null;
		festival = festivalService.kyeongkiFestivalList();
		return festival;
	}

	@PostMapping("festivalInsert")
	public int festivalInsert(@RequestBody FestivalDto festivalDto) {
		int result = festivalService.festivalInsert(festivalDto);
		logger.info(festivalDto.toString());
		return result;
	}

	@GetMapping("festivalDelete")
	public String festivalDelete(Integer fest_m_id) {
		logger.info("컨트롤러 페스티발삭제 id넘버 " + fest_m_id);
		int result = 0;
		result = festivalService.festivalDelete(fest_m_id);
		return String.valueOf(result);
	}
}
