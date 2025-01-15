import React from 'react'

function ListProducts({data}) {
    console.log("data in list",data)
    
  return (
    
    <div>
        {data.map((element)=>(
            <div key={element.id} className="card" style={{width:"18rem"}}>
  <img src={element.imageUrl} className="card-img-top" alt={element.name}/>
  <div className="card-body">
    <h5 className="card-title">{element.name}</h5>
    <p className="card-text">Price : {element.price}</p>
    <a href="#" className="btn btn-primary">Available Quantity : {element.quantity}</a>
  </div>
</div>



        ))}
      list
    </div>
  )
}

export default ListProducts
