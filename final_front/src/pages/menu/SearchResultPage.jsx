import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { searchCarpoolListDB, searchFetivalListDB, searchMarketListDB } from '../../axios/festival/search/search';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CommonPagination from '../../components/mainpage/CommonPagination';
import Footer from '../../components/Footer';

const SearchResultPage = () => {

const {keyword} = useParams();
console.log(keyword);
const [searchResults, setSearchResults] = useState([]);
const [searchResults2, setSearchResults2] = useState([]);
const [searchResults3, setSearchResults3] = useState([]);

 
  const [page, setPage] = useState(1);   
  const [perPage] = useState(5);  

  const indexOfLastPost = page * perPage;
  const indexOfFirstPost = indexOfLastPost - perPage;

  const currentFest = (searchResults) => {
    let currentFest = 0;
    currentFest = searchResults.slice(indexOfFirstPost, indexOfLastPost);
    return currentFest;
  };



  useEffect(() => {
    async function areaList() {
        const data = await searchFetivalListDB(keyword);
        const data2 = await searchCarpoolListDB(keyword);
        const data3 = await searchMarketListDB(keyword);
  /*     console.log(data);
      console.log(data2); */
      console.log(data3);
      setSearchResults(data);
      setSearchResults2(data2);
      setSearchResults3(data3);
      
    }
    areaList();
  }, [keyword]);


    return (
        <>
            <Header />
            <Sidebar />
            <div className='center' style={{margin:'40px'}}>
      <h2 style={{textAlign:'center', margin:'30px'}}>요청 검색어 :  "{keyword}"</h2>
            <div style={{marginLeft:'40px', display:'flex'}}>
            {/* 페스티벌 */}
            <div style={{borderRight:'1px dotted gray', flex:'1'}}>
      <ul>
      {searchResults && searchResults.length > 0 ? (
  <><ul>
    {currentFest(searchResults).map((item,i) => (
     <li key={i}><img src={item.festMImg} style={{width:'50px', height:'70px', borderRadius:'5px', marginBottom:'10px'}}/><Link to={`http://localhost:3333/productsDetail/${item.festMId}`}> {item.festMName}</Link>- {item.festMLoc}</li>
    ))}
  </ul>  <CommonPagination pagination={setPage} perPage={perPage} totalItems={searchResults.length}/></>
) : (
  <h2>검색 결과가 없습니다.</h2>
)}
      </ul>
    </div>
            {/* 페스티벌 */}

            {/* 카풀/마켓게시판 */}
<div style={{borderLeft:'1px dotted gray', flex:'1'}}> 

{/* 카풀 */}
<div style={{borderBottom:'1px dotted gray'}}>
            <ul>
             "카풀게시판"
      {searchResults2 && searchResults2.length > 0 ? (
  <ul>
    {searchResults2.map((item,i) => (
     <li key={i}> 
<Link to={`http://localhost:3333/carpool/carpoolDetail/${item.boardCpNo}`}> {item.boardCpTitle}</Link>- {item.boardCpMemId}
</li>
      ))}
  </ul>
) : (
    <h2>검색 결과가 없습니다.</h2>
    )}
      </ul>
      </div>
      {/* 카풀 */}

      {/* 마켓 */}
      <ul>
             "마켓게시판"
      {searchResults3 && searchResults3.length > 0 ? (
  <ul>
    {searchResults3.map((item,i) => (
     <li key={i}> 
<Link to={`http://localhost:3333/market/mk_boardDetail?no=${item.boardMkNo}`}> {item.boardMkTitle}</Link>- {item.mkTicketSeat}
</li>
      ))}
  </ul>
) : (
    <h2>검색 결과가 없습니다.</h2>
    )}
      </ul>





      
    </div>
            {/* 카풀/마켓게시판 */}

            </div>
            </div>{/* center */}
        </>
    )
}

export default SearchResultPage