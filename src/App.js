import './App.css';
import HomePage from './pages/Home/HomePage';
import Preview from './pages/Preview/Preview';
import Game from './pages/Game/Game';
import LoginPage from './pages/auth/login/LoginPage';
import ForgetPage from './pages/auth/forget/FogetPage';
import ForgetCode from './pages/auth/forgetCode/forgetCode';
import SignupPage from './pages/auth/singup/SingUp';

import { BrowserRouter, Routes, Route } from "react-router-dom"
import CreateQuizPage from './pages/createQuiz/CreateQuiz';
import MyQuizzesPage from './pages/myQuizz/MyQuizz';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<HomePage />} /> 
            <Route path='/quiz/*' element={<Preview /> }/>
            <Route path='/startquiz/*' element={<Game /> }/>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/singup' element={<SignupPage />} />
            <Route path='/forgetpass' element={<ForgetPage />} />
            <Route path='/forgot/code' element={<ForgetCode />} />
            <Route path='/create' element={<CreateQuizPage />} />
            <Route path='/myQuizzes' element= {<MyQuizzesPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
