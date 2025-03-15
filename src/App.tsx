// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import Admin from './pages/Admin';
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> {/* Không truyền onRegister */}
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
};

export default App;