import React from 'react'
import { Table } from "react-bootstrap";

const BasicTable = () => {
    return (
        <Table solid hover>
            <tbody>
                <tr style={{borderBottom:'white'}}>
                    <td><img src="./images_key/WOONGS.jpg" style={{width:'40px', height:'40px', borderRadius:'50%'}}></img></td>
                    <td colSpan={2}>fest_m_name 1</td>
                    <td>runtime</td>
                </tr>
                <tr style={{borderBottom:'white'}}>
                <td><img src="./images_key/WOONGS.jpg" style={{width:'40px', height:'40px', borderRadius:'50%'}}></img></td>
                    <td colSpan={2}>fest_m_name 2</td>
                    <td>runtime</td>
                </tr>
                <tr style={{borderBottom:'white'}}>
                <td><img src="./images_key/WOONGS.jpg" style={{width:'40px', height:'40px', borderRadius:'50%'}}></img></td>
                    <td colSpan={2}>fest_m_name 3</td>
                    <td>runtime</td>
                </tr>
                <tr style={{borderBottom:'white'}}>
                <td><img src="./images_key/WOONGS.jpg" style={{width:'40px', height:'40px', borderRadius:'50%'}}></img></td>
                    <td colSpan={2}>fest_m_name 4</td>
                    <td>runtime</td>
                </tr>
                <tr style={{borderBottom:'white'}}>
                <td><img src="./images_key/WOONGS.jpg" style={{width:'40px', height:'40px', borderRadius:'50%'}}></img></td>
                    <td colSpan={2}>fest_m_name 5</td>
                    <td>runtime</td>
                </tr>

            </tbody>
        </Table>
    )
}

export default BasicTable