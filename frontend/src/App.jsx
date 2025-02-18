import AddEpisode from "./components/AddEpisode";
import EpisodesPage from "./pages/EpisodesPage";
import Home from "./pages/Home";
import { Routes, Route } from 'react-router-dom';



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/series" element={<Series />} />
      </Routes >
      <Home />
      <h1>welcome to the watchlist app</h1>
      <EpisodesPage />

      <AddEpisode />
    </div>
  )
}

export default App
