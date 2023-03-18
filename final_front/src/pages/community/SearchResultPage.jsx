import React from 'react'
import Gnb from '../../components/Gnb'
import Sidebar from '../../components/Sidebar'

const SearchResultPage = () => {
    return (
        <div>
            <Gnb />
            <Sidebar />
            <div className='center'>
                <p>검색 결과 화면</p>
            </div>
        </div>
    )
}

export default SearchResultPage