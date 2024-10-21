import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "./NavbarComponent";

const MealDetail = () => {
  const { mealId } = useParams(); // Get mealId from URL
  const [meal, setMeal] = useState(null);

  useEffect(() => {
    // Fetch meal details using the meal's ID
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then((response) => response.json())
      .then((data) => {
        setMeal(data.meals[0]); // Set meal data
      })
      .catch((error) => {
        console.error("Error fetching meal details:", error);
      });
  }, [mealId]);

  return (
    <div className="container">
      <NavbarComponent />
      {meal ? (
        <div className="row my-4">
          <h2>{meal.strMeal}</h2>
          <div className="col-md-6">
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <p>
              <strong>Instructions:</strong>
            </p>
            <p>{meal.strInstructions}</p>
            <h5>Recipes:</h5>
            <ul>
              {Array.from({ length: 20 }).map((_, index) => {
                const ingredient = meal[`strIngredient${index + 1}`];
                const measure = meal[`strMeasure${index + 1}`];
                return ingredient ? (
                  <li key={index}>
                    {ingredient} - {measure}
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      ) : (
        <p>Loading meal details...</p>
      )}
    </div>
  );
};

export default MealDetail;
