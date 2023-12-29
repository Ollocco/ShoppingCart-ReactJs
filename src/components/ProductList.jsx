import React, { useEffect, useState } from "react";
import {Box} from "@mui/material";
import Products from "./Products";
import axios from "axios";
import  "../styles/ProductList.css";

function ProductList() {
  const [prod, setProd] = useState([])
  useEffect(()=>{
    //efecto secundario: peticion API
    console.log('pedido de info')
    obtenerProductos();
    
  },[])
  const obtenerProductos = () => {
    axios.get('https://fakestoreapi.com/products')
      .then((respuesta)=> setProd(respuesta.data))
      .catch((error)=>console.log(error))
  }
  return (
  <div className='productList-container'>
  {
    <ul>
        {prod.map((product) => (
          <li key={product.id}>
            <Products 
              id={product.id}
              title={product.title} 
              description={product.description} 
              price={product.price} 
              image={product.image} 
              alt={product.alt}
            /> 
          </li>
        ))}
    </ul>
  }
  </div>);
}
export default ProductList
