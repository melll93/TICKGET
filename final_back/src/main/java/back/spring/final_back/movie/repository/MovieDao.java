package back.spring.final_back.movie.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface MovieDao {

  public List<MovieDto> getMovieList();
}
