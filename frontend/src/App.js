import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutorialsList from "./components/tutorials-list.component";
import RecipeHome from "./components/recipe-home.component";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand">
          <a href="/" className="navbar-brand">
            오늘 뭐 해먹지?
          </a>
          <div className="navbar-nav mr-auto">  
            <li className="nav-item">
              <Link to={"/recipes"} className="nav-link">
                레시피
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                추가
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<RecipeHome/>} />
            <Route path="/recipes" element={<TutorialsList/>} />
            <Route path="/add" element={<AddTutorial/>} />
            <Route path="/recipes/:id" element={<Tutorial/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;