import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListProducts = () => {
  const [products, setProducts] = useState([]);

  // Função para buscar todos os produtos do servidor
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/products/all');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h1>Produtos Disponíveis</h1>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <p><strong>Nome:</strong> {product.name}</p>
            <p><strong>Descrição:</strong> {product.desc}</p>
            <p><strong>ID:</strong> {product.id}</p>
            <p className="product-price"><strong>Preço:</strong> R$ {product.price}</p>
            <p className="product-stock"><strong>Estoque:</strong> {product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default ListProducts;
