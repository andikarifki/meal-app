// Home.js
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import "./Home.css"; // Import CSS file

function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch data from the MealDB API
    fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.categories); // Set the fetched categories to state
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []); // Empty dependency array means this will run once when the component mounts

  return (
    <>
      <NavbarComponent />

      <header className="py-5 text-center">
        <h4>Meal API Website</h4>
        <h1>See All The Delicious Foods</h1>
      </header>

      <div className="container py-3">
        <div className="row">
          {categories.map((category) => (
            <div
              className="col-md-3 d-flex align-items-stretch"
              key={category.idCategory}
            >
              <Link
                to={`/category/${category.strCategory}`}
                className="text-decoration-none text-reset"
              >
                <div className="card mb-4">
                  <div className="card-img-wrapper">
                    <img
                      src={category.strCategoryThumb}
                      className="card-img-top"
                      alt={category.strCategory}
                    />
                    <div className="card-img-overlay">
                      <h5 className="card-title">{category.strCategory}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
