import { Component } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

/**
 * Write class
 */
class Write extends Component {
    /**
     * @return {Component} Component
     */
    render() {
        return (
            <div>
                <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>제목</Form.Label>
                        <Form.Control type="text" placeholder="제목을 입력하세요" />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>내용</Form.Label>
                        <Form.Control as="textarea" placeholder="내용을 입력하세요" />
                    </Form.Group>
                </Form>
                <Button style={{backgroundColor:"black"}}>작성완료</Button>
                &nbsp;
                
                <Button style={{backgroundColor:"black"}}>취소</Button>
            </div>
        );
    }
}

export default Write;