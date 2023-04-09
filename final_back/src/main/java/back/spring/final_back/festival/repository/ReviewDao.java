package back.spring.final_back.festival.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReviewDao {
    public List<ReviewDto> reviewList();
    int reviewInsert(ReviewDto reviewDto);
	int reviewDelete(Integer review_no);
	public int reviewUpdate(ReviewDto reviewDto);
}

