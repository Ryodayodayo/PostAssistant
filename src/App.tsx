import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Login from './pages/Login' ;
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path = "/" element = {<Home />}/>

          <Route path = "/signup" element = {
            <PublicRoute>
              <SignUp />
            </PublicRoute>
            }/>

          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;