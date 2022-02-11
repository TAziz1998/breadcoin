import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120, marginTop: '15px'}} size="small">
      <FormControl size="small" fullWidth>
        <InputLabel id="demo-simple-select-label">Source application</InputLabel>
        <Select
        // size="small"
        className="signup-input"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Source application"
          onChange={handleChange}
        >
          <MenuItem value={10}>Putka</MenuItem>
          <MenuItem value={20}>Szabelski</MenuItem>
          <MenuItem value={30}>Romanowski</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}