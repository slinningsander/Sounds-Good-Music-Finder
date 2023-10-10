import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage.tsx'
import Detailspage from './pages/Detailspage/Detailspage'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/project2" element={<Homepage />} />
        <Route path="/project2/:artist/:song" element={<Detailspage />} />
      </Routes>
    </>
  )
}

export default App
