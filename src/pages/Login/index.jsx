import { useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { useNavigate, Link as RouterLink } from 'react-router-dom';
import Swal from 'sweetalert2';

// MUI Components
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

// Helpers
import UserHelper from '../../utils/UserHelper';

// Apollo
import Query from '../../services/apollo/users/query';
import Loading from '../../components/Loading';

const initialValues = {
  username: '',
  password: '',
};

const Login = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState(initialValues);

  const [getUserByUsername,
    { loading: getUserLoading, error: getUserError, data: userData },
  ] = useLazyQuery(Query.getUserByUsername);

  if (getUserLoading) {
    return (<Loading />);
  }

  if (getUserError) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: getUserError.message,
    });
  }

  if (userData?.result.length < 1) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Username didn\'t exist',
    });
  }

  if (userData) {
    try {
      const foundUser = userData.result[0];

      UserHelper.validatePassword(inputValues.password, foundUser.password);

      UserHelper.createCredentials(foundUser);
      navigate('/list', { replace: true });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      }).then(() => {
        window.location.reload();
      });
    }
  }

  const onChangeHandler = (event) => {
    const newInputValues = inputValues;
    inputValues[event.target.name] = event.target.value;

    setInputValues({ ...newInputValues });
  };

  const loginHandler = (event) => {
    event.preventDefault();

    getUserByUsername({ variables: { username: inputValues.username } });
  };

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Card
          component="form"
          onSubmit={loginHandler}
          sx={{
            padding: '1rem',
            minWidth: {
              sx: 300,
              md: 450,
            },
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              component="h1"
              textAlign="center"
              sx={{
                marginTop: '1rem',
              }}
            >
              Login
            </Typography>

            <Box
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <TextField
                required
                name="username"
                id="username"
                label="Username"
                variant="outlined"
                value={inputValues.username}
                sx={{
                  marginTop: '2rem',
                }}
                onChange={onChangeHandler}
              />

              <TextField
                required
                type="password"
                name="password"
                id="password"
                label="Password"
                variant="outlined"
                value={inputValues.password}
                sx={{
                  marginTop: '1rem',
                }}
                onChange={onChangeHandler}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                display: 'block',
                margin: 'auto',
                marginTop: '2rem',
              }}
            >
              Login
            </Button>
          </CardContent>
          <CardActions>
            <Typography
              component="p"
              textAlign="center"
              margin="auto"
            >
              Don&apos;t Have Account ?
              <Link component={RouterLink} to="/register" sx={{ marginLeft: '.3rem' }}>Register</Link>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
