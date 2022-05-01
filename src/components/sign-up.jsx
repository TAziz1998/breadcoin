import { useEffect } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import BasicSelect from './Dropdown'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
// import FacebookIcon from '@mui/icons-material/Facebook';
import './login.scss'
import useForm from '../hooks/useForm'
import { signUp } from '../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'

export default function SignUp() {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const { state, handleChange, handleSwitch, handleDatePick } = useForm()
  const confirmRegistrationError = useSelector(
    (state) => state.user.confirmRegistrationError,
  )
  const isConfirmRegistrationSuccess = useSelector(
    (state) => state.user.isConfirmRegistrationSuccess,
  )

  async function handleSubmit(event) {
    event.preventDefault()
    const {
      email,
      isAgreedToMarketing,
      isAgreedToSms,
      isAgreedToMail,
      isAgreedToGps,
    } = state

    let denomination
    if (email.length == 0) {
      // cooper denomination
      denomination = 'cooper'
    } else if (
      isAgreedToMarketing &&
      isAgreedToSms &&
      isAgreedToMail &&
      isAgreedToGps
    ) {
      // gold denomination
      denomination = 'gold'
    } else {
      // silver denomination
      denomination = 'silver'
    }
    dispatch(signUp({ ...state, denomination }))
  }

  return (
    <Box
      className="signup-container"
      component="form"
      sx={
        {
          // '& .MuiTextField-root': { height: '100px' },
        }
      }
      noValidate
      autoComplete="off"
    >
      <h2>Sign up</h2>
      <div className="signup-input-container">
        <div className="signup-credentials">
          <div>
            <TextField
              size="small"
              className="signup-input"
              id="outlined-basic"
              label="Username"
              variant="outlined"
              name={'login'}
              value={state.login}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              size="small"
              className="signup-input"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type={'password'}
              name={'password'}
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              size="small"
              className="signup-input"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name={'email'}
              value={state.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              size="small"
              className="signup-input"
              id="outlined-basic"
              label="Phone number"
              variant="outlined"
              name={'phoneNumber'}
              value={state.phoneNumber}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="signup-personal-info">
          <div>
            <TextField
              size="small"
              className="signup-input"
              id="outlined-basic"
              label="First name"
              variant="outlined"
              name={'firstName'}
              value={state.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              size="small"
              className="signup-input"
              id="outlined-basic"
              label="Last name"
              variant="outlined"
              name={'surname'}
              value={state.surname}
              onChange={handleChange}
            />
          </div>
          <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                size="small"
                className="signup-date-picker"
                label="Date of birth"
                name={'dateOfBirth'}
                value={state.dateOfBirth}
                onChange={(newValue) => {
                  handleDatePick('dateOfBirth', newValue)
                }}
                renderInput={(params) => (
                  <TextField
                    size="small"
                    className="signup-date-picker"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </div>
          <div>
            <Box sx={{ minWidth: 120, marginTop: '15px' }} size="small">
              <FormControl size="small" fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Source application
                </InputLabel>
                <Select
                  // size="small"
                  className="signup-input"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Source application"
                  name={'sourceApplication'}
                  value={state.sourceApplication}
                  onChange={handleChange}
                >
                  <MenuItem value={'putka'}>Putka</MenuItem>
                  <MenuItem value={'szabelski'}>Szabelski</MenuItem>
                  <MenuItem value={'romanowski'}>Romanowski</MenuItem>
                </Select>
              </FormControl>
            </Box>
            {/* <BasicSelect/> */}
          </div>
        </div>
      </div>

      <div className="signup-input-container">
        <div className="agreement-checkboxes">
          <div>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  size="small"
                  name={'isAgreedToMarketing'}
                  value={state.isAgreedToMarketing}
                  onChange={handleSwitch}
                  color="success"
                />
              }
              label={'Agree to marketing'}
              color="red"
              labelPlacement="end"
            />
          </div>
          <div>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  size="small"
                  name={'isAgreedToMail'}
                  value={state.isAgreedToMail}
                  onChange={handleSwitch}
                  color="success"
                />
              }
              label={'Agree to email'}
              color="red"
              labelPlacement="end"
            />
          </div>
        </div>
        <div className="agreement-checkboxes">
          <div>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  size="small"
                  name={'isAgreedToGps'}
                  value={state.isAgreedToGps}
                  onChange={handleSwitch}
                  color="success"
                />
              }
              label={'Agree to gps'}
              color="red"
              labelPlacement="end"
            />
          </div>
          <div>
            <FormControlLabel
              value="end"
              control={
                <Checkbox
                  size="small"
                  name={'isAgreedToSms'}
                  value={state.isAgreedToSms}
                  onChange={handleSwitch}
                  color="success"
                />
              }
              label={'Agree to sms'}
              color="red"
              labelPlacement="end"
            />
          </div>
        </div>
        <Button
          type="submit"
          onClick={handleSubmit}
          className="signup-submit-button"
          variant="contained"
        >
          Submit
        </Button>
        <p className="link-to-sign-in">Already have an account? <Link className="link" to="/sign-in">Sign in</Link></p>
        <Stack
          sx={{ width: '100%', height: '50px', marginTop: '10px' }}
          spacing={2}
        >
          {Object.keys(confirmRegistrationError).length !== 0 && (
            <Alert severity="error">
              This is an error alert — check it out!
            </Alert>
          )}
          {/* <Alert severity="warning">
            This is a warning alert — check it out!
          </Alert>
          <Alert severity="info">This is an info alert — check it out!</Alert> */}
          {isConfirmRegistrationSuccess && (
            <Alert severity="success">
              Procced with next in order to complete registration
              {/* Thanks for signing up, looking forward for breadcoin management! */}
            </Alert>
          )}
        </Stack>
      </div>
    </Box>
  )
}
