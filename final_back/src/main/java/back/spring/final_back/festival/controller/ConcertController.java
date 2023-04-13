package back.spring.final_back.festival.controller;

import back.spring.final_back.festival.repository.ConcertDto;
import back.spring.final_back.festival.service.ConcertService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3333/")
@Controller
@ResponseBody
@RequiredArgsConstructor
@RequestMapping("/api/*")
@Slf4j
public class ConcertController {
    // Logger logger = LoggerFactory.getLogger(ConcertController.class);
    private final ConcertService concertService;

    @GetMapping("/concertList")
    public List<ConcertDto> ConcertList(@RequestParam String category) {
        log.info("call ConcertController.ConcertList, param : " + category);
        List<ConcertDto> cList = null;
        cList = concertService.ConcertList(category);
        return cList;
    }

    @GetMapping("/concertToday")
    public List<ConcertDto> ConcertToday() {
        log.info("call ConcertController.ConcertToday");
        List<ConcertDto> cList = null;
        cList = concertService.ConcertToday();
        // log.info(cList.toString());
        return cList;
    }

    List<ConcertDto> ConcertSearch(@RequestParam String keyword) {
        List<ConcertDto> cList = null;
        cList = concertService.ConcertSearch(keyword);
        return cList;
    }

    int ConcertInsert(@RequestBody ConcertDto concertDto) {
        int result = 0;
        result = concertService.ConcertInsert(concertDto);
        return result;
    }

    int ConcertUpdate(@RequestBody ConcertDto concertDto) {
        int result = 0;
        result = concertService.ConcertUpdate(concertDto);
        return result;
    }

    int ConcertDelete(int concert_no) {
        int result = 0;
        result = concertService.ConcertDelete(concert_no);
        return result;
    }
}
