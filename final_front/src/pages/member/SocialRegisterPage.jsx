import React from "react";
import { Button, Form } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

const SocialRegisterPage = () => {
  return (
    <>
      <Sidebar />
      <div className="center">
        <div className="register">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="id" placeholder="ID를 입력해주세요." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password를 입력해주세요."
              />
            </Form.Group>
            <Button variant="primary" type="login">
              로그인
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SocialRegisterPage;
