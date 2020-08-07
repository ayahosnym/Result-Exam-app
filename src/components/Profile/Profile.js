import React, { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./Profile.scss";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
  const [data, setData] = useState([]);
  //get posts from API
  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
      setData(response.data);
    });
  });

  //display the posts from API
  const display = data.map((value) => {
    if (value.id <= 5) {
      return <li>{value.title}</li>;
    }
  });

  //return component
  return (
    <section id="profile" className="text-center">
      <Row>
        <Col md="12" className="mb-4">
          <h4 className="font-wight-bold">thanks for Your Posts in University Journal</h4>
          <ul>{display}</ul>
        </Col>
        <Col md="12">
          <Link to="/">Back To Result Page</Link>
        </Col>
      </Row>
    </section>
  );
}

export default Profile;
