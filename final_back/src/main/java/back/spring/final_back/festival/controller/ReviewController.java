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

import back.spring.final_back.festival.repository.ReviewDto;
import back.spring.final_back.festival.service.ReviewService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3333/")
@RestController
@RequestMapping("/review/*")
public class ReviewController {
	Logger logger = LoggerFactory.getLogger(ReviewController.class);
	@Autowired
	private final ReviewService reviewService;

	@GetMapping("reviewList")
	public List<ReviewDto> reviewList() {
		List<ReviewDto> review = null;
		review = reviewService.reviewList();
		logger.info(review.toString());
		return review;
	}


	@PostMapping("reviewInsert")
	public int reviewInsert(@RequestBody ReviewDto reviewDto) {
		int result = reviewService.reviewInsert(reviewDto);
		logger.info(reviewDto.toString());
		return result;
	}
}
