package back.spring.final_back.festival.service;

import java.util.List;

import back.spring.final_back.festival.repository.MovieDto;

public interface MovieService {

  List<MovieDto> getMovieList();

}
