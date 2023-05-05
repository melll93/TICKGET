package back.spring.final_back.festival.service;

import java.util.List;

import org.springframework.stereotype.Service;

import back.spring.final_back.festival.repository.OpenSoonDao;
import back.spring.final_back.festival.repository.OpenSoonDto;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OpenSoonServiceImpl implements OpenSoonService {

private final OpenSoonDao openSoonDao;

  @Override
  public List<OpenSoonDto> OpenSoonList() {

    List<OpenSoonDto> osList = openSoonDao.OpenSoonList();
    return osList;

  }

}
