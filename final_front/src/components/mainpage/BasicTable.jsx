import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

/* const items = {
  no: festival.festMImg,
  title: festival.festMName,
  detail: festival.festMName,
  url:,  
  link:
}; */


const BasicTable =({ items }) => {
  console.log('베이직테이직'+items)
  return (
    <Table hover>
    <tbody>
    {items.slice(0,5).map((item) => (
      <tr key={item.no}> {/* 각 행에 고유한 key prop을 지정해주는 것이 좋습니다. */}
        <td>
          {item.url ===""?<img src="./images_key/WOONGS.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          ></img> : <img src={item.url} style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          ></img>

          }
          
        </td>
          <Link to={`${item.link}${item.no}`} style={{textDecoration:'none', color:'black'}}>
        <td colSpan={2}>{item.title}</td>
        </Link>
        <td>{item.detail}</td>
      </tr>
    ))}
  </tbody>
</Table>
  );
};

export default BasicTable;

