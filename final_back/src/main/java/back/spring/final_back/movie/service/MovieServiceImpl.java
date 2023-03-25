package back.spring.final_back.movie.service;

import java.util.List;

import org.springframework.stereotype.Service;

import back.spring.final_back.movie.repository.MovieDao;
import back.spring.final_back.movie.repository.MovieDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

  private final MovieDao movieDao;

  @Override
  public List<MovieDto> getMovieList() {
    List<MovieDto> mList = null;
    mList = movieDao.getMovieList();
    return mList;
  }

}
