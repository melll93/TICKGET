package back.spring.final_back.chat.service;

import back.spring.final_back.chat.repository.ChatDao;
import back.spring.final_back.chat.repository.ChatMessageDto;
import back.spring.final_back.chat.repository.ChatRoomDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatDao chatDao;

    /********************
     * 방이 존재하는지 체크 후 존재한다면 해당 방을 return,
     * 존재하지 않는다면 방을 생성하여 return
     * @param members
     * @return
     */
    @Override
    public int createChatRoom(String[] members) {
        int result = 0;
        boolean isExist = false;
        List<ChatRoomDto> rooms = getOtherMemberInRoom(members[0]);

        for (int i = 0; i < rooms.size(); i++) {
            log.info("getMember : " + rooms.get(i).getChatRoomMember());
            log.info("members[1] : " + members[1]);
            if (rooms.get(i).getChatRoomMember().equals(members[1])) {
                isExist = true;
                result = rooms.get(i).getChatRoomNo();
                break;
            }
        }
        log.info(isExist+"");

        if (isExist) { // 해당 채팅방이 존재하면
            log.info("방번호 : " + result);
            return result;
        } else { // 존재하지 않으면 생성
            int roomNo = chatDao.selectMaxRoomNo() + 1;
            try {
                for (int i = 0; i < members.length; i++) {
                    log.info(members[i]);
                    chatDao.createChatRoom(roomNo, members[i]);
                    result = roomNo;
                }
            } catch (Exception e) {
                e.printStackTrace();
                result = 0;
            }
        }

        return result;
    }

    @Override
    public List<ChatRoomDto> getChatRoomList() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
        log.info(userDetails.getUsername());
        String memberId = userDetails.getUsername();
        return chatDao.getChatRoomList(memberId);
    }

    @Override
    public List<Map<String, Object>> getChatRoomListWithRecentChat() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
        log.info(userDetails.getUsername());
        String memberId = userDetails.getUsername();
        List<Map<String, Object>> result = new ArrayList<>();
        List<ChatRoomDto> list = chatDao.getChatRoomList(memberId);
//        result.add();
        return null;
    }

    @Override
    public int addChat(ChatMessageDto chatMessageDto) {
        log.info(chatMessageDto.toString());
        return chatDao.addChat(chatMessageDto);
    }

    @Override
    public List<ChatMessageDto> getChatByRoom(int roomNo) {
        return chatDao.getChatByRoom(roomNo);
    }

    @Override
    public List<ChatRoomDto> getOtherMemberInRoom(String member) {
        return chatDao.getOtherMemberInRoom(member);
    }
}
