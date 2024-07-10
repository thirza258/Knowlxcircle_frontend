import { useState } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'
import Article from './components/Article'
import ArticleBuilder from './components/ArticleBuilder'
import Home from './components/Home'

function App() {
  return (
    <Router>
    <div className='mx-10'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article-builder" element={<ArticleBuilder />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
