import './App.css';
import HomePage from './pages/Home/HomePage';
import Preview from './pages/Preview/Preview';
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} /> 
            <Route path='/quiz/*' element={<Preview /> }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
