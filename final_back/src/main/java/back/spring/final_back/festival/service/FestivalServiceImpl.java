package back.spring.final_back.festival.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import back.spring.final_back.festival.repository.FestivalDao;
import back.spring.final_back.festival.repository.FestivalDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class FestivalServiceImpl implements FestivalService {
    Logger logger = LoggerFactory.getLogger(FestivalServiceImpl.class);

    private final FestivalDao festivalDao;

    @Override
    public List<FestivalDto> festivalListByDate(Date date) {
        List<FestivalDto> result = null;
        result = festivalDao.festivalListByDate(date);
        return result;
    }

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
    public List<FestivalDto> areaFestivalList(String area) {
        List<FestivalDto> festival = null;
        festival = festivalDao.areaFestivalList(area);
        return festival;
    }

    @Override
    public int festivalDelete(String fest_m_id) {
        log.info("fest 서비스임플 삭제");
        int result = 0;
        result = festivalDao.festivalDelete(fest_m_id);
        return result;
    }

	@Override
	public List<FestivalDto> festivalDetail(FestivalDto festivalDto) {
		List<FestivalDto> festival = festivalDao.festivalDetail(festivalDto);
		List<FestivalDto> festival2 = festivalDao.festivalDetail2(festivalDto);
        List<FestivalDto> mergedFestival = new ArrayList<>();
        mergedFestival.addAll(festival);
        mergedFestival.addAll(festival2);
        return mergedFestival;
		    }

    @Override
    public List<FestivalDto> festivalHitList() {
        List<FestivalDto> festival = null;
        festival = festivalDao.festivalHitList();
        return festival;
    }

	@Override
	public void festivalThumpsUp(@RequestParam Map<String, Object> pMap) {
		festivalDao.festivalThumpsUp(pMap);
	    }

	@Override
	public int festDetailInsert(FestivalDto festivalDto) {
        int result = festivalDao.festDetailInsert(festivalDto);
        return result;
	}
	
	@Override
	public int festTicketInsert(FestivalDto festivalDto) {
        int result = festivalDao.festTicketInsert(festivalDto);
        return result;
	}
	
	@Override
	public int festPosterInsert(FestivalDto festivalDto) {
        int result = festivalDao.festPosterInsert(festivalDto);
        log.info("여기까지");
        return result;
	}


    @Override
    public int festivalUpdate(FestivalDto festivalDto) {
        int result = festivalDao.festivalUpdate(festivalDto);
        return result;
    }

    @Override
    public int festivalPosterDelete(int fest_ps_no) {
        int result = 0;
        result = festivalDao.festivalPosterDelete(fest_ps_no);
        return result;
    }
	@Override
	public int festivalDetailUpdate(FestivalDto festivalDto) {
        int result = festivalDao.festivalDetailUpdate(festivalDto);
        return result;
	}

	@Override
	public int festivalTicketDelete(int fest_tc_no) {
	       int result = 0;
	        result = festivalDao.festivalTicketDelete(fest_tc_no);
	        return result;
	}
}
