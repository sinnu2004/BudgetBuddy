import { Routes, Route,BrowserRouter } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

import Dashboard from './Pages/Dashboard/Dashboard';
import ProtectedRoute from './routes/ProtectedRoute';
import Compare from './Pages/Compare/Compare';
import About from './Pages/About/About';
import Contact from './Pages/Contact/Contact';

const App = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={
            <ProtectedRoute>
            <Home />
            </ProtectedRoute>
          } />
          <Route path='/dashboard' element={
            <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
          } />
          <Route path='/compare' element= {
            <ProtectedRoute>
              <Compare />
            </ProtectedRoute>
          } />
          <Route path='/about' element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />
          <Route path='/contact' element={
          <ProtectedRoute>
            <Contact />
          </ProtectedRoute>
        } />
        </Routes>
      </BrowserRouter>
  );
};
 
export default App;
