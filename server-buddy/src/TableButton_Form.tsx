import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import TextField from '@mui/material/TextField';
import { CardActions } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ccyFormat(num: number) {
    return `${num.toFixed(2)}`;
}

function createData(
    item: string,
    type: string,
    quantity: number,
    price: number
  ) {
    return { item, type, quantity, price };
}
  
const rows = [
    createData('Fried Mozzarella', "Appetizer", 1, 7.99),
    createData('Pep Slice', "Entree", 2, 9.98),
    createData('Coke', "Drink", 1, 1.99),
    createData('Lava Cake', "Dessert", 1, 4.99),
];

interface Row {
    item: string;
    type: string;
    quantity: number;
    price: number;
  }

function subtotal(items: readonly Row[]) {
    return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const Subtotal = subtotal(rows);
  

function TableCard(tableIndex:number){
    
    const [openOrder, setOpenOrder] = React.useState(false);

    const handleClickOpenOrder = () => {
        setOpenOrder(true);
    };

    const handleCloseOrder = () => {
        setOpenOrder(false);
    };

    const [openView, setOpenView] = React.useState(false);

    const handleClickOpenView = () => {
        setOpenView(true);
    };

    const handleCloseView = () => {
        setOpenView(false);
    };


    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Table {tableIndex}
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="outlined" onClick={handleClickOpenOrder}>
                    Order
                </Button>
                <Button variant="outlined" onClick={handleClickOpenView}>
                    View
                </Button>
            </CardActions>

            <Dialog
                open={openOrder}
                onClose={handleCloseOrder}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const name = formJson.Name;
                        console.log(name);
                        handleCloseOrder();
                    },
                }}
            >     
                <DialogTitle>Order</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        This will be the form for sending orders to the Kitchen
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="Name"
                        label="Server Name"
                        type="search"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOrder}>Cancel</Button>
                    <Button type="submit">Enter</Button>
                    </DialogActions>
            </Dialog>

            <Dialog
                open={openView}
                onClose={handleCloseView}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const name = formJson.Name;
                        console.log(name);
                        handleCloseView();
                    },
                }}
            >     
                <DialogTitle>View Orders</DialogTitle>
                <DialogContent>
                    {table()}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseView}>Close</Button>
                    </DialogActions>
            </Dialog>
    </Card>
    
  );
}

function table(){
    return(
        <TableContainer component={Paper}>
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell >Item</TableCell>
            <TableCell align="right">Type</TableCell>
            <TableCell align="right">Quantity&nbsp;</TableCell>
            <TableCell align="right">Price&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.item}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.item}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2} align="right">Subtotal</TableCell>
            <TableCell align="right">{ccyFormat(Subtotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    )
}


export default TableCard;