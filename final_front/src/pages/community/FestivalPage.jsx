import React, { useState } from "react";
import { Link } from "react-router-dom";
import Gnb from "../../components/Gnb";
import Sidebar from "../../components/Sidebar";
import data from './data';


function ProductsItems(props){
  return (
           <div className="col-md-4">
              <a href={'/productsDetail/'+props.i}>
              <img  src={'images_key/fev'+props.i+'.PNG'} width="30%" alt="사진1"/>
                 </a>
                 <h4>{props.dumdt.title}</h4>
               <p>티켓가격 : {props.dumdt.price}원</p> <br/>
               <p>{props.dumdt.desc}</p><br/>
               <p>id : {props.dumdt.id}</p><br/>
               <p>행사일 : {props.dumdt.date}</p><br/> 
          </div>
  );
}


const Products=()=>{
  let [dumdt] = useState(data);
  return(
    <>
    <div>
        {
          dumdt.map((a, i)=>{
            return(
              <ProductsItems  key={dumdt[i].id} dumdt={dumdt[i]} i={i+1} ></ProductsItems>
              )    
            })
          }

        </div>

    </>
  )
}




const FestivalPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Gnb />
        Festival
        <Link to="/addProducts">상품등록</Link>
        <Products />
      </div>
    </>
  );
};

export default FestivalPage;
