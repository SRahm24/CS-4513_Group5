import { useState } from 'react';
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
                    <DialogContentText>
                        This will where you can view the table's orders
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseView}>Close</Button>
                    </DialogActions>
            </Dialog>
    </Card>

    
  );
}

export default TableCard;