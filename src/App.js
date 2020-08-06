
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ExamResults from "./components/ExamResults/ExamResults";
import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={ExamResults} />
        <Route path="/login" component={LogIn} />
        <Route path="/register" component={Register}/>
        <Route path="/profile" component={Profile}/>
      </Router>
    </div>
  );
}

export default App;
