package back.spring.final_back.festival.controller;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.festival.repository.OpenSoonDto;
import back.spring.final_back.festival.service.OpenSoonService;
import lombok.RequiredArgsConstructor;

@CrossOrigin("http://localhost:3333/")
@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/*")
public class OpenSoonController {

  private final OpenSoonService openSoonService;

  @GetMapping("/openSoonList")
  public List<OpenSoonDto> OpenSoonList() {
    List<OpenSoonDto> osList = null;
    osList = openSoonService.OpenSoonList();
    return osList;
  }

}
