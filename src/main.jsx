import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={createTheme({})}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
          <App />
        </Provider>
      </LocalizationProvider>
    </ThemeProvider>
  </StrictMode>
);
