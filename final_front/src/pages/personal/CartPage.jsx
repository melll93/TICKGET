import React from "react";
import Header from "../../components/Header";
import TicketCancleInfo from "../../components/mypage/TicketCancleInfo";
import Sidebar from "../../components/Sidebar";

const CartPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <Header />

        <section className="cart_main_section">
          <div className="main_left_div"></div> {/* main_left_div */}
          <div className="main_center_div">
            <h1 className="top_line">CART / PAYMENT</h1>

            <div className="cart_table_div">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">공연명</th>
                    <th scope="col">판매가</th>
                    <th scope="col">관람일시</th>
                    <th scope="col">매수</th>
                    <th scope="col">주문관리</th>
                    <th scope="col">수령방법</th>
                  </tr>
                </thead>
                <tbody>
                  {/* 맵돌려야징 */}

                  <tr>
                    <th scope="row">1</th>
                    <td>order_no/fest_m_id</td>
                    <td>ticket_price</td>
                    <td>ticket_date</td>
                    <td>ticket_amount</td>
                    <td>
                      <button className="mypage_btn"> 삭제하기 </button>
                    </td>
                    <td>현장발급</td>
                  </tr>

                  {/* 맵돌려야징 */}
                </tbody>
              </table>
            </div>

            <div className="cancle_info">
              <TicketCancleInfo></TicketCancleInfo>
            </div>
          </div>{" "}
          {/* main_center_div */}
        </section>
      </div>
    </>
  );
};

export default CartPage;
