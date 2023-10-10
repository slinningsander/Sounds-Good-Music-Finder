import "./App.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import { Navbar } from "./components/Navbar/Navbar";
import Detailspage from "./pages/Detailspage/Detailspage";


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/project2" element={<Homepage />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/project2/:artist/:song" element={<Detailspage />} />
      </Routes>
    </>
  );
}

export default App;
