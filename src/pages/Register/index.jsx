import { useState } from 'react';
import { useMutation } from '@apollo/client';
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

// Helper
import UserHelper from '../../utils/UserHelper';

// Apollo
import Mutation from '../../services/apollo/users/mutation';
import Loading from '../../components/Loading';

const initialValues = {
  username: '',
  password: '',
};

const Register = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState(initialValues);

  const [createUser,
    { loading: createUserLoading, error: createUserError, data: createUserResult },
  ] = useMutation(Mutation.createUser);

  if (createUserLoading) {
    return (<Loading />);
  }

  if (createUserError) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: createUserError.message,
    });
  }

  if (createUserResult) {
    navigate('/', { replace: true });
  }

  const onChangeHandler = (event) => {
    const newInputValues = inputValues;
    inputValues[event.target.name] = event.target.value;

    setInputValues({ ...newInputValues });
  };

  const registerHandler = (event) => {
    event.preventDefault();

    const newUser = UserHelper.createSecureUser(inputValues);

    createUser({ variables: newUser });
    setInputValues(initialValues);
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
          onSubmit={registerHandler}
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
              Register
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
              Already Have Account ?
              <Link component={RouterLink} to="/" sx={{ marginLeft: '.3rem' }}>Log In</Link>
            </Typography>
          </CardActions>
        </Card>
      </Box>
    </Container>
  );
};

export default Register;
