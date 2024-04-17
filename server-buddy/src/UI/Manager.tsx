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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material';
import { MenuAndItemsQueries } from '../database/queries/menuAndItemsQueries';
import { DocumentData } from 'firebase/firestore';
import { set } from 'firebase/database';
import { Item } from '../objects/menuItem';
import { setters } from '../database/setters/setters';

function createData(
  name: string,
  type: string,
  price: number,
) {
  return {
    name,
    type,
    price
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
          {row.name}
        </TableCell>
        <TableCell align="right">{row.type}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
                <Stack spacing={2} p={2}>
                    <Button variant="contained">Remove</Button>
                </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

async function getMenu(){
    const menu: {name: string, type: string, price: number}[] = [];
    let entireMenu: DocumentData[] = await MenuAndItemsQueries.getAllMenus();;
    entireMenu.forEach(menuItem => {
        console.log(createData(menuItem.name, menuItem.type, menuItem.price))
        menu.push(createData(menuItem.itemName, menuItem.itemCategory, menuItem.itemPrice));
    });
    return menu;
}

export default function ManagerMenuTable() {
    const [menu, setMenu]: any[] = React.useState([]);
    const [menuChange, setMenuChange] = React.useState(true);
    React.useEffect(() => {
      getMenu().then(data => setMenu(data));
      setMenuChange(false);
    }, [menuChange]);

    const [name, setName] = React.useState('');
    const [type, setType] = React.useState('');
    const [price, setPrice] = React.useState(0);

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const [openCreateItem, setOpenCreateItem] = React.useState(false);
    const handleClickCreateItem = () => {
        setOpenCreateItem(true);
    };
    const handleCloseOrder = () => {
        setOpenCreateItem(false);
        setName("");
    };
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align="right">Type&nbsp;</TableCell>
            <TableCell align="right">Cost&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {menu.map((row: {name: string, type: string, price: number}) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
        <Stack spacing={2} direction="row-reverse" p={2}>
          <Button variant="contained" onClick={handleClickCreateItem}>Create Menu Item</Button>
        </Stack>
      </Table>

      <Dialog
                open={openCreateItem}
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
                <DialogTitle>Create Menu Item</DialogTitle>
                <DialogContent>
                    <Stack>
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
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"App"}>Appetizer</MenuItem>
                        <MenuItem value={"Entree"}>Entree</MenuItem>
                        <MenuItem value={"Dessert"}>Dessert</MenuItem>
                        <MenuItem value={"Bev"}>Beverage</MenuItem>
                    </Select>
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
                        value={price}
                        onChange={(event) => {setPrice(Number(event.target.value))}}
                    />

                    </Stack>
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOrder}>Cancel</Button>
                    <Button onClick={() => {
                        setters.pushItem(new Item(name, "", "", price, 0, type, "")).then(() => {
                            setMenuChange(true);
                            setOpenCreateItem(false);
                            setName("");
                            setType("");
                            setPrice(0);
                        });
                        
                    }}>
                        Enter
                      </Button>
                    </DialogActions>
            </Dialog>
    </TableContainer>
  );
}