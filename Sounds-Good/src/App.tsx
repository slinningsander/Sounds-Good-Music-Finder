import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage.tsx'
import Detailspage from './pages/Detailspage/Detailspage'
import { Navbar } from './components/Navbar/Navbar'
import Artistpage from './pages/Artistpage/Artistpage.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/project2" element={<Homepage />} />
        <Route path="/project2/:artist/:song" element={<Detailspage />} />
        <Route path="/project2/:artist" element={<Artistpage />} />
        <Route path="/project2/:artist/album/:album" element={<div></div>} />
      </Routes>
    </>
  )
}

export default App
