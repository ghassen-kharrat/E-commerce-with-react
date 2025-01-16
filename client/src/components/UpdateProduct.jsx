import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UpdatedProduct.css'

function UpdateProduct({ element, currentProd, idToken, handelUpdateProduct }) {
  console.log("currentProd", element);
  
  const navigate = useNavigate();
   const handleNavigation = () => {
  
    navigate('/home'); 
  };
  const [newProduct, setNewProduct] = useState({
    name: currentProd?.name || '',
    price: currentProd?.price || '',
    quantity: currentProd?.quantity || '',
    imageUrl: currentProd?.imageUrl || '',
    CategoryId: currentProd?.CategoryId || '',
    AdminId: idToken,
  });

  const [image, setImage] = useState('');
  const [uploadError, setUploadError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const setImageFile = async (file) => {
    if (!file) return;
    setUploadError('');

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
    } catch (error) {
      console.error(error);
      setUploadError('Failed to upload the image. Please try again.');
    }
  };

  const handleUpdateProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.quantity || !newProduct.imageUrl) {
      alert('Please fill out all fields before updating the product.');
      return;
    }

    handelUpdateProduct(currentProd.id, newProduct);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Update      </h2>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter product name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">Product Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            name="price"
            placeholder="Enter product price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">Product Quantity</label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            name="quantity"
            placeholder="Enter product quantity"
            value={newProduct.quantity}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="imageFile" className="form-label">Product Image</label>
          <input
            type="file"
            className="form-control"
            id="imageFile"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {uploadError && <p className="text-danger mt-2">{uploadError}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="imageUrl" className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            name="imageUrl"
            placeholder="Image URL"
            value={newProduct.imageUrl}
            readOnly
          />
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            handleNavigation();
            handleUpdateProduct();
          }}
        >
          Update 
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;