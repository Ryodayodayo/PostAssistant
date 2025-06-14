import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from './components/ProtectRoute';
import PublicRoute from './components/PublicRoute';
import Home from './pages/Home';
import Login from './pages/Login' ;
import SignUp from './pages/SignUp';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route path = "/" element = {
          <ProtectRoute>
            <Home />
          </ProtectRoute>
          }/>

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