import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider'; 
import api from '../utils/api';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';  

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
	components: {
		MuiCssBaseline: {
      styleOverrides: {
        body: {
          justifyContent: 'center'
        }
      }
    }
	}
});

export default function SignIn() {
	const auth = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = React.useState(false);
  const [inputValidated, setInputValidated] = React.useState({
    userName: false,
    roomId: false
  });
	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			navigate("/");
		}
	}, [])
	

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(null);
    const data = new FormData(event.currentTarget);
		try {
      const dataUser = {
        userName: data.get('username'),
        roomId: data.get('roomid'),
      }

      setInputValidated({
        userName: !dataUser.userName,
        roomId: !dataUser.roomId
      });

      if (!dataUser.roomId || !dataUser.userName) {
        setErrors({ message: 'please fill your login information' });
        return;
      } 
      const result = await api.post('/initChat', {
        username: dataUser.userName,
        roomid: dataUser.roomId
      })
      if (result && result.data && result.data.user && result.data.room) {
        auth.setToken(JSON.stringify({
          username: result.data.user.username,
          roomid: result.data.room._id,
          room_id: result.data.room.roomId,
          userid: result.data.user._id
        }));
        navigate("/", {replace: true});
      }
    } catch (error) {
      if (error && error.response && error.response.data && error.response.data.message) {
        setErrors({message: error.response.data.message});
      } else {
        setErrors({message: error.message});
      }
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
						justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          {
            errors && (
              <Alert variant="outlined" severity="error">
                {errors.message}
              </Alert>
            )
          }
          <Typography component="h1" variant="h5">
            Join Chat Room
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              error={inputValidated.userName}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              helperText={inputValidated.userName ? 'Username required' : ''}
            />
            <TextField
              margin="normal"
              error={inputValidated.roomId}
              required
              fullWidth
              name="roomid"
              label="Room Id"
              id="roomid"
              helperText={inputValidated.roomId ? 'Room Id required' : ''}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
							style={{ borderRadius: 20 }}
            >
              JOIN
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}