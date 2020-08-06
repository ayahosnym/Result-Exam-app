import React, { useState, useEffect } from "react";
import { Alert, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import { Form, Col, Container, Row } from "react-bootstrap";

import axios from "axios";
import "./Register.scss";

export default function Register() {
  //get all students from database to see if I already have this student or not
  const [allStudents, getAllStudents] = useState([]);
  useEffect(() => {
    axios.get(URL).then((response) => {
      getAllStudents(response.data);
    });
  });

  // varibles I will use it in form validation
  const { register, handleSubmit, errors, reset } = useForm();
  const URL = "http://localhost:3000/students";
  const history = useHistory();
  const emailPattern = /^[a-zA-Z0-9._-]+@(gmail|yahoo|hotmail).[a-z]{2,}$/;
  const passwordPattern = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}/;

  const onSubmit = (data) => {
    if (data) {
      axios.post(URL, data);
      reset({});
      history.push("/");
      localStorage.setItem("currentStudent", JSON.stringify(data));
      console.log(data);
    }
  };

  //function to get student name with conditions
  const validateName = (value) => {
    if (typeof value !== "string") return false;

    for (let student of allStudents) {
      if (student.name === value) return false;
    }

    return true;
  };
  //function to get student email with conditions

  const validateEmail = (value) => {
    if (!value.match(emailPattern)) return false;

    for (let student of allStudents) {
      if (student.email === value) return false;
    }
    return true;
  };

  //function to get student password with conditions
  const validatePassword = (value) => {
    if (!value.match(passwordPattern)) return false;
    return true;
  };
  //function to get student ID "رقم الجلوس" with conditions
  const validateId = (value) => {
    if (value < 5000 || value > 5006) return false;
    return true;
  };

  // component return
  return (
    <section id="register">
      <Form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="container"
      >
        <Form.Row className="justify-content-md-center">
          {/* name */}
          <Form.Group
            as={Col}
            lg="7"
            md="6"
            xs="12"
            controlId="validationCustom01"
          >
            <Form.Control
              type="text"
              name="name"
              placeholder="Full Name"
              ref={register({
                required: true,
                minLength: 12,
                validate: validateName,
              })}
            />
            <div>
              {errors.name && (
                <Alert className="alert-error" variant={"danger"}>
                  Not Vaild name!
                </Alert>
              )}
            </div>
          </Form.Group>
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
          {/* ID */}
          <Form.Group
            as={Col}
            lg="7"
            md="6"
            xs="12"
            controlId="validationCustom01"
          >
            <Form.Control
              type="number"
              name="id"
              placeholder="Your ID"
              ref={register({
                required: true,
                validate: validateId,
              })}
            />
            <div>
              {errors.id && (
                <Alert className="alert-error" variant={"danger"}>
                  Not Vaild ID!
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
              You already have an account? <Link to="/login">logIn</Link>
            </Col>
          </Row>
        </Container>
      </Form>
    </section>
  );
}
