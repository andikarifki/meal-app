import React from "react";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryDetail from "./components/CategoryDetail";
import MealDetail from "./components/MealDetial";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:category" element={<CategoryDetail />} />
          <Route path="/meal/:mealId" element={<MealDetail />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
