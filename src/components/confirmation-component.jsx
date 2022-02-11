import { useEffect } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
// import FacebookIcon from '@mui/icons-material/Facebook';
// import './login.scss'
// import './sign-in.scss'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import './confirmation-component.scss'
import useForm from '../hooks/useForm'

import { confirmRegistrationCode } from '../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from 'react-router-dom'

export default function Confirmation({ childFunc }) {
  const { state, handleChange } = useForm()
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const confirmationDetails = useSelector(
    (state) => state.user.confirmationDetails,
  )
  const userData = useSelector((state) => state.user.userData)
  // useEffect(() => {
  //   childFunc.current = handleSubmit
  // }, [])

  async function handleSubmit(event) {
    event.preventDefault()
    const { confirmationCode, id: userId } = confirmationDetails
    if (confirmationCode === state.confirmationCode) {
      dispatch(confirmRegistrationCode(confirmationDetails))
    }
  }

  return (
    <div className="confirmation-component-container">
      <Box
        className="confirmation-component-wrapper"
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Check your email</h2>
        <p>
          To confirm your acoount enter 6-digit code that was just sent to your
          email or phone number.
        </p>
        <div>
          <TextField
            name={'confirmationCode'}
            type={'text'}
            value={state.confirmationCode}
            onChange={handleChange}
            size="small"
            className="login-input"
            id="outlined-basic"
            label="Confirmation code"
            variant="outlined"
          />
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="confirmation-submit-button"
          variant="contained"
        >
          Submit
        </Button>
        <p>
          Didn't get a code? Resend or{' '}
          <Link to="/sign-up">contact Support</Link>
        </p>
        <Stack
          sx={{ width: '100%', height: '50px', marginTop: '10px' }}
          spacing={2}
        >
          {Object.keys(userData).length !== 0 && (
            // <Alert severity="error">
            //   This is an error alert — check it out!
            // </Alert>
            <Alert severity="success">
              Procced with next in order to complete registration
              {/* Thanks for signing up, looking forward for breadcoin management! */}
            </Alert>
          )}
          {/* <Alert severity="warning">
            This is a warning alert — check it out!
          </Alert>
          <Alert severity="info">This is an info alert — check it out!</Alert> */}
          {/* {isConfirmRegistrationSuccess && (
            <Alert severity="success">
              Procced with next in order to complete registration */}
          {/* Thanks for signing up, looking forward for breadcoin management! */}
          {/* </Alert> */}
          {/* // )} */}
        </Stack>
      </Box>
    </div>
  )
}
