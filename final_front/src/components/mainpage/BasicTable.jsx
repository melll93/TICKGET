import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserProfile from "../sidebar/UserProfile";
import { searchById } from "../../axios/member/member";

/* const items = {
  no: festival.festMImg,
  title: festival.festMName,
  detail: festival.festMName,
  url:,  
  link:
}; */


const BasicTable = ({ items }) => {
  // console.log('베이직테이블'+items)
  // console.log(items)

  const [writers, setWriters] = useState()

  //작성자 정보 가져오기
  useEffect(() => {
    const fetchWriters = async () => {
      const writerPromises = items.map(item => searchById(item.writer));
      const writers = await Promise.all(writerPromises);
      setWriters(writers);
    }
    fetchWriters();
  }, [items]);

  // console.log(writers);

  return (
    <Table hover>
      <tbody>
        {items.slice(0, 5).map((item, index) => (
          <tr key={index}>
            <td>
              {item.url != null && item.url !== "" ? (
                <img src={item.url} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
              ) : (
                writers[index] && <UserProfile _userData={writers[index]} />
              )}
            </td>
            <td colSpan={2}>
              <Link to={`${item.link}${item.no}`} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
                {item.title}
              </Link>
            </td>
            <td style={{ fontWeight: 'bold' }}>
              {item.detail}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BasicTable;

