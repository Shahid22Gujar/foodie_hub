import { useContext, useEffect, useState } from "react";
import IndividualMealItem from "./IndividualMealItem";
import { Container, Row, Col } from "react-bootstrap";
import { CartContext } from "../store/CartContext";
import { fetchMeals } from "../services/MealService";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMeals = async () => {
      setLoading(true);
      const data = await fetchMeals("a");
      setMeals(
        data.map((individualData, index) => ({
          id: individualData.idMeal,
          name: individualData.strMeal,
          image: individualData.strMealThumb,
          price: index + 101,
          description: individualData.strInstructions,
        })) || []
      );
      setLoading(false);
    };

    loadMeals();
  }, []);

  const cartCtx = useContext(CartContext);

  const addToCartHandler = (meal) => {
    cartCtx.addItem({ ...meal, quantity: 1 });
  };

  return (
    <Container className="mt-5 pt-5">
      <h2 className="mb-4 text-center">Available Meals</h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Row className="g-4">
          {meals.map((meal) => (
            <Col key={meal.id} xs={12} sm={6} md={4} lg={3}>
              <div className="border p-3 h-100 shadow-sm rounded">
                <IndividualMealItem
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                  image={meal.image}
                  onAddToCart={() => addToCartHandler(meal)}
                />
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Meals;
