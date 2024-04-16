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
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuAndItemsQueries } from '../database/queries/menuAndItemsQueries';
import { DocumentData } from 'firebase/firestore';
import { TicketManager } from './TicketManager';
import { reload } from 'firebase/auth';


const manager: TicketManager = new TicketManager();
let refresh = false;


function onClickCheckout(row: ReturnType<typeof createData>){

}

function onClickAddItem(row: ReturnType<typeof createData>){

}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

let entireMenu: DocumentData[] = [];

MenuAndItemsQueries.getAllMenus().then(menus => {
  entireMenu = menus;
});



function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function createData(
    Name:String,
    Time: String,
    Date: String,
    Status: String,
    order: any[]
  ) {
    let TicketId = "";
    return {
      TicketId,
      Name,
      Time,
      Date,
      Status,
      order,
    };
  }
  
  function Row(props: { row: ReturnType<typeof createData> }) {
    const {row} = props;
    const [orders, setOrders]: any[] = React.useState(row.order);
    const [open, setOpen] = React.useState(false);

    const [itemTable, setItemTable]: any[] = React.useState([]);
    const [openItemTable, setOpenItemTable] = React.useState(false);
    const handleClickOpenItemTable = () => {
        setOpenItemTable(true);
    };
    const handleCloseItemTable = () => {
        setOpenItemTable(false);
    };

    const handleDelete = (rowIndex: number) => {
      setOrders((prevRows:any) =>
      prevRows.filter((_:any, index:any) => index !== rowIndex)
      );
    };

    let startMenu: DocumentData[] = [];

    entireMenu.forEach(item => {
      if(item.type == "App"){
        startMenu.push(item);
      }
    });

    const [menu, setMenu] = React.useState(startMenu);

    const [Item, setItem] = React.useState('');
    const [Type, setType] = React.useState('App');
    const [Quantity, setQuantity] = React.useState(1);
    const [Status, setStatus] = React.useState('In progress');
    const [Price, setPrice] = React.useState(0.0);

    const [openGetItem, setOpenGetItem] = React.useState(false);
    const handleClickOpenGetItem = () => {
        setOpenGetItem(true);
    };
    const handleCloseGetItem = () => {
        setOpenGetItem(false);
        setItem("");
        setQuantity(1);
        setPrice(0);
    };
    const resetItemTable = () => {
      setItemTable((itemTable: any) => []);
    }

    const [alignment, setAlignment] = React.useState('App');
    const handleToggleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };

    const [itemName, setItemName] = React.useState<string[]>([]);

    const handleSelectChange = (event: SelectChangeEvent<typeof itemName>) => {
      const {
        target: { value },
      } = event;
      setItemName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );

      let itemPrice = 0;
      menu.forEach(item => {
        if(item.name == value){
          itemPrice = item.price;
        }
      });

      setPrice(itemPrice * Quantity);
    };
    
    const theme = useTheme();

    const [isPushing, setIsPushing] = React.useState(false);
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
        setItemName([]);
        setIsPushing(false);
      }

      let nme = "";
      itemName.forEach(char => {
        nme += char;
      });
      setItem(nme);
    }, [isPushing, itemName]);

    

    return (
      <React.Fragment>

        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
                    {row.order.map((orderRow, orderRowIndex) => (
                      <TableRow key={orderRow.itemId}>
                        <TableCell component="th" scope="row">
                          {orderRow.itemId}
                        </TableCell>
                        <TableCell>{orderRow.item}</TableCell>
                        <TableCell align="right">{orderRow.type}</TableCell>
                        <TableCell align="right">{orderRow.quantity}</TableCell>
                        <TableCell align="right">{orderRow.status}</TableCell>
                        <TableCell align="right">
                          <Button variant="contained" color="error" 
                          onClick={() => 
                            { 
                            const bool = confirm('Are you sure you want to delete this order?');
                            if (bool) {
                              handleDelete(orderRowIndex);
                              alert('Order deleted');
                            }
                            else
                            {
                              alert('Order not deleted');
                            }}}>
                          DELETE
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  
function KitchenTable() {
    const [rows, setRows]: any[] = React.useState([]);
    React.useState(() => {
      manager.getAllTicketData().then(ticketData => setRows(ticketData));
    })

    let startMenu: DocumentData[] = [];

    entireMenu.forEach(item => {
      if(item.type == "App"){
        startMenu.push(item);
      }
    });

    const [menu, setMenu] = React.useState(startMenu);

    const [name, setName] = React.useState('To-Go');
    const [openOrder, setOpenOrder] = React.useState(false);
    const handleClickOpenOrder = () => {
        setOpenOrder(true);
    };
    const handleCloseOrder = () => {
        setOpenOrder(false);
        setName("");
    };

    const [Item, setItem] = React.useState('');
    const [Type, setType] = React.useState('App');
    const [Quantity, setQuantity] = React.useState(1);
    const [Status, setStatus] = React.useState('In progress');
    const [Price, setPrice] = React.useState(0.0);
    
    const [openGetItem, setOpenGetItem] = React.useState(false);
    const handleClickOpenGetItem = () => {
        setOpenGetItem(true);
    };
    const handleCloseGetItem = () => {
        setOpenGetItem(false);
        setItem("");
        setQuantity(1);
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

    const [alignment, setAlignment] = React.useState('App');
    const handleToggleChange = (
      event: React.MouseEvent<HTMLElement>,
      newAlignment: string,
    ) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };

    const theme = useTheme();
    const [itemName, setItemName] = React.useState<string[]>([]);

    const handleSelectChange = (event: SelectChangeEvent<typeof itemName>) => {
      const {
        target: { value },
      } = event;
      setItemName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );

      let itemPrice = 0;
      menu.forEach(item => {
        if(item.name == value){
          itemPrice = item.price;
        }
      });

      setPrice(itemPrice * Quantity);
    };

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
        setItemName([]);
        setIsPushing(false);
      }

      let nme = "";
      itemName.forEach(char => {
        nme += char;
      });
      setItem(nme);
    }, [isPushing, itemName]);

    return (
      <TableContainer component={Paper} >
        <Table aria-label="collapsible table">
          <TableBody>
            {rows.map((row: any) => (
              <Row key={row.TicketId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
    );
  }

function ToGo() {
    return (
        <Container maxWidth={false}>
            {KitchenTable()}
        </Container>
    )
}

export default ToGo;