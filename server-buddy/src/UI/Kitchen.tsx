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
import { updateDB } from '../database/setters/updateDB';
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

    const [itemTable, setItemTable]: any[] = React.useState([]);

    const handleDelete = (index:number,e:any) => {
      setOrders(orders.filter((v:any, i:number) => i !== index));
  }

    const updateTable = (rowItemId: number) => {
      setOrders((prevRows: any) =>
        prevRows.filter((_: any) => _.itemId !== rowItemId)
      );
  
      // Check if the order status is "Completed"
      if (row.Status === "Completed") {
        // Perform any additional actions, such as deleting the row entry from the database
        // For demonstration purposes, I'm just logging the deletion
        alert("Row with Ticket ID ${row.TicketId} deleted from database.");
      }
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
                  Order Details (Ticket ID: {row.TicketId})
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Quantity</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.order.map((orderRow, orderRowIndex) => (
                      <TableRow key={orderRow.itemId}>
                        <TableCell component="th" scope="row">
                          {orderRow.itemId}
                        </TableCell>
                        <TableCell>{orderRow.item}</TableCell>
                        <TableCell align="right">{orderRow.quantity}</TableCell>
                        <TableCell align="right">{orderRow.status}</TableCell>
                        <TableCell align="right">
                          <Button variant="contained" 
                          onClick={buttonClicked => 
                            {
                              const bool = confirm('Are you sure you want to update this order?');
                              if (bool && orderRow.status == "In Progress") 
                                {
                                orderRow.status = "Ready";
                                alert('Order status updated to Ready');
                                alert(orderRowIndex);
                                // update the ticket's status to Ready
                                updateTable(orderRowIndex);
                              }
                              else if (bool && orderRow.status == "Ready") 
                                {
                                  orderRow.status = "Completed";
                                  alert('Order status updated to Completed');
                                  // delete the row based on its index
                                  alert(orderRow);
                                  updateDB.updateOrderStatus(orderRow);
                                  updateTable(orderRow);
                                }
                              else if (bool && orderRow.status == "Completed") 
                                {
                                  handleDelete(orderRowIndex, buttonClicked);
                                }
                              else if (bool == false)
                                {
                                alert('Order status not updated');
                              }
                            }}>
                          UPDATE
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


    const [Item, setItem] = React.useState('');
    const [Type, setType] = React.useState('App');
    const [Quantity, setQuantity] = React.useState(1);
    const [Status, setStatus] = React.useState('In progress');
    const [Price, setPrice] = React.useState(0.0);
    
    const [isPushing, setIsPushing] = React.useState(false);

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
            {rows.map((row: any, rowIndex : number) => (
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