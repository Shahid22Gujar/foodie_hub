// src/services/MealService.js
import axios from "axios";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const fetchMeals = async (letter) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?f=${letter}`);
    return response.data.meals;
  } catch (error) {
    console.error("Error fetching meals:", error);
    return [];
  }
};
