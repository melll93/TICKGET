package back.spring.final_back.data.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface DataDao {
  public List<String> selectIdList();
}
