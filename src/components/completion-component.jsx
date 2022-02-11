import { useEffect } from 'react'

import Box from '@mui/material/Box'
import './confirmation-component.scss'
import useForm from '../hooks/useForm'

import { confirmRegistrationCode } from '../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import './completion-component.scss'

export default function Completion() {
  const userData = useSelector((state) => state.user.userData)

  return (
    <div className="completion-component-container">
      <Box
        className="completion-component-wrapper"
        component="form"
        sx={{
          '& .MuiTextField-root': { mb: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <img id="completion-company-logo" src="https://infopiek.pl/wp-content/uploads/2020/09/optimized-logo.png" />
        <h2>Thanks for signing up.</h2>
        <p>
          We'll keep you posted on the latest product updates, news and special
          offers.
        </p>
      </Box>
    </div>
  )
}
