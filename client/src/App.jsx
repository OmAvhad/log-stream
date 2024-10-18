import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Analytics from './pages/Analytics';
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className='flex flex-row py-2 px-2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/analytics' element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
