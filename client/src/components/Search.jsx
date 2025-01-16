import React from 'react';
import './Search.css'; 

function Search({ products, ktibaserach }) {
  const filteredProducts = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(ktibaserach.toLowerCase()) 
    
    );
  });

  return (
    <div className="container mt-5">
      <div className="row">
        {filteredProducts.map((product) => (
          <div key={product.id} className="col-md-4 mb-4">
            <div className="card shadow-sm">
              <img
                src={product.imageUrl}
                className="card-img-top"
                alt={product.name}
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;