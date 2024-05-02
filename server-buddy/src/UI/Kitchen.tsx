import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { TicketManager } from './TicketManager';
import { OrdersQueries } from '../database/queries/ordersQueries';
import { Order } from '../objects/order';
import { reload } from 'firebase/auth';
import { Timestamp, serverTimestamp } from "firebase/firestore";
import { updateDB } from '../database/setters/updateDB';

const manager: TicketManager = new TicketManager();
let refresh = false;

function createData(
  ticketId: string,
  employeeId: string,
  orderStatus: string,
  tableId: number,
  restaurantId: string,
  orderDateTime: Timestamp,
  menuItems: any[]
) {
  let orderId = "";
  return {
    orderId,
    ticketId,
    employeeId,
    tableId,
    restaurantId,
    orderDateTime,
    orderStatus,
    menuItems
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [menuItem, setMenuItem]: any[] = React.useState(row.menuItems);

  const newOrder =
    new Order(
      row.orderId,
      row.ticketId,
      row.employeeId,
      row.tableId,
      row.restaurantId,
      row.orderDateTime,
      row.orderStatus,
      menuItem
    );

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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Stack spacing={2} direction={'row'} p={2}>
              {row.orderStatus == "In Progress"}
              <Button variant="contained" color="primary"
                onClick={async () => {
                  const bool = confirm('Are you sure you want to update this order?');
                  if (bool && row.orderStatus == "In Progress") {
                    console.log("Ready button clicked");
                    newOrder.setOrderStatus("Ready");
                    updateDB.updateOrderStatus(newOrder);
                  }
                  else if (bool && row.orderStatus == "Ready") {
                    console.log("Send button clicked");
                    newOrder.setOrderStatus("Sent");
                    updateDB.updateOrderStatus(newOrder);
                  }
                  else if (bool == false) {
                    alert('Order status not updated');
                  }
                }}>
                {row.orderStatus == "In Progress" ? "READY" : "SEND"}
              </Button>
            </Stack>
          </Box>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

function KitchenTable() {
  const [rows, setRows]: any[] = React.useState([]);
  const [kitchenBool, setKitchenBool] = React.useState(false);
  React.useEffect(() => {
    setKitchenBool(true);
    OrdersQueries.getAllOrders().then(orderData => setRows(orderData));
  }, [kitchenBool]
  )

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Kitchen Orders
          </Typography>
        </TableHead>
        <TableBody>
          {rows.map((row: any) =>
            row.orderStatus !== "Sent" && <Row key={row.orderId} row={row} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function Kitchen() {
  return (
    <>
      <KitchenTable />
    </>
  )
}

export default Kitchen;