import React from 'react'
import { Link } from 'react-router-dom'

const BoardRow = ({board}) => {
  return (
    <>
      <tr>
        <td>{board.BM_NO}</td>
        <td><Link to={"/selectBoardDetail/"+board.BM_NO} className="btn btn-sprimary">{board.BM_TITLE}</Link></td>
        <td>{board.BM_WRITER}</td>
      </tr>
    </>
  )
}

export default BoardRow
