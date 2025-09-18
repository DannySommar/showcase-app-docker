import { Routes, Route } from "react-router-dom"

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import Layout from './components/Layout'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage/></Layout>} />
      <Route path="/login" element={<Layout><LoginPage/></Layout>} />
    </Routes>
  )
}
