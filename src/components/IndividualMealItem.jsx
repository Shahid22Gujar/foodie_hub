// src/components/IndividualMealItem.js
import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const IndividualMealItem = ({ name, description, price, image, onAddToCart }) => {
  return (
    <Card className="mb-3" style={{ maxWidth: "300px" }}>
      <Card.Img variant="top" src={image} style={{ height: "200px", objectFit: "cover" }} />
      <Card.Body>
        <Card.Title style={{ fontSize: "1rem" }}>{name}</Card.Title>
        <Card.Text style={{ fontSize: "0.9rem", height: "60px", overflow: "hidden" }}>
          {description}
        </Card.Text>
        <Card.Text>
          <strong style={{ fontSize: "1rem" }}>${price.toFixed(2)}</strong>
        </Card.Text>
        <Button variant="primary" size="sm" onClick={onAddToCart}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default IndividualMealItem;
