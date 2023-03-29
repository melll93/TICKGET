package back.spring.final_back.data.controller;

import java.io.IOException;
import java.net.MalformedURLException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.data.service.DataService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@RequestMapping("/data/*")
@RequiredArgsConstructor
public class DataController {
  Logger logger = LoggerFactory.getLogger(DataController.class);
  private final DataService dataService;

  @GetMapping("selectIdList")
  public Object selectIdList() throws MalformedURLException, IOException {
    logger.info("call selectIdlist");
    // List<String> rList = null;
    Object data = dataService.selectIdList();
    return data;
  }
}
