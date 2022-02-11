import { useEffect } from 'react'

import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
// import FacebookIcon from '@mui/icons-material/Facebook';
import './breadcoin-transfer.scss'
import { useDispatch, useSelector } from 'react-redux'
import useForm from '../hooks/useForm'
// import { HubConnection } from 'signalr-client-react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import {
  JsonHubProtocol,
  HttpTransportType,
  HubConnectionBuilder,
  LogLevel,
} from '@aspnet/signalr'
import { receiveBreadcoin }  from '../redux/reducers/user'
// const signalR = require('@microsoft/signalr')
export default function BreadcoinReceive({userData}) {
  const { state, handleChange, handleSwitch, handleDatePick } = useForm()
  const dispatch = useDispatch()

  async function handleSubmit(event) {
    // const { jwtToken } = userData
    event.preventDefault()
    dispatch(receiveBreadcoin(userData, state))
  }

  useEffect(() => {
    const { jwtToken } = userData
    const connectionHub = 'https://api.breadcoin.pl/api/userHub'
    const protocol = new JsonHubProtocol()

    // let transport to fall back to to LongPolling if it needs to
    const transport =
      HttpTransportType.WebSockets | HttpTransportType.LongPolling

    const options = {
      transport,
      logMessageContent: true,
      logger: LogLevel.Trace,
      Authorization: () => `Bearer ${jwtToken}`,
    }

    // create the connection instance
    const connection = new HubConnectionBuilder()
      .withUrl(connectionHub, options)
      .withHubProtocol(protocol)
      .build()

    connection.on('CodeUsedNotification', onNotifReceived)
    connection.on('TransferApprovedNotification', onNotifReceived)
    connection.on('TransferRejectedNotification', onNotifReceived)
  }, [])

  const onNotifReceived = (res) => {
    console.log('****** NOTIFICATION ******', res)
  }

  return (
    <div className="breadcoin-transfer-container">
      <Box
        className="breadcoin-transfer-wrapper"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <h2>Breadcoin receive</h2>
    <p>Please specify the code that you have received by email and company name in order to receive the breadcoins.</p>
        <div>
          <TextField
            size="small"
            className="breadcoin-transfer-input"
            id="outlined-basic"
            label="Code"
            variant="outlined"
            name={'breadcoinTransferCode'}
            value={state.breadcoinTransferCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <Box sx={{ width: '255px', margin: '5px auto' }} size="small">
            <FormControl size="small" fullWidth>
              <InputLabel id="demo-simple-select-label">
                Company Name
              </InputLabel>
              <Select
                size="small"
                className="breadcoin-transfer-input"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Company Name"
                name={'companyName'}
                value={state.companyName}
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
        <div>
          <Button
          //  size="small"
            type="submit"
            onClick={handleSubmit}
            className="breadcoin-transfer-button"
            variant="contained"
          >
            Submit
          </Button>
        </div>
        <p>Would you like to send breadcoins? <Link to="/breadcoin-transfer">Send breadcoins</Link></p>
      </Box>
    </div>
  )
}
