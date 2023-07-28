import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import './index.css'
import store from './redux/store/store.js'
import { ThemeProvider } from './themeContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='1040414116180-1d8l5jv1u7k5k2h8d0r2r2c4gj9u3g9.apps.googleusercontent.com'>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
)
