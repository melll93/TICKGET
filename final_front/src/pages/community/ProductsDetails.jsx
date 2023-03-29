import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom'
import { FetivalListDB } from '../../axios/main/Festival';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import BoardList from '../board/BoardList';
import Write from '../board/Write';

function ProductsDetails(props){
    let {id} =useParams();
    console.log(id)
    return(
      <>
      <Sidebar />
      <div className="center">
        <Header />

        <div className="container">
        <div className="row">
          <div className="cols-md-6">
          <img src={'../images_key/fev'+[props.festId]+[id]+'.PNG'} width="50%" alt="상품사진" />
          </div>
                <h2>
                    상품 상세페이지....
                    </h2>
                    <a href={"/payment/"+[id]}>
           <h2>
            결제하기 {props.festId}
            </h2>
            </a>
          </div>
        </div>


      </div>




       </>
    )
  }

export default ProductsDetails;