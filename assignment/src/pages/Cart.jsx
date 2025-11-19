import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Add product to cart</h2>
        <div style={styles.cartInfo}>
          🛒 {cartCount} items in cart
        </div>
      </div>

      <div style={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} style={styles.productCard}>
            <h3 style={styles.productName}>{product.name}</h3>
            <span style={styles.category}>{product.category}</span>
            <div style={styles.priceContainer}>
              <span style={styles.price}>$ {product.cost}</span>
              <button 
                onClick={() => handleAddToCart(product)} 
                style={styles.addButton}
              >
                Add 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '50px',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '45px',
    background: 'white',
    padding: '28px 40px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(139, 127, 168, 0.2)',
  },
  cartInfo: {
    fontSize: '18px',
    fontWeight: '700',
    color: '#6b5b7f',
    background: 'linear-gradient(135deg, #e9d5ff, #d8b4fe)',
    padding: '14px 28px',
    borderRadius: '14px',
    boxShadow: '0 4px 16px rgba(139, 127, 168, 0.25)',
    letterSpacing: '0.3px',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '35px',
  },
  productCard: {
    background: 'white',
    border: '2px solid #f3f0f7',
    borderRadius: '24px',
    padding: '32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  },
  productName: {
    margin: 0,
    fontSize: '22px',
    fontWeight: '700',
    color: '#6b5b7f',
    letterSpacing: '0.3px',
  },
  category: {
    background: 'linear-gradient(135deg, #e9d5ff, #d8b4fe)',
    padding: '10px 20px',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '700',
    alignSelf: 'flex-start',
    color: '#6b21a8',
    boxShadow: '0 4px 12px rgba(139, 127, 168, 0.2)',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  priceContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid #f3f4f6',
  },
  price: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#6b5b7f',
  },
  addButton: {
    background: 'linear-gradient(135deg, #a78bca 0%, #8b7fa8 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    padding: '14px 28px',
    fontSize: '15px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(139, 127, 168, 0.3)',
    letterSpacing: '0.5px',
  },
};

export default Cart;
