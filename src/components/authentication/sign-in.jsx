import {useEffect, useState} from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
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
  useRouteMatch,
  useNavigate
} from "react-router-dom";

export default function SignIn() {
   let navigate = useNavigate();
    const { state, handleChange } = useForm()
    const dispatch = useDispatch()
    const token = useSelector((state) => state.user.token)
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
    const [isLoading, setIsLoading] = useState(false)

    async function handleSubmit(event) {
        setIsLoading(true);
        event.preventDefault()
        dispatch(signIn(state.username, state.password, token))
        setIsLoading(false);
        navigate('/balance')
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
      <TextField  name={'username'} type={'text'} fullWidth value={state.username} onChange={handleChange} size="small" className="sign-in-input" id="outlined-basic" label="Username" variant="outlined" />
      </div>
      <div>
      <TextField name={'password'} type={'password'} value={state.password} onChange={handleChange} size="small" className="sign-in-input" id="outlined-basic" label="Password" variant="outlined" />
      </div>
      
      <LoadingButton fullWidth="true" loading={isLoading} type='submit' onClick={handleSubmit} className="sign-in-button" variant="contained">Sign in</LoadingButton>
      <p>Don't have an account yet? <Link className="link" to="/sign-up">Sign up</Link></p>
      </Box>
      </div>
  );
}


