import React, { useState } from 'react';
import axios from 'axios';

function AddProduct({ handelAddProduct, idToken }) {
  console.log("rrrrrr", idToken);
  console.log("add fn", handelAddProduct);

  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    quantity: '',
    imageUrl: '',
    CategoryId: '',
    AdminId: idToken,
  });
  const [image, setImage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const setImageFile = async (file) => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Ghassen123');
    formData.append('cloud_name', 'dqh6arave');
    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/dqh6arave/image/upload',
        formData
      );
      console.log(res);
      const imageUrl = res.data.secure_url;

      // Update both the image state and the newProduct's imageUrl
      setImage(imageUrl);
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        imageUrl: imageUrl, // Automatically save the URL
      }));
    } catch (error) {
      console.error(error);
    }
  };

  console.log("image", image);
  console.log("newProduct", newProduct);

  const handleAddProduct = () => {
    handelAddProduct(newProduct);
    setNewProduct({
      name: '',
      price: '',
      quantity: '',
      imageUrl: '',
      CategoryId: '',
      AdminId: idToken,
    });
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <input
        type="text"
        name="name"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="price"
        placeholder="Product Price"
        value={parseInt(newProduct.price)}
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="quantity"
        placeholder="Product Quantity"
        value={parseInt(newProduct.quantity)}
        onChange={handleInputChange}
      />

      <input
        type="number"
        name="CategoryId"
        placeholder="Category ID (<= 2)"
        value={parseInt(newProduct.CategoryId)}
        onChange={handleInputChange}
      />

      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
      />
      <input
        type="text"
        name="imageUrl"
        placeholder="Image URL"
        value={newProduct.imageUrl}
        readOnly
      />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;
