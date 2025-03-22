import './App.css';
import HomePage from './pages/Home/HomePage';
import Preview from './pages/Preview/Preview';
import Game from './pages/Game/Game';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} /> 
            <Route path='/quiz/*' element={<Preview /> }/>
            <Route path='/startquiz/*' element={<Game /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
