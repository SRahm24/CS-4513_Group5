import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  items: Array<string>,
  status: string,
) {
  return { name, items, status}
}

const rows = [
  createData('Table 1', ["Frozen yoghurt"], "Submitted"),
  createData('Table 5', ["Ice cream sandwich	"], "In Progress"),
  createData('Table 22', ["Eclair	"], "Ready"),
];

function BasicTable() {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Table</TableCell>
            <TableCell align="right">Items</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.items}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">
                <Button variant="contained" color="error" 
                onClick={() => 
                  { 
                  alert('clicked'); 
                  const bool = confirm('Are you sure you want to delete this order?');
                  if (bool) {
                    alert('Order deleted');
                  }
                  else
                  {
                    alert('Order not deleted');
                  }}}>
                Delete?
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Kitchen() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BasicTable /> {/* Added BasicTable component */}
    </>
  )
};

export default Kitchen;
