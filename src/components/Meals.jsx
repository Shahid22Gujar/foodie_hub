// src/components/Meals.js
import {useContext,useEffect,useState} from "react";
import IndividualMealItem from "./IndividualMealItem";
import { Container } from "react-bootstrap";
import { CartContext } from "../store/CartContext";
import { fetchMeals } from "../services/MealService";


const Meals = () => {
    const [meals, setMeals] = useState([{
    id: "m1",
    name: "Cheese Burger",
    description: "Juicy beef patty with cheese",
    image:"meal.jpg",
    price: 5.99,
  },
  {
    id: "m2",
    name: "Pepperoni Pizza",
    description: "Crispy crust with spicy pepperoni",
    image:"meal.jpg",
    price: 8.99,
  },
  {
    id: "m3",
    name: "Pasta Carbonara",
    description: "Creamy pasta with bacon",
    image:"meal.jpg",
    price: 7.5,
  },
  {
    id: "m4",
    name: "Grilled Chicken Salad",
    description: "Fresh greens with grilled chicken",
    image:"meal.jpg",
    price: 6.75,
  }]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadMeals = async () => {
        setLoading(true);
        const data = await fetchMeals("a"); // You can change the letter here
        setMeals(data.map((individualData,index)=>{
            return {id:individualData.idMeal,name:individualData.strMeal,image:individualData.strMealThumb,price:index+101,description:individualData.strInstructions}
        }) || []);
        setLoading(false);
        };

        loadMeals();
    }, []);
     
    const cartCtx = useContext(CartContext);

  const addToCartHandler = (meal) => {
    cartCtx.addItem({ ...meal, quantity: 1 });
  };
  return (
    <Container className="mt-5 pt-5 mx-auto">
      {/* mx-auto is center alignment and adjusting responsiveness */}
      <h2 className="mb-4">Available Meals</h2>
      <div className="border p-3 h-100 shadow-sm rounded">
        {loading?(<p>Loading...</p>):meals.map((meal) => (
        <IndividualMealItem
          key={meal.id}
          name={meal.name}
          description={meal.description}
          price={meal.price}
          image={meal.image}
          onAddToCart={() => addToCartHandler(meal)}
        />
      ))}
      </div>
      
    </Container>
  );
};

export default Meals;
