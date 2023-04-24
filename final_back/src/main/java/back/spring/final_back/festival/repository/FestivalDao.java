package back.spring.final_back.festival.repository;

import java.sql.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
public interface FestivalDao {
	public List<FestivalDto> festivalDetail(FestivalDto festivalDto);
	public List<FestivalDto> festivalDetail2(FestivalDto festivalDto);
	
    public List<FestivalDto> festivalListByDate(Date date);

    public List<FestivalDto> festivalList();

    public List<FestivalDto> areaFestivalList(String area);

    int festivalInsert(FestivalDto festival);

    public int festivalDelete(String fest_m_id);

    public List<FestivalDto> festivalHitList();
    
    public void festivalThumpsUp(Map<String, Object> pMap);


	public int festDetailInsert(FestivalDto festivalDto);

	public int festPosterInsert(FestivalDto festivalDto);


	public int festTicketInsert(FestivalDto festivalDto);


  public int festivalUpdate(FestivalDto festivalDto);

  public int festivalPosterDelete(int fest_ps_no);
public int festivalDetailUpdate(FestivalDto festivalDto);
public int festivalTicketDelete(int fest_tc_no);
}
