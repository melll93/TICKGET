import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import { searchFetivalListDB } from '../../axios/search/search';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SearchResultPage = () => {

const {keyword} = useParams();
console.log(keyword);
const [searchResults, setSearchResults] = useState([]);

/* useEffect(() => {
    const searchFestivals = async () => {
      const res = await searchFetivalListDB({ keyword });
      setSearchResults(res);
      console.log(res);
    };
    searchFestivals();
  }, [keyword]); */



  useEffect(() => {
    async function areaList() {
        const data = await searchFetivalListDB(keyword);
      console.log(data);
      setSearchResults(data);
    }
    areaList();
  }, [keyword]);


    return (
        <div>
            <Header />
            <Sidebar />
            <div className='center'style={{margin:'80px'}}>
            
            <div>
      <h2>요청 검색어 :  "{keyword}"</h2>
      <ul>
      {searchResults && searchResults.length > 0 ? (
  <ul>
    {searchResults.map((item,i) => (
     <li key={i}><img src={item.festMImg} style={{width:'50px', borderRadius:'5px', marginBottom:'10px'}}/><Link to={`http://localhost:3333/productsDetail/${item.festMId}`}> {item.festMName}</Link>- {item.festMLoc}</li>
    ))}
  </ul>
) : (
  <h2>검색 결과가 없습니다.</h2>
)}
      </ul>
    </div>


            </div>
        </div>
    )
}

export default SearchResultPage