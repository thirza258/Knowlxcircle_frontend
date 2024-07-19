import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Article from './components/Article'
import ArticleBuilder from './components/ArticleBuilder'
import Home from './components/Home'
import { AuthProvider } from './AuthContext';
import ArticleList from './components/ArticleList';
import Circle from './components/Circle';
import CircleList from './components/CircleList';
import CreateCircle from './components/CreateCircle';

function App() {
  return (
    <AuthProvider>
    <Router>
    <div className='mx-10'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/article" element={<ArticleList />} />
        <Route path="/article-builder" element={<ArticleBuilder />} />
        <Route path="/circle" element={<CircleList />} />
        <Route path="/circle/:id" element={<Circle />} />
        <Route path="/create-circle" element={<CreateCircle />} />
      </Routes>
    </div>
  </Router>
  </AuthProvider>
  )
}

export default App
