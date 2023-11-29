import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage.tsx'
import Songpage from './pages/Songpage/Songpage.tsx'
import { Navbar } from './components/Navbar/Navbar.tsx'
import Artistpage from './pages/Artistpage/Artistpage.tsx'
import Albumpage from './pages/Albumpage/Albumpage.tsx'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/project2" element={<Homepage />} />
        <Route
          path="/project2/:artist/album/:album/song/:song"
          element={<Songpage />}
        />
        <Route path="/project2/:artist" element={<Artistpage />} />
        <Route path="/project2/:artist/album/:album" element={<Albumpage />} />
      </Routes>
    </>
  )
}

export default App
