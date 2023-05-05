package back.spring.final_back.festival.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface SearchDao {

  public List<FestivalDto> searchFestivalsByKeyword(String keyword);

  public List<FestivalDto> findAll();
}
