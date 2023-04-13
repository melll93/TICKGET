package back.spring.final_back.festival.service;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import back.spring.final_back.board.repository.CarpoolDto;
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
    public List<FestivalDto> areaFestivalList() {
        List<FestivalDto> festival = null;
        festival = festivalDao.areaFestivalList();
        return festival;
    }

	@Override
	public int festivalDelete(Integer fest_m_id) {
		log.info("fest 서비스임플 삭제");
		int result = 0;
		result = festivalDao.festivalDelete(fest_m_id);
		return result;
	}

	@Override
	public FestivalDto festivalDetail(FestivalDto festivalDto) {
		FestivalDto festival = festivalDao.festivalDetail(festivalDto);
		 return festival;
		    }
	

}
