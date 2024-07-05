import { useState } from 'react'
import Navbar from './components/Navbar'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeBody from './components/HomeBody'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import Register from './components/Register'

function App() {
  return (
    <Router>
    <div className='mx-10'>
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <Header />
            <HomeBody />
            <section className='mt-20'>
              <Footer />
            </section>
          </>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  </Router>
  )
}

export default App
