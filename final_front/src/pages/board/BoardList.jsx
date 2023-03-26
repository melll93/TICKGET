import { Component } from "react";
import Table from "react-bootstrap/Table";

/**
 * BoardList class
 */
class BoardList extends Component {
    /**
     * @return {Component} Component
     */
    render() {
        return (
            <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={{textAlign:"center",width:"80px"}}>번호</th>
                        <th>제목</th>
                        <th style={{textAlign:"center",width:"180px"}}>작성자</th>
                        <th style={{textAlign:"center",width:"250px"}}>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{textAlign:"center"}}>1</td>
                        <td>게시글1</td>
                        <td style={{textAlign:"center"}}>artistJay</td>
                        <td style={{textAlign:"center"}}>2023-03-26</td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"center"}}>2</td>
                        <td>게시글2</td>
                        <td style={{textAlign:"center"}}>artistJay</td>
                        <td style={{textAlign:"center"}}>2023-03-26</td>
                    </tr>
                    <tr>
                        <td style={{textAlign:"center"}}>3</td>
                        <td>게시글2</td>
                        <td style={{textAlign:"center"}}>artistJay</td>
                        <td style={{textAlign:"center"}}>2023-03-26</td>
                    </tr>
                </tbody>
            </Table>
            </>
        );
    }
}

export default BoardList;