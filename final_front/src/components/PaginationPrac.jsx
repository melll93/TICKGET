import React, { useEffect, useState } from 'react'
import { Pagination } from 'react-bootstrap';
// import { Pagination } from '@mui/material'

const PaginationPrac= ({currentFest, pagination, perPage, totalFest}
 ) => {
const pageNum=[];

for(let i = 1; i<Math.ceil(totalFest/perPage); i++){
    pageNum.push(i);
}


    return (
        <div>
            <nav>
<ul className="pagination" >
    {pageNum.map(num=><li key={num}> &nbsp;
        <a style={{ borderRadius:'50%', backgroundColor:'yellow'}} onClick={()=>pagination(num)} >{num} </a> 
    </li>
)}


</ul>

            </nav>

<Pagination  count={Math.ceil(totalFest/perPage)}  color="secondary" /> {/* ...? ...? */}

        </div>
    );
}

export default PaginationPrac


