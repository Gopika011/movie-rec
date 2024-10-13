import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './pages/Search';
import List from './pages/List'
import AdminPage from './pages/AdminPage'; // Import AdminPage
import Genre from './pages/Genre';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path='/search' element={<ProtectedRoute><Search/></ProtectedRoute>}/>
        <Route path='/list' element={<ProtectedRoute><List/></ProtectedRoute>}/>
        <Route path='/genre/:genreName' element={<ProtectedRoute><Genre/></ProtectedRoute>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/adminpage/*" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} /> {/* Change to /adminpage/* */}
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App



{/* <div className='p-4 h-screen flex justify-center items-center'>
<Routes>
  <Route path='/' element={authUser? <Home /> : <Navigate to={'/login'} /> } />
  <Route path='/login' element={authUser? <Navigate to='/' /> : <Login />} />
  <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
</Routes>
<Toaster />
</div> */}