import React from 'react'
import TextField from '@mui/material/TextField'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
// import DatePicker from '../DatePicker';
import FormGroup from '@mui/material/FormGroup'
import Switch from '@mui/material/Switch'
import useForm from '../hooks/useForm'
import EditIcon from '@mui/icons-material/Edit'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DatePicker from '@mui/lab/DatePicker'
import MuiAlert from '@mui/material/Alert'
import { getUserDetails, signIn } from '../redux/reducers/user'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import { useDispatch, useSelector } from 'react-redux'
import './edit-profile.scss'

export default function EditProfile({ userData, userDetails }) {
  const dispatch = useDispatch()
  const token = useSelector((state) => state.user.token)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  // const userData = useSelector((state) => state.user.userData)
  // const userDetails = useSelector((state) => state.user.userDetails)
  const { state, handleChange, handleSwitch, handleDatePick } = useForm(
    userDetails,
  )
  // const [editProfileError, setEditProfileError] = useState(false)
  const [isProfileUpdated, setIsProfileUpdated] = useState(false)

  // const Alert = React.forwardRef(function Alert(props, ref) {
  //   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
  // })

  async function handleSubmit(event) {
    event.preventDefault()

    console.log(userData)
    console.log(state)
    try {
      const response = await fetch(
        `https://api.breadcoin.pl/api/User/${userData.id}`,
        {
          method: 'PUT',
          body: JSON.stringify({
            id: userData.id, // !!! cannot be changed
            // login: 'Aziz1998', // !!! cannot be changed
            password: 'passwordTest2021', // can be changed
            denomination: 'gold', // can be changed
            email: state.email, // can be changed
            phoneNumber: state.phoneNumber, // can be changed
            firstName: state.firstName, // can be changed
            surname: state.surname, // can be changed
            dateOfBirth: state.dateOfBirth, // can be changed
            isAgreedToMarketing: state.isAgreedToMarketing, // can be changed
            isAgreedToSms: state.isAgreedToSms, // can be changed
            isAgreedToMail: state.isAgreedToMail, // can be changed
            isAgreedToGps: state.isAgreedToGps, // can be changed
          }),

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userData.jwtToken}`,
          },
        },
      )

      if (response.ok) {
        setIsProfileUpdated(true);
      }
      // console.log(response)
    } catch (error) {
      // setEditProfileError(true)
    }
    // console.log(response)
  }

  // console.log(state.firstName);
  return (
    <div className="edit-profile-container-wrapper">
      <div className="edit-profile-flex-view">
        <Box
          className="edit-profile-container"
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1 },
          }}
          fullWidth
          noValidate
          autoComplete="off"
        >
          <div className="profile-header-title">
            <h4>Profile settings</h4>
          </div>
          <div className="edit-profile-input-container-left">
            <h4>Personal information</h4>
            <div className="edit-profile-personal-info">
              <div>
                <TextField
                  name={'firstName'}
                  fullWidth
                  type={'text'}
                  value={state.firstName}
                  onChange={handleChange}
                  size="small"
                  className="edit-profile-input"
                  id="outlined-basic"
                  label="First name"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  name={'surname'}
                  fullWidth
                  type={'text'}
                  value={state.surname}
                  onChange={handleChange}
                  size="small"
                  className="edit-profile-input"
                  id="outlined-basic"
                  label="Last name"
                  variant="outlined"
                />
              </div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    className="edit-profile-date-picker"
                    size="small"
                    label="Date of birth"
                    name={'dateOfBirth'}
                    value={state.dateOfBirth}
                    onChange={(newValue) => {
                      handleDatePick('dateOfBirth', newValue)
                    }}
                    renderInput={(params) => (
                      <TextField
                      fullWidth
                        className="edit-profile-date-picker"
                        size="small"
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="edit-profile-credentials">
              <div>
                <TextField
                  name={'password'}
                  fullWidth
                  type={'password'}
                  value={state.password}
                  onChange={handleChange}
                  size="small"
                  className="edit-profile-input"
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  name={'email'}
                  type={'text'}
                  fullWidth
                  value={state.email}
                  onChange={handleChange}
                  size="small"
                  className="edit-profile-input"
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                />
              </div>
              <div>
                <TextField
                  name={'phoneNumber'}
                  fullWidth
                  type={'text'}
                  value={state.phoneNumber}
                  onChange={handleChange}
                  size="small"
                  className="edit-profile-input"
                  id="outlined-basic"
                  label="Phone number"
                  variant="outlined"
                />
              </div>
            </div>
          </div>
          {/* <h4>Terms and Privacy Policy</h4> */}
          <div className="edit-profile-input-container">
            <h4>Agreement conditions</h4>
            <div className="edit-profile-agreement-switch-left">
              <div>
                <FormControlLabel
                  // value="end"
                  control={
                    <Switch
                      // size="small"
                      className="edit-profile-switch"
                      name={'isAgreedToMarketing'}
                      value={state.isAgreedToMarketing}
                      onChange={handleSwitch}
                      defaultChecked
                      // color="success"
                    />
                  }
                  label={'Agree to Marketing'}
                  color="red"
                  labelPlacement="end"
                />
              </div>
              <div>
                <FormControlLabel
                  // value="end"
                  control={
                    <Switch
                      // size="small"
                      className="edit-profile-switch"
                      name={'isAgreedToMail'}
                      value={state.isAgreedToMail}
                      onChange={handleSwitch}
                      defaultChecked
                      // color="success"
                    />
                  }
                  label={'Agree to Email'}
                  color="red"
                  labelPlacement="end"
                />
              </div>
            </div>
            <div className="edit-profile-agreement-switch-right">
              <div>
                <FormControlLabel
                  // value="end"
                  control={
                    <Switch
                      // size="small"
                      className="edit-profile-switch"
                      name={'isAgreedToGps'}
                      value={state.isAgreedToGps}
                      defaultChecked
                      onChange={handleSwitch}
                      // color="success"
                    />
                  }
                  label={'Agree to Gps'}
                  color="red"
                  labelPlacement="end"
                />
              </div>
              <div>
                <FormControlLabel
                  // value="start"
                  control={
                    <Switch
                      // size="small"
                      className="edit-profile-switch"
                      name={'isAgreedToSms'}
                      value={state.isAgreedToSms}
                      defaultChecked
                      onChange={handleSwitch}
                      // color="success"
                    />
                  }
                  label={'Agree to Sms'}
                  color="red"
                  labelPlacement="end"
                />
              </div>
            </div>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="edit-profile-submit-button"
              variant="contained"
            >
              Save
            </Button>
            <Stack
          sx={{ width: '100%', height: '50px', marginTop: '10px' }}
          spacing={2}
        >
          {isProfileUpdated && (
            <Alert severity="success">
            Procced with next in order to complete isConfirmRegistrationSuccess
          </Alert>
          )}
        </Stack>
          </div>
        </Box>
      </div>
    </div>
  )
}
