import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <span style={styles.logoText}>Product Zone</span>
      </div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        <Link to="/add-product" style={styles.link}>Add products</Link>
        <Link to="/cart" style={styles.cartLink}>
          🛒 {cartCount > 0 && <span style={styles.badge}>{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '18px 50px',
    background: 'linear-gradient(135deg, #0d9488 0%, #115e59 100%)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(135deg, #fb923c 0%, #f97316 100%)',
    padding: '14px 28px',
    borderRadius: '12px',
    boxShadow: '0 6px 20px rgba(249, 115, 22, 0.4)',
    cursor: 'pointer',
  },
  logoIcon: {
    fontSize: '32px',
    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
  },
  logoText: {
    fontSize: '24px',
    letterSpacing: '0.5px',
  },
  links: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    fontSize: '17px',
    fontWeight: '600',
    padding: '10px 20px',
    borderRadius: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  cartLink: {
    textDecoration: 'none',
    fontSize: '28px',
    position: 'relative',
    padding: '10px',
    background: 'rgba(255, 255, 255, 0.15)',
    borderRadius: '12px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  badge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
    color: 'white',
    borderRadius: '50%',
    padding: '5px 9px',
    fontSize: '12px',
    fontWeight: 'bold',
    boxShadow: '0 4px 12px rgba(244, 63, 94, 0.5)',
    border: '2px solid white',
  },
};

export default Navbar;
