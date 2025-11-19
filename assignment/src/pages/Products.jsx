import { useState } from 'react';
import { useSelector } from 'react-redux';

function Products() {
  const products = useSelector((state) => state.products.items);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) => {
    const search = searchTerm.toLowerCase().trim();
    if (!search) return true;
    
    return product.name.toLowerCase().startsWith(search) ||
           product.category.toLowerCase().startsWith(search);
  });

  return (
    <div style={styles.container}>
      <h2>Products</h2>
      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search product by name or category"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
        <span style={styles.productCount}>{filteredProducts.length} products</span>
      </div>
      
      <div style={styles.tableContainer}>
        <h3 style={styles.tableTitle}>All products</h3>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{...styles.th, borderTopLeftRadius: '20px'}}>No.</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Expiry date</th>
              <th style={{...styles.th, borderTopRightRadius: '20px'}}>Cost</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product, index) => (
              <tr key={product.id} style={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.category}</td>
                <td style={styles.td}>{product.expiryDate}</td>
                <td style={styles.td}>$ {product.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
  searchContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '35px',
    background: 'white',
    padding: '25px 30px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(13, 148, 136, 0.1)',
  },
  searchInput: {
    width: '550px',
    padding: '16px 24px',
    border: '2px solid #ccfbf1',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
    background: '#f0fdfa',
    transition: 'all 0.3s ease',
  },
  productCount: {
    fontSize: '16px',
    color: '#115e59',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #fed7aa, #fdba74)',
    padding: '12px 24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(251, 146, 60, 0.2)',
  },
  tableContainer: {
    background: 'white',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
  },
  tableTitle: {
    display: 'none',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: 0,
  },
  th: {
    border: 'none',
    padding: '20px 30px',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #8b7fa8 0%, #6b5b7f 100%)',
    color: 'white',
    fontWeight: '700',
    fontSize: '16px',
    textTransform: 'uppercase',
    letterSpacing: '1.5px',
  },
  td: {
    border: 'none',
    padding: '20px 30px',
    color: '#4b5563',
    fontSize: '15px',
    textAlign: 'center',
  },
  evenRow: {
    background: '#ede9f2',
  },
  oddRow: {
    background: 'white',
  },
};

export default Products;
