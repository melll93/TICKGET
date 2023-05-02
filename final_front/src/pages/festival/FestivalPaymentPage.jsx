import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { FetivalDetailDB } from '../../axios/festival/festival'
import PaymentPage from '../personal/PaymentPage'
import Sidebar from '../../components/Sidebar'
import Header from '../../components/Header'
import { Cookies } from 'react-cookie'

const FestivalPaymentPage = () => {
  const cookie = new Cookies();
  const navigate = useNavigate()
  const festSelectedDate = cookie.get('date');
  const festSelectedTkamt = cookie.get('tk_amount');
  const selectedFestTcType = cookie.get('selectedFestTcType');
  const selectedFestTcPrice = cookie.get('selectedFestTcPrice');

  let { festMId } = useParams();
  console.log(festMId);
  const [festival, setFestival] = useState([{
    festMId: "",
    festMName: "",
    festMStart: "",
    festMEnd: "",
    festMLoc: "",
    festMImg: "",
    festPsUrl: "",
    festTcPrice: "",
    festDtRuntime: "",
    festDtAge: "",
  }]);
  useEffect(() => {
    const asyncDB = async () => {
      const res = await FetivalDetailDB({ festMId });
      const result = JSON.stringify(res.data);
/*       console.log(res.data) */
      const jsonDoc = JSON.parse(result);
/*       console.log('리저트'+result)
      console.log(jsonDoc[0].festMName) */
      setFestival({
        festMId,
        festMName: jsonDoc.festMName,
        festMStart: jsonDoc.festMStart,
        festMEnd: jsonDoc.festMEnd,
        festMLoc: jsonDoc.festMLoc,
        festMImg: jsonDoc.festMImg,
        festPsUrl: jsonDoc.festPsUrl,
        festTcPrice: jsonDoc.festTcPrice,
        festDtRuntime: jsonDoc.festDtRuntime,
        festDtAge: jsonDoc.festDtAge,
      });
      if (res.data) {
        setFestival(res.data);
      } else {
        console.log("조회 실패");
      }
    };
    asyncDB();
    return () => {};
  }, []);
 

/* 받아온 날짜변환 */
const date = new Date(festSelectedDate);
const year = date.getFullYear(); 
const month = String(date.getMonth() + 1).padStart(2, '0'); 
const day = String(date.getDate()).padStart(2, '0'); 
const stringfestSelectedDate = `${year}년 ${month}월 ${day}일`; 



  const orderDetail = {
    url: festival[0].festMImg,
    title: festival[0].festMName,
    seat: selectedFestTcType,
    date: stringfestSelectedDate,
    place: festival[0].festMLoc,
    amount: festSelectedTkamt,
    price: selectedFestTcPrice,
    no:festMId
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="center">
        {" "}
        {/* -PaymentPage에 center 있음 */}
        <PaymentPage orderDetail={orderDetail}></PaymentPage>
      </div>
    </>
  );
};

export default FestivalPaymentPage;
