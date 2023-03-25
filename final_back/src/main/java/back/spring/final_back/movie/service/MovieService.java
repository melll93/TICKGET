package back.spring.final_back.movie.service;

import java.util.List;

import back.spring.final_back.movie.repository.MovieDto;

public interface MovieService {

  List<MovieDto> getMovieList();

}
