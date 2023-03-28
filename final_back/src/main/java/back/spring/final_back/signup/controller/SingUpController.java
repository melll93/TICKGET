package back.spring.final_back.signup.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import back.spring.final_back.signup.service.SignUpService;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/signup")
@RequiredArgsConstructor
public class SingUpController {
  private SignUpService signUpService = null;
  // Insert
	@GetMapping("memberInsert")
	public String memberInsert(@RequestBody Map<String, Object> pMap) {
		int result = 0;
		result = signUpService.memberInsert(pMap);
		return String.valueOf(result);
	}
	// Update
	@PostMapping("memberUpdate")
	public String memberUpdate(@RequestBody Map<String, Object> pMap) {
		int result = 0;
		result = signUpService.memberUpdate(pMap);
		return String.valueOf(result);
	}
	// Delete
	@GetMapping("memberDelete")
	public String memberDelete(@RequestParam Map<String, Object> pMap) {
		int result = 0;
		result = signUpService.memberDelete(pMap);
		return String.valueOf(result);
	}
}
