package back.spring.final_back.data.service;

import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.xml.sax.InputSource;

import back.spring.final_back.data.repository.DataDao;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DataServiceImpl implements DataService {
  Logger logger = LoggerFactory.getLogger(DataServiceImpl.class);

  private final DataDao dataDao;

  private static Document convertStringToXMLDocument(String xmlString) {
    // Parser that produces DOM object trees from XML content
    DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();

    // API to obtain DOM Document instance
    DocumentBuilder builder = null;
    try {
      // Create DocumentBuilder with default configuration
      builder = factory.newDocumentBuilder();

      // Parse the content to Document object
      Document doc = builder.parse(new InputSource(new StringReader(xmlString)));
      return doc;
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }

  @Override
  public Object selectIdList() throws IOException {

    List<String> rList = new ArrayList<>();
    rList = dataDao.selectIdList();
    StringBuilder sb = new StringBuilder();

    for (int i = 0; i < 500; i++) {

      String mt20id = rList.get(i);
      StringBuilder urlBuilder = new StringBuilder("http://kopis.or.kr/openApi/restful/pblprfr/" + mt20id
          + "?service=4fed8a19bc55423c803f90cc7bf898fc&mt20id=" + mt20id); /* URL */
      // urlBuilder.append("?" + URLEncoder.encode("serviceKey", "UTF-8") + "=서비스키");
      // /* 서비스키 */
      // urlBuilder.append("&" + URLEncoder.encode("numOfRows", "UTF-8") + "="
      // + URLEncoder.encode("세션당 요청레코드수", "UTF-8")); /* 세션당 요청레코드수 */
      // urlBuilder.append("&" + URLEncoder.encode("pageNo", "UTF-8") + "=" +
      // URLEncoder.encode("페이지수", "UTF-8")); /* 페이지수 */

      URL url = new URL(urlBuilder.toString());
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();

      conn.setRequestMethod("GET");
      conn.setRequestProperty("Content-type", "application/json");
      System.out.println("Response code: " + conn.getResponseCode());

      BufferedReader rd;
      if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
        rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
      } else {
        rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
      }

      String line;
      while ((line = rd.readLine()) != null) {
        sb.append(line);
      }

      rd.close();
      conn.disconnect();
    }

    System.out.println(sb.toString());
    return sb.toString();
  }

}
