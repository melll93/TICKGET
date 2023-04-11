package back.spring.final_back.board.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.google.gson.Gson;

import back.spring.final_back.board.repository.TogetherDto;
import back.spring.final_back.board.service.TogetherService;
import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Controller
@ResponseBody
@CrossOrigin("http://localhost:3333")
@RequestMapping("/board")
@RequiredArgsConstructor
public class TogetherController {
    Logger logger = LoggerFactory.getLogger(TogetherController.class);
    private final TogetherService togetherService;

    // 게시판 조회(SelectAll)
    @GetMapping("/selectBoardList")
    public List<TogetherDto> selectBoardList() {
        logger.info("BoardController : selectBoardList 호출");
        List<TogetherDto> mList = null;
        mList = togetherService.selectBoardList();
        return mList;
    }

    // 게시글 상세보기(SelectOne)
    @GetMapping("/selectBoardDetail")
    public TogetherDto selectBoardDetail(TogetherDto togetherDto) {
        logger.info("BoardController : selectBoardDetail 호출");
        TogetherDto mList = togetherService.selectBoardDetail(togetherDto);
        return mList;
    }

    // 게시판 등록(Insert)
    @GetMapping("/insertBoardList")
    public int insertBoardList(TogetherDto togetherDto) {
        logger.info("BoardController : inserBoard호출");
        int result = togetherService.insertBoardList(togetherDto);
        return result;
    }

	// 게시글 수정(Update)
	@GetMapping("/updateBoardList")
	public TogetherDto updateBoardList(TogetherDto togetherDto) {
		logger.info("RestMemberController : memberUpdate select");
		TogetherDto mList = togetherService.selectBoardDetail(togetherDto);
		return mList;
	}

    // 게시판 수정(Update)
    @PostMapping("/updateBoardList")
    public int updateBoardListSubmit(@RequestBody TogetherDto togetherDto) {
        logger.info("RestMemberController : memberUpdate submit");
        int result = 0;
		logger.error("boardDto = {}", togetherDto);
        result = togetherService.updateBoardList(togetherDto);
        return result;
    }

    // 게시판 삭제(Delete)
    @GetMapping("/deleteBoardList")
    public int deleteBoardList(TogetherDto togetherDto) {
        logger.info("RestMemberController : memberDelete 호출");
        int result = 0;
        result = togetherService.deleteBoardList(togetherDto);
        return result;
    }

    @GetMapping("/imageGet")
	public Object imageGet(HttpServletRequest req, HttpServletResponse res) {
		// imagename 정보는 공통코드로 제공된 QuillEditor.jsx에서 파라미터로 넘어오는 값임
		// imageupload 메소드에서는 업로드된 파일정보(팜일명, 파일크기)가 리턴됨
		String b_file = req.getParameter("imageName");// get방식으로 넘어온
		logger.info("imageGet 호출 성공===>" + b_file);// XXX.png

         /* --------------클라우드 너리 써야 하나요..?-------------- */
		String filePath = "C:\\Users\\user1\\Desktop\\practice"; // 절대경로.
        /* --------------클라우드 너리 써야 하나요..?-------------- */

		String fname = b_file;
		logger.info("b_file: 8->euc" + b_file);
		File file = new File(filePath, b_file.trim());
		String mimeType = req.getServletContext().getMimeType(file.toString());
		logger.info(mimeType);// image, video, text

		if (mimeType == null) { // 마임타입이 null이면
			res.setContentType("application/octet-stream");
		}
		String downName = null;
		FileInputStream fis = null;
		ServletOutputStream sos = null;

		try {
			if (req.getHeader("user-agent").indexOf("MSIE") == -1) {
				downName = new String(b_file.getBytes("UTF-8"), "8859_1");
			} else {
				downName = new String(b_file.getBytes("EUC-KR"), "8859_1");
			}
			// 응답헤더에 다운로드 될 파일명을 매핑하기
			res.setHeader("Content-Disposition", "attachment;filename=" + downName);
			fis = new FileInputStream(file);
			sos = res.getOutputStream();
			byte b[] = new byte[1024 * 10];
			int data = 0;

			while ((data = (fis.read(b, 0, b.length))) != -1) {
				sos.write(b, 0, data);
			}
			sos.flush();
		} catch (Exception e) {
			logger.info(e.toString());
		} finally {
			try {
				if (sos != null)
					sos.close();
				if (fis != null)
					fis.close();
			} catch (Exception e2) {
				// TODO: handle exception
			}
		}
		return null;
	}// end of imageGet

	// 파일 업로드
	@PostMapping("/fileUpload")
	public Object fileUpload(MultipartHttpServletRequest mRequest,
			@RequestParam(value = "file_name", required = false) MultipartFile file_name) {
		logger.info("fileUpload 호출 성공");
		// 사용자가 선택한 파일 이름 담기
		String filename = null;
		if (!file_name.isEmpty()) {
			filename = file_name.getOriginalFilename();
             
            /* --------------클라우드 너리 써야 하나요..?-------------- */
			String saveFolder = "C:\\Users\\user1\\Desktop\\practice";
             /* --------------클라우드 너리 써야 하나요..?-------------- */
            
			String fullPath = saveFolder + "\\" + filename;
			try {
				File file = new File(fullPath);
				byte[] bytes = file_name.getBytes();
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				bos.write(bytes);
				bos.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		String temp = filename;
		return temp;
	}

	// 이미지 업로드
	@PostMapping("/imageUpload")
	public Object imageUpload(MultipartHttpServletRequest mRequest,
			@RequestParam(value = "image", required = false) MultipartFile image) {
		logger.info("imageUpload 호출 성공");
		// 사용자가 선택한 파일 이름 담기
		String filename = null;
		if (!image.isEmpty()) {
			filename = image.getOriginalFilename();

            /* --------------클라우드 너리 써야 하나요..?-------------- */
			String saveFolder = "C:\\Users\\user1\\Desktop\\practice";
            /* --------------클라우드 너리 써야 하나요..?-------------- */

			String fullPath = saveFolder + "\\" + filename;
			try {
				File file = new File(fullPath);
				byte[] bytes = image.getBytes();
				BufferedOutputStream bos = new BufferedOutputStream(new FileOutputStream(file));
				bos.write(bytes);
				bos.close();
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
		String temp = filename;
		return temp;
	}

    @GetMapping("/qnaList")
	public String boardList(@RequestParam Map<String, Object> pMap) {
		logger.info("qnaList 호출");
		List<Map<String, Object>> bList = null;
		bList = togetherService.qnaList(pMap);
		Gson g = new Gson();
		String temp = g.toJson(bList);
		return temp;
	}

	@PostMapping("qnaInsert")
	public String qnaInsert(@RequestBody Map<String, Object> pMap) {
		logger.info("qnaInsert호출");
		logger.info(pMap.toString());
		int result = 0;
		result = togetherService.qnaInsert(pMap);
		return String.valueOf(result);
	}
}
