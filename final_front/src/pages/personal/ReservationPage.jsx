import React from 'react'
import TicketCancleInfo from '../../components/mypage/TicketCancleInfo'
import Footer from '../../components/Footer'

const ReservationPage = () => {
    return (

        <section>
            <div className="MainDIv" style={{marginTop:'100px'}}>
                <div className="main_left_div">
                    <div className="mypageBox">
                        <h1>마이페이지</h1>
                    </div>
                </div>{" "}
                {/* main_left_div */}
                <div className="main_center_div">
                    <h1 className="top_line" style={{fontWeight:'bold'}}><i class="bi bi-card-checklist"></i>&nbsp;예매 확인 / 취소</h1>

                    <div className="p_text">
                        <span className="strong_font" style={{fontWeight:'bold'}}>예매번호</span>를 꼭 확인
                        부탁드립니다.
                    </div>

                    <button className="mypage_btn" style={{fontWeight:'bold'}}> 전체조회 </button>

                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col"></th>
                                <th scope="col">예매번호</th>
                                <th scope="col">티켓명</th>
                                <th scope="col">관람일시</th>
                                <th scope="col">매수</th>
                                <th scope="col">취소가능일</th>
                                <th scope="col">상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* 맵돌려야징 */}

                            <tr>
                                <th scope="row">1</th>
                                <td>order_no/fest_m_id</td>
                                <td>fest_m_name</td>
                                <td>ticket_date</td>
                                <td>ticket_amount</td>
                                <td>ticket_date</td>
                                <td>결제완료</td>
                            </tr>

                            {/* 맵돌려야징 */}
                        </tbody>
                    </table>

                    {/* 페이지네이션.....컴포로 옮겨야함... */}
                    <nav aria-label="Page navigation example">
                        <ul className="pagination">
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span className="sr-only">Previous</span>
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    1
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    2
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#">
                                    3
                                </a>
                            </li>
                            <li className="page-item">
                                <a className="page-link" href="#" aria-label="Next">
                                    <span className="sr-only">Next</span>
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    {/* 페이지네이션 여기까지 */}

                    <div className="cancle_info" style={{marginTop:'150px'}}>
                        <TicketCancleInfo></TicketCancleInfo>
                    </div>
                </div>{" "}
                {/* main_center_div */}
            </div>{" "}
            {/* MainDiv */}
            <div style={{marginTop:'150px'}}>
            <Footer/>
            </div>
        </section>
    )
}

export default ReservationPage