package back.spring.final_back.festival.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.festival.repository.FestivalDao;
import back.spring.final_back.festival.repository.FestivalDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FestivalServiceImpl implements FestivalService {
    Logger logger = LoggerFactory.getLogger(FestivalServiceImpl.class);

    private final FestivalDao festivalDao;

    @Override
    public int festivalInsert(FestivalDto festivalDto) {
        int result = festivalDao.festivalInsert(festivalDto);
        return result;
    }

    @Override
    public List<FestivalDto> festivalList() {
        List<FestivalDto> festival = null;
        festival = festivalDao.festivalList();
        // logger.info(festival.toString());
        return festival;
    }

    @Override
    public List<FestivalDto> seoulFestivalList() {
        List<FestivalDto> festival = null;
        festival = festivalDao.seoulFestivalList();
        return festival;
    }

    @Override
    public List<FestivalDto> kyeongkiFestivalList() {
        List<FestivalDto> festival = null;
        festival = festivalDao.kyeongkiFestivalList();
        return festival;
    }

}
