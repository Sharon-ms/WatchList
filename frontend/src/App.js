import logo from './logo.svg';
import './App.css';
import Routes from './routes/RoutesC';
import React, { createContext } from 'react';
import NavbarC from './components/Navbar';


export const GeneralContext = createContext();

function App() {
  const API = 'http://localhost:3001';

  return (
    <GeneralContext.Provider value={{ API }}>
      <div className="App">
        <header>
          <NavbarC />
        </header>
        <Routes />
      </div>
    </GeneralContext.Provider>
  );
}

export default App;
