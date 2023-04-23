package back.spring.final_back.chat.service;

import back.spring.final_back.chat.repository.ChatDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService{

    private final ChatDao chatDao;
    @Override
    public int createChatRoom(Map<String, String> chatMember) {
        return 0;
    }

    @Override
    public Map<String, Object> getChatRoom() {
        Authentication userAuth = SecurityContextHolder.getContext().getAuthentication();
        UserDetails userDetails = (UserDetails) userAuth.getPrincipal();
        log.info(userDetails.getUsername());
        String memberId = userDetails.getUsername();
        return chatDao.getChatRoom(memberId);
    }
}
