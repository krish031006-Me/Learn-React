import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// While rendering we are wrapping the App component in StrictMode component which provides us additional checking for errors and all
createRoot(document.getElementById('root')).render( 
  <StrictMode>
    <App />
  </StrictMode>,
)
