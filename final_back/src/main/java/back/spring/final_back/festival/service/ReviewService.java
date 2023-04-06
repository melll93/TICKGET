package back.spring.final_back.festival.service;


import java.util.List;

import back.spring.final_back.festival.repository.ReviewDto;

public interface ReviewService {

    List<ReviewDto> reviewList();
    int reviewInsert(ReviewDto review);
	int reviewDelete(Integer review_no);
	int reviewUpdate(ReviewDto reviewDto);
}


