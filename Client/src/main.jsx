import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'; // Import Provider
import { SnackbarProvider } from 'notistack'
import store from './Redux/store';
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SnackbarProvider>
      <Provider store={store}> {/* Provide the store */}
        <Router>
          <App />
        </Router>
      </Provider>
    </SnackbarProvider>
  </React.StrictMode>,
)
