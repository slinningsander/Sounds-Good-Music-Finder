import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/Homepage/Homepage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/project2" element={<Homepage />} />
      </Routes>
    </>
  )
}

export default App
