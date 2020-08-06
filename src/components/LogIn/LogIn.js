import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { Form, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "./LogIn.scss";

export default function LogIn() {
  const [allStudents, getAllStudents] = useState([]);
  const URL = "http://localhost:3000/students";

  // get all student to see if this student exist or not
  useEffect(() => {
    axios.get(URL).then((response) => {
      getAllStudents(response.data);
    });
  });

  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    if (data) {
      for (let student of allStudents) {
        if (
          student.password === data.password &&
          student.email === data.email
        ) {
          localStorage.setItem("currentStudent", JSON.stringify(student));
        }
      }
    }
    history.push("/");
  };

  // function to search  If I have this email in  database or not
  const validateEmail = (value) => {
    for (let student of allStudents) {
      if (student.email === value) return true;
    }
    return false;
  };

  // function to search  to see if this password match with this student or not
  const validatePassword = (value) => {
    for (let student of allStudents) {
      if (student.password === value) return true;
    }
    return false;
  };

  // retun component
  
  return (
    <section id="login">
      <Form noValidate onSubmit={handleSubmit(onSubmit)} className="container">
        <Form.Row className="justify-content-md-center ">
          {/* email */}
          <Form.Group
            as={Col}
            lg="7"
            md="6"
            xs="12"
            controlId="validationCustom01"
          >
            <Form.Control
              type="email"
              name="email"
              placeholder="email"
              ref={register({
                required: true,
                validate: validateEmail,
              })}
            />
            <div>
              {errors.email && (
                <Alert className="alert-error" variant={"danger"}>
                  Not Vaild email!
                </Alert>
              )}
            </div>
          </Form.Group>
          {/* password */}
          <Form.Group
            as={Col}
            lg="7"
            md="6"
            xs="12"
            controlId="validationCustom01"
          >
            <Form.Control
              type="password"
              name="password"
              placeholder="password"
              ref={register({
                required: true,
                validate: validatePassword,
              })}
            />
            <div>
              {errors.password && (
                <Alert className="alert-error" variant={"danger"}>
                  Minimun length 6 characters and must have
                  uppercase,lowercase,number!
                </Alert>
              )}
            </div>
          </Form.Group>
        </Form.Row>
        <Container className="mb-4">
          <Row className="justify-content-md-center">
            <Col md="auto">
              <Button type="submit">Submit</Button>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row className="justify-content-md-center">
            <Col md="auto">
              Don't have an account? <Link to="/register">Register</Link>
            </Col>
          </Row>
        </Container>
      </Form>
    </section>
  );
}
