package back.spring.final_back.movie.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Conditional;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.movie.repository.MovieDto;
import back.spring.final_back.movie.service.MovieService;
import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:3333/")
@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/*")
public class MovieController {

  private final MovieService movieService;

  @GetMapping("movieList")
  public List<MovieDto> getMovieList() {
    List<MovieDto> mList = null;
    mList = movieService.getMovieList();
    return mList;
  }

}
