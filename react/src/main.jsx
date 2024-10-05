import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <AuthContextProvider>
//         <SocketContextProvider>
//           <App />
//         </SocketContextProvider>
//       </AuthContextProvider>
//     </BrowserRouter>
//   </React.StrictMode>,
// )
