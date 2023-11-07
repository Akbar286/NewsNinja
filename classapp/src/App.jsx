import "./App.css";
import React, { Component } from "react";
import NavBar from "./componets/NavBar";
import News from "./componets/News";

import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div> 
        <Router>
          <NavBar />
          {/* <News pageSize={6} country="in" category="general" /> */}
          <Routes>
            {/* passing key so that it will render the elements otherwise it won't work, it will render the News element which is in line no 14*/}
            <Route  path="/" element={<News key="general" pageSize={6} country="in" category="general" />}></Route>
            <Route  path="/business" element={<News key="business" pageSize={6} country="in" category="business" />}></Route>
            <Route  path="/entertainment" element={<News key="entertainment" pageSize={6} country="in" category="entertainment" />} ></Route>
            <Route  path="/general" element={<News key="general" pageSize={6} country="in" category="general" />}></Route>
            <Route  path="/health" element={<News key="health" pageSize={6} country="in" category="health" />}></Route>
            <Route  path="/science" element={<News key="science" pageSize={6} country="in" category="science" />}></Route>
            <Route  path="/sports" element={<News key="sports" pageSize={6} country="in" category="sports" />}></Route>
            <Route  path="/technology" element={<News key="technology" pageSize={6} country="in" category="technology" />}></Route>
          </Routes>
        </Router>
      </div>
    ); 

}
}
