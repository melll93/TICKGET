import React, { useEffect, useState } from 'react'

const BasicPagination = ({ pagination }) => {

    return (
        <div>
            <input type="button" onClick={(e) => { pagination(e.target.value) }} value={"1"} />
            <input type="button" onClick={(e) => { pagination(e.target.value) }} value={"2"} />
            <input type="button" onClick={(e) => { pagination(e.target.value) }} value={"3"} />
            <input type="button" onClick={(e) => { pagination(e.target.value) }} value={"4"} />
        </div>
    );
}

export default BasicPagination