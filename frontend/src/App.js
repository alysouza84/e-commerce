import React, { useState } from 'react';
import './App.css';
import UserAccountForm from './userAccountForm.js';
import LoginForm from './loginForm.js';
import ListProducts from './listProducts.js';
import CreateProductForm from './createProductForm.js';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [username, setUsername] = useState('');

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const handleLogin = (user) => {
      setIsLoggedIn(true);  
      setUsername(user); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  
    setUsername('');  
    localStorage.removeItem('Token');
  };

  return (
    <div className="App">
      {/* Bootstrap Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#" onClick={() => handleNavClick('landing')}>E-commerce</a>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ml-auto">
              {isLoggedIn && (
              <li className='nav-item'>
                 <p className='nav-link btn'>Olá, {username}!</p>
              </li>
              )}
              {!isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('createAccount')}>Criar conta</button>
              </li>
              )}
              {!isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('login')}>Login</button>
              </li>
              )}
              {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('fornecedores')}>Fornecedores</button>
              </li>
              )}
              {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('createProduct')}>Cadastrar Produto</button>
              </li>
              )}
              <li className="nav-item">
                <button className="nav-link btn" onClick={() => handleNavClick('listProducts')}>Produtos</button>
              </li>
              {isLoggedIn && (
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleLogout}>Sair</button>
              </li>
            )}
            </ul>
          </div>
        </nav>


      {/* Main Content */}
      <div className="container text-center mt-5">
        {currentPage === 'landing' && (
          <div>
            <h1 className="display-4">Bem vindo a plataforma de E-commerce!</h1>
          </div>
        )}

        {currentPage === 'createAccount' && (
          <div className="mt-4">
            <UserAccountForm onAccountCreated={() => setCurrentPage('login')} />
          </div>
        )}

        {currentPage === 'login' && (
          <div className="mt-4">
            <LoginForm onLogin={handleLogin}/>
          </div>
        )}

        {currentPage === 'fornecedores' && (
          <div className="mt-4">
            /* Tela de fornecedores */
          </div>
        )}

        {currentPage === 'createProduct' && (
          <div className="mt-4">
            <CreateProductForm /> 
          </div>
        )}

        {currentPage === 'listProducts' && (
          <div className="mt-4">
            <ListProducts /> 
          </div>
        )}  

        {currentPage === 'logout' && (
          <div className="mt-4">
            <h2>Logout (To be implemented)</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
