import React from 'react'
import { Table } from "react-bootstrap";

const BasicTable = () => {
    return (
        <Table striped bordered hover>
            <tbody>
                <tr>
                    <td>1</td>
                    <td colSpan={2}>글 제목 1</td>
                    <td>시간</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td colSpan={2}>글 제목 2</td>
                    <td>시간</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td colSpan={2}>글 제목 3</td>
                    <td>시간</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td colSpan={2}>글 제목 4</td>
                    <td>시간</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td colSpan={2}>글 제목 5</td>
                    <td>시간</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td colSpan={2}>글 제목 6</td>
                    <td>시간</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default BasicTable