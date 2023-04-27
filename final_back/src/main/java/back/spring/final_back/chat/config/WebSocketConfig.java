//
//package back.spring.final_back.chat.config;
//
//import back.spring.final_back.chat.service.ChatHandler;
//import lombok.RequiredArgsConstructor;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.socket.config.annotation.EnableWebSocket;
//import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
//import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
//
//@Configuration
//@RequiredArgsConstructor
//@EnableWebSocket
//public class WebSocketConfig implements WebSocketConfigurer {
//
//  private final ChatHandler chatHandler;
//
//  @Override
//  public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
//    registry.addHandler(chatHandler, "ws/chat")
//            .setAllowedOrigins("http://localhost:3333")
//            .withSockJS() // WebSocket을 지원하지 않는 브라우저 환경에서 WebSocket을 Polling같은 기능으로 변환하여 사용 가능케 해주는 것.
//            .setClientLibraryUrl("https://cdnjs.cloudflare.com/ajax/libs/sockjs-client/1.6.1/sockjs.min.js");
//
//  }
//}
