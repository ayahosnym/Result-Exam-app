import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExamResults.css";
import Navigation from "../Navigation/Navigation";

const currentStudent = JSON.parse(localStorage.getItem("currentStudent"));
function ExamResults() {
  const [results, setResult] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/results").then((response) => {
      setResult(response.data);
    });
  });

  const getResult = results.map((data) => {
    if (currentStudent) {
      if (data.id == currentStudent.id) {
        return <li>congrates your result is : {data.result}</li>;
      }
    }
  });
  return (
    <div>
      <Navigation />
      <h1> helllo there I am waiting </h1>
      this is : {getResult}
    </div>
  );
}

export default ExamResults;
