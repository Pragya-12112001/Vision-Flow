import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home'
import Login from './components/login'
import Navbar from './components/navbar'
import Generator from './components/generator';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <main>
          <div className="container">
            <Routes>
              <Route path='/' element={<Home/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path="/generate" element={<Generator/>}/>
            </Routes> 
          </div>
        </main>
      </BrowserRouter>
    </div>
  );
}

 export default App;