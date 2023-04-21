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


const BasicTable = ({ items }) => {
  // console.log('베이직테이직'+items)
  return (
    <Table hover>
<tbody>
        {items.slice(0, 5).map((item, index) => (
          <tr key={index}> 
            <td>
              {item.url === "" ? <img src="./images_key/WOONGS.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              ></img> : <img src={item.url} style={{ width: "40px", height: "40px", borderRadius: "50%" }}
              ></img>
              }
            </td><td colSpan={2}><Link to={`${item.link}${item.no}`} style={{textDecoration:'none', color:'black'}}>{item.title}</Link></td><td>
                  {item.detail}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BasicTable;

