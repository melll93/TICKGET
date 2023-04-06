package back.spring.final_back.festival.service;


import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.MarketDto;
import back.spring.final_back.festival.repository.ReviewDao;
import back.spring.final_back.festival.repository.ReviewDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    Logger logger = LoggerFactory.getLogger(ReviewServiceImpl.class);

    private final ReviewDao reviewDao;

    @Override
    public int reviewInsert(ReviewDto reviewDto) {
        int result = reviewDao.reviewInsert(reviewDto);
        return result;
    }

    @Override
    public List<ReviewDto> reviewList() {
        List<ReviewDto> review = null;
        review = reviewDao.reviewList();
        logger.info(review.toString());
        return review;
    }


	@Override
	public int reviewDelete(Integer review_no) {
		log.info("SerImpl_reviewDelete"+review_no);
		int result = 0;
		result = reviewDao.reviewDelete(review_no);
		return result;
	}
	

	@Override
	public int reviewUpdate(ReviewDto reviewDto) {
		int result = 0;
		result = reviewDao.reviewUpdate(reviewDto);
		return result;
	}
}
