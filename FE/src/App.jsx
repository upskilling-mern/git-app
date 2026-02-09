import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4001/api/products';

function App() {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState('');
  const [form, setForm] = useState({
    name: '',
    price: '',
    description: '',
    inStock: true
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadProducts() {
    try {
      setError('');
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to load products!!');
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError('Error loading products!! Is the backend running?');
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function resetForm() {
    setEditingId('');
    setForm({
      name: '',
      price: '',
      description: '',
      inStock: true
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: form.name,
        price: Number(form.price),
        description: form.description,
        inStock: form.inStock
      };
      const method = editingId  ? 'PUT' : 'POST';
      const url = editingId ? `${API_URL}/${editingId}` : API_URL;
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to save product');
      resetForm();
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert('Error saving product');
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(id) {
    try {
      const res = await fetch(`${API_URL}/${id}`);
      if (!res.ok) throw new Error('Failed to load product');
      const p = await res.json();
      setEditingId(p._id);
      setForm({
        name: p.name ?? '',
        price: p.price ?? '',
        description: p.description ?? '',
        inStock: Boolean(p.inStock)
      });
    } catch (err) {
      console.error(err);
      alert('Error loading product details');
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  }

  return (
    <div className="container">
      <h1>Products CRUD (Frontend)</h1>

      <form className="card" onSubmit={handleSubmit}>
        <input type="hidden" value={editingId} />

        <label>
          Name
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Price
          <input
            type="number"
            name="price"
            step="0.01"
            required
            value={form.price}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            name="inStock"
            checked={form.inStock}
            onChange={handleChange}
          />
          In Stock
        </label>

        <div className="actions">
          <button type="submit" disabled={loading}>
            {editingId ? 'Update Product' : 'Save Product'}
          </button>
          <button type="button" onClick={resetForm}>
            Reset
          </button>
        </div>
      </form>

      <h2>Products List</h2>
      {error && <div className="error">{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>In Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="4">No products yet.</td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p._id}>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.inStock ? 'Yes' : 'No'}</td>
                <td>
                  <button type="button" onClick={() => handleEdit(p._id)}>
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(p._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;


