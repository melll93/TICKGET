package back.spring.final_back.signup.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import back.spring.final_back.signup.service.SignUpService;

@RestController
@RequestMapping("/signup")
public class SingUpController {
  private SignUpService signUpService = null;
  public String memberInsert(@RequestBody Map<String, Object> pMap) {
		int result = 0;
		result = signUpService.memberInsert(pMap);
		return String.valueOf(result);
	}

}
