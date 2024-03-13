import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

let OrderId: number = 0;
const rows: any[] = [];

function onClickCheckout(row: ReturnType<typeof createData>){

}

function onClickAddItem(row: ReturnType<typeof createData>){

}


function createData(
    Name:String,
    Time: String,
    Date: String,
    Status: String,
    order: any[]
  ) {
    OrderId += 1;
    return {
      OrderId,
      Name,
      Time,
      Date,
      Status,
      order,
    };
  }
  
  function Row(props: { row: ReturnType<typeof createData> }) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
  
    return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.OrderId}
          </TableCell>
          <TableCell align="right">{row.Name}</TableCell>
          <TableCell align="right">{row.Time}</TableCell>
          <TableCell align="right">{row.Date}</TableCell>
          <TableCell align="right">{row.Status}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Order
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Type</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Price ($)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.order.map((orderRow) => (
                      <TableRow key={orderRow.itemId}>
                        <TableCell component="th" scope="row">
                          {orderRow.itemId}
                        </TableCell>
                        <TableCell>{orderRow.item}</TableCell>
                        <TableCell align="right">{orderRow.type}</TableCell>
                        <TableCell align="right">{orderRow.quantity}</TableCell>
                        <TableCell align="right">{orderRow.status}</TableCell>
                        <TableCell align="right">{orderRow.price}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Stack spacing={2} p={2} direction="row">
                    <Button variant="contained" onClick={() => onClickCheckout(row)}>Checkout</Button>
                    <Button variant="contained" onClick={() => onClickAddItem(row)}>Add item</Button>
                    <Button variant="contained">Remove</Button>
                </Stack>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
function CollapsibleTable() {
    const [name, setName] = React.useState('');
    const [openOrder, setOpenOrder] = React.useState(false);
    const handleClickOpenOrder = () => {
        setOpenOrder(true);
    };
    const handleCloseOrder = () => {
        setOpenOrder(false);
        setName("");
    };

    const [Item, setItem] = React.useState('');
    const [Type, setType] = React.useState('');
    const [Quantity, setQuantity] = React.useState(0);
    const [Status, setStatus] = React.useState('In progress');
    const [Price, setPrice] = React.useState(0.0);
    
    const [openGetItem, setOpenGetItem] = React.useState(false);
    const handleClickOpenGetItem = () => {
        setOpenGetItem(true);
    };
    const handleCloseGetItem = () => {
        setOpenGetItem(false);
        setItem("");
        setType("");
        setQuantity(0);
        setPrice(0);
    };

    const [isPushing, setIsPushing] = React.useState(false);

    const [openItemTable, setOpenItemTable] = React.useState(false);
    const handleClickOpenItemTable = () => {
        setOpenItemTable(true);
    };
    const handleCloseItemTable = () => {
        setOpenItemTable(false);
    };

    const [itemTable, setItemTable]: any[] = React.useState([]);
    const resetItemTable = () => {
      setItemTable((itemTable: any) => []);
    }

    React.useEffect(() => {
      if(isPushing){
        let ItemId = 0;
        let newItemTable = [];
        itemTable.forEach((element: any) => {
          ItemId++;
          newItemTable.push(element);
        });
        newItemTable.push({itemId: ItemId + 1, item: Item, type: Type, quantity: Quantity, status: Status, price: Price});

        setItemTable(newItemTable);
        setIsPushing(false);
      }
    }, [isPushing])

    return (
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Order Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Date&nbsp;</TableCell>
              <TableCell align="right">Status&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.OrderId} row={row} />
            ))}
          </TableBody>
        </Table>
        <Stack spacing={2} direction="row-reverse" p={2}>
          <Button variant="contained" onClick={handleClickOpenOrder}>Create Order</Button>

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
                <DialogTitle>Create Order</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="Name"
                        label="Name"
                        type="search"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(event) => {setName(event.target.value)}}
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOrder}>Cancel</Button>
                    <Button onClick={
                      handleClickOpenItemTable
                      }>
                        Enter
                      </Button>
                    </DialogActions>
            </Dialog>

            <Dialog
                open={openItemTable}
                onClose={handleCloseItemTable}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const name = formJson.Name;
                        console.log(name);
                        handleCloseItemTable();
                    },
                }}
            >     
                <DialogTitle>Item Table</DialogTitle>
                <DialogContent>
                    
                <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Order
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Type</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Price ($)</TableCell>
                      <TableCell align="right"></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {itemTable.map((item:{itemId: number, item: String, type: String, quantity: number, status: String, price: number}) => (
                      <TableRow key={item.itemId}>
                        <TableCell component="th" scope="row">
                          {item.itemId}
                        </TableCell>
                        <TableCell>{item.item}</TableCell>
                        <TableCell align="right">{item.type}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">{item.status}</TableCell>
                        <TableCell align="right">{item.price}</TableCell>
                        <Stack p={1}>
                          <Button variant="contained" onClick={() => {
                            let table: any[] = [];
                            let offset = 0;
                            itemTable.forEach((element: any) => {
                              if(element.itemId != item.itemId){
                                element.itemId -= offset;
                                table.push(element);
                              }
                              else{
                                offset += 1;
                              }
                            });
                            setItemTable(table);
                          }}>
                            Remove
                          </Button>
                        </Stack>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Stack spacing={2} p={2}>
                  <Button variant="contained" onClick={handleClickOpenGetItem}>Add Item</Button>
                </Stack>
              </Box>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenItemTable(false); setItemTable((itemTable: any) => []);}}>Back</Button>
                    <Button type="submit" onClick={() => {
                      let date = new Date(); 
                      let hours: String = (date.getHours() % 12).toString();
                      let minutes: String = date.getMinutes().toString();
                      if (date.getMinutes() < 10){
                        minutes = "0" + date.getMinutes();
                      }

                      rows.push(createData(name, hours + ":" + minutes, date.getMonth().toString() + "/" + date.getDate().toString(), "In progress", itemTable));
                      handleCloseItemTable();
                      setOpenOrder(false);
                      setName("");
                      resetItemTable();
                      }}>
                        Enter
                      </Button>
                    </DialogActions>
            </Dialog>


            <Dialog
                open={openGetItem}
                onClose={handleCloseGetItem}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        const name = formJson.Name;
                        console.log(name);
                        handleCloseGetItem();
                    },
                }}
            >     
                <DialogTitle>Add item</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="item"
                    name="item"
                    label="item"
                    type="search"
                    fullWidth
                    variant="standard"
                    value={Item}
                    onChange={(event) => {setItem(event.target.value)}}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="type"
                    name="type"
                    label="type"
                    type="search"
                    fullWidth
                    variant="standard"
                    value={Type}
                    onChange={(event) => {setType(event.target.value)}}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="quantity"
                    name="quantity"
                    label="quantity"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={Quantity}
                    onChange={(event) => {setQuantity(Number(event.target.value))}}
                  />
                  <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="price"
                    name="price"
                    label="price"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={Price}
                    onChange={(event) => {setPrice(Number(event.target.value))}}
                  />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseGetItem}>Cancel</Button>
                    <Button type="submit" onClick={() => {
                      setIsPushing(true);
                      handleCloseGetItem;
                      }}
                    >
                        Enter
                      </Button>
                    </DialogActions>
            </Dialog>
            
        </Stack>
      </TableContainer>
      
    );
  }

function ToGo() {
    return (
        <Container maxWidth={false}>
            {CollapsibleTable()}
        </Container>
    )
}

export default ToGo;