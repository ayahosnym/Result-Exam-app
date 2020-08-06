import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ExamResults.scss";
import Navigation from "../Navigation/Navigation";

const currentStudent = JSON.parse(localStorage.getItem("currentStudent"));

function ExamResults() {
  const [results, setResults] = useState([]);

  // get  all student result then see the current student to show his result
  useEffect(() => {
    axios.get("http://localhost:3000/results").then((response) => {
      setResults(response.data);
    });
  });

  //display result
  const getResult = results.map((value) => {
    if (currentStudent && value.id == currentStudent.id) {
      
      return <h3> Your Result is : {value.result} from 1000</h3>;
    }
  });

  return (
    <section id="exam-result">
      <Navigation />
      <div className="text-center my-5">{getResult}</div>
    </section>
  );
}

export default ExamResults;
