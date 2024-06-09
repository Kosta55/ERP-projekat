import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToCart } from "../../redux/cart/cartActions";
import Rating from "./Rating";

const CardProductGrid = ({ product }) => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cart);

  const addItemToCart = (productId) => {
    if (cart.some((cartItem) => cartItem.productId === productId)) {
      toast.error(
        "This item is already in your cart. Go to your cart to change the amount"
      );
    } else {
      dispatch(addToCart(productId, 1));
      toast.success("Item has been added to your cart");
    }
  };

  return (
    <div className="card">
      <Link to={`/product/${product._id}`}>
      <img 
  className='card-img-top img-fluid' 
  src={product?.image} 
  alt={product.name} 
  style={{ maxWidth: '100%' }} // Postavljamo samo maksimalnu širinu
/>
      </Link>
      {product.isNewProduct && (
        <span className="badge bg-success position-absolute mt-2 ms-2">
          New
        </span>
      )}
      <div className="card-body">
        <Link to={`/product/${product._id}`} className="text-decoration-none">
          <h5 className="card-title text-dark">{product.name}</h5>
        </Link>
        <div className="my-2">
          <span className="fw-bold h5">${product.price}</span>
          <Rating
            averageRating={product.averageRating}
            numOfReviews={product.numOfReviews}
          />
        </div>
        <div
          className="btn-group d-flex justify-content-between gap-2"
          role="group"
        >
          <button
            type="button"
            className="btn btn-dark rounded"
            title="Add to cart"
            disabled={product.countInStock <= 0}
            onClick={() => addItemToCart(product._id)}
          >
            <span>
              <i className="fas fa-cart-plus"></i>
            </span>
          </button>
          <Link
            to={`/product/${product._id}`}
            className="btn btn-dark rounded"
            title="View product"
          >
            <span>
              <i className="fas fa-eye"></i>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CardProductGrid;
