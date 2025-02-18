import AddEpisode from "./components/AddEpisode";
import EpisodesPage from "./pages/EpisodesPage";
import Home from "./pages/Home";


function App() {

  return (
    <div>
      <Home/>
        <h1>welcome to the watchlist app</h1>
        <EpisodesPage />
        
        <AddEpisode  />
    </div>
  )
}

export default App
