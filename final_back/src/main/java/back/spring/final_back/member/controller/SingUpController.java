package back.spring.final_back.member.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

import back.spring.final_back.member.service.SignUpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/register/*")
@RequiredArgsConstructor
@Slf4j
public class SingUpController {
	private final SignUpService signUpService;
	@GetMapping("memberList")
	// 전체 조회
	public String memberList(@RequestParam Map<String, Object> pMap) {
		log.info("memberList 확인");
		log.info(pMap.toString());
		String temp = null;
		List<Map<String, Object>> mList = new ArrayList<>();
		mList = signUpService.memberList(pMap);
		// 파라미터로 넘어온 닉네임이 회원 집합에 존재하면 조회 결과가 있음 -> mList.size()==1 / 0
		// temp에 문자열이 들어있으면 자바 스크립트에서는 true 판정 /주의점/ 자바와 다름
		if (mList.size() > 0) {
			// 검색 결과가 존재하는 경우
			Gson g = new Gson();
			temp = g.toJson(mList);
		}
		// 해당 계정의 member_uid 없는 경우 회원 가입 유도
		else {
			temp = "0";
		}
		return temp;
	}

	// Insert
	@PostMapping("memberInsert")
	public String memberInsert(@RequestBody Map<String, Object> pMap) {
		log.info("memberInsert 확인");
		log.info(pMap.toString());
		int result = 0;
		result = signUpService.memberInsert(pMap);
		return String.valueOf(result);
	}

	// 회원 정보 Update
	@PostMapping("memberUpdate")
	public String memberUpdate(@RequestBody Map<String, Object> pMap) {
	log.info("memberUpdate 확인");
	log.info(pMap.toString());
	int result = 0;
	String memberPassword = (String) pMap.get("memberPassword");
	/*
	 비밀번호를 그대로 사용하는 경우 인코딩된 비밀번호를 사용하지 않고 기존의 비밀번호 유지 필요
	 */
	if (memberPassword != null && memberPassword.isEmpty()) {
	pMap.put("memberPassword", null);
	}
	result = signUpService.memberUpdate(pMap);
	return String.valueOf(result);
	}
	
	// 비밀번호 Update
	@PostMapping("changePwUpdate")
	public String changePwUpdate(@RequestBody Map<String, Object> pMap) {
		log.info("changePwUpdate 확인");
		log.info(pMap.toString());
		int result = 0;
		result = signUpService.changePwUpdate(pMap);
		return String.valueOf(result);
	}

	// Delete
	@PostMapping("memberDelete")
	public int memberDelete(@RequestBody Map<String, Object> pMap) {
		log.info("memberDelete 확인");
		log.info(pMap+"");
		int result = 0;
		result = signUpService.memberDelete(pMap);
		return result;
	}
}
