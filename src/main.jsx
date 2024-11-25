import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js"
import "@fortawesome/fontawesome-free/css/all.min.css"
import './index.css'
import './media.css'
import App from './App.jsx'
import AuthContextProvider from './context/AuthContext/AuthContext.jsx'
import PaginationContextProvider from './context/PaginationContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
<PaginationContextProvider >
  <App />
  </PaginationContextProvider>

  </AuthContextProvider>,
)
