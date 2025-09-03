import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MainPage } from '../pages/MainPage';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route index element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
