import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./NavbarComponent";

const CategoryDetail = () => {
  const { category } = useParams();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then((response) => response.json())
      .then((data) => {
        setMeals(data.meals);
      })
      .catch((error) => {
        console.error("Error fetching meals:", error);
      });
  }, [category]);

  return (
    <div className="container">
      <NavbarComponent />
      <h2 className="my-3 px-3 text-right">{category}</h2>
      <div className="row">
        {meals ? (
          meals.map((meal) => (
            <div className="col-md-3 mb-1" key={meal.idMeal}>
              <Link
                to={`/meal/${meal.idMeal}`}
                className="text-decoration-none"
              >
                <div
                  className="card"
                  style={{
                    width: "100%",
                    marginBottom: "0px",
                    marginTop: "10px",
                  }}
                >
                  <div className="card-img-wrapper position-relative">
                    <img
                      src={meal.strMealThumb}
                      className="card-img-top"
                      alt={meal.strMeal}
                    />
                    <div className="card-img-overlay d-flex align-items-center justify-content-center">
                      <h5 className="card-title text-white">{meal.strMeal}</h5>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No meals found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
