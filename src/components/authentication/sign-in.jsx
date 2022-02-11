import {useEffect} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import './login.scss'

import './sign-in.scss'
import useForm from '../../hooks/useForm'

import { signIn }  from '../../redux/reducers/user'

import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";

export default function SignIn() {
    const { state, handleChange } = useForm()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)


    async function handleSubmit(event) {
        event.preventDefault()
        dispatch(signIn(state.username, state.password, token))
    }

  return (
    <div className="container">
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { mb: 2, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
  >
    <h2>Sign in</h2>
    <div>
      <TextField  name={'username'} type={'text'} value={state.username} onChange={handleChange} size="small" className="login-input" id="outlined-basic" label="Username" variant="outlined" />
      </div>
      <div>
      <TextField name={'password'} type={'password'} value={state.password} onChange={handleChange} size="small" className="login-input" id="outlined-basic" label="Password" variant="outlined" />
      </div>
      <Button fullWidth="true" type='submit' onClick={handleSubmit} className="login-button" variant="contained">Sign in</Button>
      <p>Don't have an account yet? <Link to="/sign-up">Sign up</Link></p>
      </Box>
      </div>
  );
}