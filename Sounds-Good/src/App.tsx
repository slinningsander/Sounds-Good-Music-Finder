import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage/Homepage";
import SearchResultPage from "./pages/SearchResultPage/SearchResultPage.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/project2" element={<Homepage />} />
        <Route path="/project2/searchResult" element={<SearchResultPage />} />
      </Routes>
    </>
  );
}

export default App;
