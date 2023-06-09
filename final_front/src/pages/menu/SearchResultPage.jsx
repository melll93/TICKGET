import React from 'react'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'

const SearchResultPage = () => {
    return (
        <div>
            <Sidebar />
            <div className='center'>
                <Header />
                <p>검색 결과 화면</p>
            </div>
        </div>
    )
}

export default SearchResultPage