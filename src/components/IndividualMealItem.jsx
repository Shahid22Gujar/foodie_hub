import { Card, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

const IndividualMealItem = ({ name, description, price, image, onAddToCart }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img 
        variant="top" 
        src={image} 
        alt={name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" style={{ fontSize: "1rem" }}>
          {name}
        </Card.Title>

        <Card.Text className="flex-grow-1" style={{ fontSize: "0.9rem", overflow: "hidden", textOverflow: "ellipsis" }}>
          {description.length > 100 ? `${description.slice(0, 100)}...` : description}
        </Card.Text>

        <div className="mt-auto">
          <Card.Text>
            <strong style={{ fontSize: "1rem" }}>${price.toFixed(2)}</strong>
          </Card.Text>
          <Button variant="primary" size="sm" onClick={onAddToCart}>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default IndividualMealItem;
