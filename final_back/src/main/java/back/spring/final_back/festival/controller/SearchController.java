package back.spring.final_back.festival.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import back.spring.final_back.festival.repository.FestivalDto;
import back.spring.final_back.festival.service.SearchService;
import lombok.extern.slf4j.Slf4j;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333/")
@RestController
@Slf4j
@RequestMapping("/search/*")

public class SearchController {
  
  @Autowired
  private SearchService searchService;

  @GetMapping("searchFestivals")
  public List<FestivalDto> searchFestivals(@RequestParam String keyword) {
    List<FestivalDto> searchedFest = searchService.searchFestivalsByKeyword(keyword);
    return searchedFest;
  }
  
}
