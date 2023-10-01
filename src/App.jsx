import { ThemeProvider } from '@material-ui/core';
import React from 'react';
import Router from './routes';
import AuthProvider from './provider/authProvider';
import { createTheme } from '@material-ui/core';

const theme = createTheme({
	palette: {
		primary: {
			main: "#2a9461"
		},
		secondary: {
			main: "#494c7d"
		}
	},components: {
    MuiToolbar: {
      styleOverrides: {
        regular: {
          '@media (min-width: 600px)': {
            paddingLeft: "5px",
            paddingRight: "25px"
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true
      }
    }
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}