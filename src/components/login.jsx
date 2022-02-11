import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
// import FacebookIcon from '@mui/icons-material/Facebook';
import './login.scss'

export default function BasicTextFields() {

  return (
    <form className="login-form">
      <TextField size="small" className="login-input" id="outlined-basic" label="Username" variant="outlined" />
      <TextField size="small" className="login-input" id="outlined-basic" label="Password" variant="outlined" />
      <FormControlLabel
          value="end"
          control={<Checkbox defaultChecked color="success"/>}
          label={
          <p className="privacy-label">I accept the 
            {<span className="privacy-linked-text">&nbsp;Terms&nbsp;</span>}
             and
             <span className="privacy-linked-text">&nbsp;Privacy Policy</span>
             </p>}
          color="red"
          labelPlacement="end"
        />
      <Button className="login-button" variant="contained">Sign in</Button>
      {/* <FacebookIcon/> */}
    </form>
  );
}