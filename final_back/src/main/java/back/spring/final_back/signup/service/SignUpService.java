package back.spring.final_back.signup.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;

public interface SignUpService {
  // 자바 메일을 사용하여 이메일 전송
/*   @Autowired
    private JavaMailSender javaMailSender;*/



  int memberInsert(Map<String, Object> pMap);
}
