import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useEffect} from 'react';
import { getBalance }  from '../../redux/reducers/user'
import { useDispatch, useSelector } from 'react-redux'
function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

// "companyId": 0,
// "companyName": "string",
// "points": 0,
// "realCurrency": 0,
// "currency": "string"

export default function Balance({userData}) {
  const dispatch = useDispatch()
  const balance = useSelector((state) => state.user.balance)
  
  useEffect(() => {
    dispatch(getBalance(userData))
  }, [])

  console.log(balance);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Points</TableCell>
            <TableCell align="right">Real currency</TableCell>
            <TableCell align="right">Provision</TableCell>
            <TableCell align="right">Transaction</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balance.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
              {row.companyName}
              </TableCell>
              <TableCell align="right">{row.currency}</TableCell>
              <TableCell align="right">{row.points}</TableCell>
              <TableCell align="right">{row.realCurrency}</TableCell>
              <TableCell align="right">{row.provision}</TableCell>
              <TableCell align="right">{row.minimumTransactionValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}