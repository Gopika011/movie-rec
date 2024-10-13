import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './pages/Search';
import List from './pages/List';
import MoviePage from './pages/MoviePage';
import AdminPage from './pages/AdminPage'; // Import AdminPage

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
        <Route path="/list" element={<ProtectedRoute><List /></ProtectedRoute>} />
        <Route path="/moviepage" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminpage/*" element={<AdminPage />} /> {/* Change to /adminpage/* */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
