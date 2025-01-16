import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ListProducts.css'; // Import the CSS file for styling

function ListProducts({ getCurrentProdAndChangeView, data, handelDeleteProduct }) {
  const navigate = useNavigate();
  console.log(data);

  const handleNavigation = () => {
    navigate('/update');
  };

  return (
    <div className="container mt-4">
      {data && data.length > 0 ? (
        <div className="row">
          {data.map((element) => (
            <div key={element.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <img
                  src={element.imageUrl}
                  className="card-img-top"
                  alt={element.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{element.name}</h5>
                  <p className="card-text">Price: {element.price}  TND</p>
                  <p className="card-text">Available Quantity: {element.quantity}</p>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => handelDeleteProduct(element.id)}
                      type="button"
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        getCurrentProdAndChangeView(element);
                        handleNavigation();
                      }}
                      type="button"
                      className="btn btn-primary"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No products available. Please add a product.</p>
      )}
    </div>
  );
}

export default ListProducts;