import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../store/productsSlice';

function AddProduct() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    expiryDate: '',
    cost: '',
  });

  const [errors, setErrors] = useState({});

  const validateName = (name) => {
    const regex = /^[a-zA-Z0-9\s]+$/;
    return regex.test(name);
  };

  const validateCost = (cost) => {
    const regex = /^\d+(\.\d+)?$/;
    return regex.test(cost);
  };

  const validateDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate > today;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    const newErrors = { ...errors };
    
    if (name === 'name') {
      if (value && !validateName(value)) {
        newErrors.name = 'Only alphanumeric characters and spaces allowed';
      } else {
        delete newErrors.name;
      }
    }
    
    if (name === 'category') {
      if (value) {
        delete newErrors.category;
      }
    }
    
    if (name === 'expiryDate') {
      if (value && !validateDate(value)) {
        newErrors.expiryDate = 'Only future dates allowed';
      } else {
        delete newErrors.expiryDate;
      }
    }
    
    if (name === 'cost') {
      if (value && !validateCost(value)) {
        newErrors.cost = 'Only numbers with decimals allowed';
      } else {
        delete newErrors.cost;
      }
    }
    
    setErrors(newErrors);
  };

  const handleSave = () => {
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Only alphanumeric characters and spaces allowed';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.expiryDate) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!validateDate(formData.expiryDate)) {
      newErrors.expiryDate = 'Only future dates allowed';
    }

    if (!formData.cost) {
      newErrors.cost = 'Cost is required';
    } else if (!validateCost(formData.cost)) {
      newErrors.cost = 'Only numbers with decimals allowed';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(addProduct(formData));
    handleReset();
  };

  const handleReset = () => {
    setFormData({
      name: '',
      category: '',
      expiryDate: '',
      cost: '',
    });
    setErrors({});
  };

  const getTodayDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 1);
    return today.toISOString().split('T')[0];
  };

  return (
    <div style={styles.container}>
      <h2>Add new product</h2>
      
      <div style={styles.formContainer}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Name of product</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{
              ...styles.input,
              border: errors.name ? '2px solid crimson' : formData.name && !errors.name ? '2px solid #0d9488' : '2px solid #ccfbf1'
            }}
          />
          {errors.name && <span style={styles.error}>❌ {errors.name}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              ...styles.input,
              border: errors.category ? '2px solid crimson' : formData.category ? '2px solid #0d9488' : '2px solid #ccfbf1'
            }}
          >
            <option value="">Select category</option>
            <option value="Finished">Finished</option>
            <option value="Semi-finished">Semi-finished</option>
            <option value="Raw material">Raw material</option>
          </select>
          {errors.category && <span style={styles.error}>❌ {errors.category}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Expiry date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            min={getTodayDate()}
            style={{
              ...styles.input,
              border: errors.expiryDate ? '2px solid crimson' : formData.expiryDate && !errors.expiryDate ? '2px solid #0d9488' : '2px solid #ccfbf1'
            }}
          />
          {errors.expiryDate && <span style={styles.error}>❌ {errors.expiryDate}</span>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Product cost</label>
          <input
            type="text"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="$ 3,000"
            style={{
              ...styles.input,
              border: errors.cost ? '2px solid crimson' : formData.cost && !errors.cost ? '2px solid #0d9488' : '2px solid #ccfbf1'
            }}
          />
          {errors.cost && <span style={styles.error}>❌ {errors.cost}</span>}
        </div>
      </div>

      <div style={styles.buttonContainer}>
        <button onClick={handleSave} style={styles.saveButton}>Save</button>
        <button onClick={handleReset} style={styles.resetButton}>Reset</button>
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
            {products.map((product, index) => (
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
  formContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '28px',
    marginBottom: '35px',
    background: 'white',
    padding: '35px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(13, 148, 136, 0.1)',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: '700',
    color: '#115e59',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '14px 18px',
    borderRadius: '12px',
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease',
    background: '#f0fdfa',
  },
  error: {
    fontSize: '12px',
    color: '#dc2626',
    marginTop: '8px',
    fontWeight: '600',
    display: 'block',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
    marginBottom: '45px',
  },
  saveButton: {
    padding: '16px 60px',
    background: 'linear-gradient(135deg, #0d9488, #115e59)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(13, 148, 136, 0.3)',
    letterSpacing: '0.5px',
  },
  resetButton: {
    padding: '16px 60px',
    background: 'linear-gradient(135deg, #fb923c, #f97316)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
    letterSpacing: '0.5px',
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

export default AddProduct;
