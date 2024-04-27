import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { TicketManager } from './TicketManager';
import { OrdersQueries } from '../database/queries/ordersQueries';
import { Order } from '../objects/order';
import { reload } from 'firebase/auth';
import { updateDB } from '../database/setters/updateDB';

const manager: TicketManager = new TicketManager();
let refresh = false;

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

  function createData(
    ticketId: string,
    employeeId: string,
    tableId: number,
    orderStatus: string,
    menuItems: any[]
  ) {
    let orderId = "";
    return { 
      orderId,
      ticketId,
      tableId,
      orderStatus,
      menuItems
    };
  }

  function Row(props: { row: ReturnType<typeof createData> }) {
    const {row} = props;
    const [menuItem, setMenuItem]: any[] = React.useState(row.menuItems);

    return (
      <React.Fragment>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Order ID: {row.orderId}
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Table Id</TableCell>
                      <TableCell>Item</TableCell>
                      <TableCell align="right">Ticket Id</TableCell>
                      <TableCell align="right">Status</TableCell>
                      <TableCell align="right">Update</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.menuItems.map((menuItem: any) => (
                      <TableRow key={row.orderId}>
                        <TableCell component="th" scope="row">
                          {row.tableId === -1 ? 'To-Go' : ''}
                        </TableCell>
                        <TableCell>{menuItem}</TableCell>
                        <TableCell align="right">{row.ticketId}</TableCell>
                        <TableCell align="right">{row.orderStatus}</TableCell>
                        <TableCell align="right">
                          <Button variant="contained" 
                          onClick={async () => 
                            {
                              const bool = confirm('Are you sure you want to update this order?');
                              if (bool && row.orderStatus == "In Progress") {
                                console.log(row.orderId);
                                const ticketOrder = await manager.getOrdersByTicket(row.ticketId);
                                console.log(ticketOrder);
                                console.log(ticketOrder[0]);
                                ticketOrder[0].setOrderStatus("Ready");
                                updateDB.updateOrderStatus(ticketOrder[0]);
                              }
                              else if (bool && row.orderStatus == "Ready") 
                                {
                                  //row.setOrderStatus("Completed");
                                  updateDB.updateOrderStatus(menuItem);
                                  alert('Order status updated to Completed');
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

  function BasicTable() {


    const [rows, setRows]: any[] = React.useState([]);
    const [kitchenBool, setKitchenBool] = React.useState(false);
    React.useEffect(() => {
      setKitchenBool(true);
      OrdersQueries.getKitchenOrders().then(orderData => setRows(orderData));
    }, [kitchenBool]
  )

  
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
            {rows.map((row: any) => (
              <Row key={row.orderId} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

function Kitchen() {
  return (
    <>
      <BasicTable /> {/* Added BasicTable component */}
    </>
  )
}

export default Kitchen;