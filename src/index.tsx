import App from "./App";
import { createRoot } from 'react-dom/client';
import  './styles.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline';

const mainTheme = createTheme({
  spacing: 4,
  palette:{
    primary:{
      main: '#000000'
    },
    secondary:{
      main: '#CCD7FF'
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#000000'
    }
  },
  typography:{
    fontFamily: 'Inter',
  }
});
// THIS IS HIDING THE OVERFLOW RIGHT AND LEFT ADDED BY ZACH
// document.body.style.overflowX = 'hidden'

const domNode: any = document.getElementById('root');
const root = createRoot(domNode);
root.render(<ThemeProvider theme={mainTheme}><CssBaseline /><App /></ThemeProvider>);
