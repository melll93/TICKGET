package back.spring.final_back.festival.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface OpenSoonDao {

  public List<OpenSoonDto> OpenSoonList();
}
