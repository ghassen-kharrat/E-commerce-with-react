import React, { useState } from 'react';
import axios from 'axios';
import './AddProduct.css'; 

function AddProduct({ data, handelAddProduct, idToken }) {
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    imageUrl: '',
    CategoryId: '',
    AdminId: idToken,
  });
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const setImageFile = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Ghassen123');
    formData.append('cloud_name', 'dqh6arave');
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dqh6arave/image/upload',
        formData
      );
      const imageUrl = res.data.secure_url;
      setImage(imageUrl);
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        imageUrl: imageUrl, 
      }));
      setLoading(false);
    } catch (error) {
      console.error(error);
      setMessage('Failed to upload image.');
      setLoading(false);
    }
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.CategoryId || !newProduct.imageUrl) {
      setMessage('Please fill out all fields.');
      return;
    }
    handelAddProduct(newProduct);
    setNewProduct({
      name: '',
      price: '',
      quantity: '',
      imageUrl: '',
      CategoryId: '',
      AdminId: idToken,
    });
    setMessage('Product added successfully!');
    setTimeout(() => {
      window.location.href = '/home';
    }, 2000);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add New Product</h2>
      <div className="card card-container shadow-sm p-4">
        {message && (
          <div className="alert alert-info" role="alert">
            {message}
          </div>
        )}
        <div className="form-group mb-3">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="price">Product Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            placeholder="Product Price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="quantity">Product Quantity</label>
          <input
            type="number"
            className="form-control"
            name="quantity"
            placeholder="Product Quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="CategoryId">Category</label>
          <select
            className="form-control"
            name="CategoryId"
            value={newProduct.CategoryId}
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            {data.map((el) => (
              <option key={el.id} value={el.CategoryId}>
                {el.Category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="image">Product Image</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {loading && <div className="spinner-border text-primary mt-2" role="status">
            <span className="sr-only">Loading...</span>
          </div>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            readOnly
          />
        </div>
        <button onClick={handleAddProduct} className="btn btn-primary btn-block">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;