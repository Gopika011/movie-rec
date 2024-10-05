import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
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