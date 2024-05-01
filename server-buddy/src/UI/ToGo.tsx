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


function onClickCheckout(row: ReturnType<typeof createData>) {

}

function onClickAddItem(row: ReturnType<typeof createData>) {

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



function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function createData(
  Name: String,
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
  const { row } = props;
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

  let startMenu: DocumentData[] = [];

  entireMenu.forEach(item => {
    if (item.type == "App") {
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
      if (item.name == value) {
        itemPrice = item.price;
      }
    });

    setPrice(itemPrice * Quantity);
  };

  const theme = useTheme();

  const [isPushing, setIsPushing] = React.useState(false);
  React.useEffect(() => {
    if (isPushing) {
      let ItemId = 0;
      let newItemTable = [];
      itemTable.forEach((element: any) => {
        ItemId++;
        newItemTable.push(element);
      });
      newItemTable.push({ itemId: ItemId + 1, item: Item, type: Type, quantity: Quantity, status: Status, price: Price });

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
          {row.TicketId}
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
                <Button variant="contained" onClick={async () => {
                  await manager.updateTicketStatusToPaid(row.TicketId)

                }}>Checkout</Button>
                <Button variant="contained" onClick={() => setOpenItemTable(true)}>Add item</Button>
              </Stack>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>

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
                {itemTable.map((item: { itemId: number, item: String, type: String, quantity: number, status: String, price: number }) => (
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
                          if (element.itemId != item.itemId) {
                            element.itemId -= offset;
                            table.push(element);
                          }
                          else {
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
          <Button onClick={() => { setOpenItemTable(false); setItemTable((itemTable: any) => []); }}>Back</Button>
          <Button type="submit" onClick={() => {

            let itemArray: string[] = [];
            console.log(itemTable);
            itemTable.forEach((item: any) => {
              for (let i = 0; i < item.quantity; i++) {
                itemArray.push(item.item);
              }
            });

            manager.addOrder(row.TicketId, "", -1, "", "In progress", itemArray);

            handleCloseItemTable();

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
          <Stack spacing={1}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleToggleChange}
              aria-label="Platform"
            >
              <ToggleButton value="App" onClick={() => {
                setType("App");
                let appMenu: DocumentData[] = []
                entireMenu.forEach(item => {
                  if (item.itemCategory == "App") {
                    appMenu.push(item);
                  }
                });
                setMenu(appMenu);
              }}>
                Appetizer
              </ToggleButton>
              <ToggleButton value="Entree" onClick={() => {
                setType("Entree");
                let entreeMenu: DocumentData[] = []
                entireMenu.forEach(item => {
                  if (item.itemCategory == "Entree") {
                    entreeMenu.push(item);
                  }
                });
                setMenu(entreeMenu);
              }}>
                Entree
              </ToggleButton>
              <ToggleButton value="Dessert" onClick={() => {
                setType("Dessert");
                let dessMenu: DocumentData[] = []
                entireMenu.forEach(item => {
                  if (item.itemCategory == "Dessert") {
                    dessMenu.push(item);
                  }
                });
                setMenu(dessMenu);
              }}>
                Dessert
              </ToggleButton>
              <ToggleButton value="Bev" onClick={() => {
                setType("Bev");
                let bevMenu: DocumentData[] = []
                entireMenu.forEach(item => {
                  if (item.itemCategory == "Bev") {
                    bevMenu.push(item);
                  }
                });
                setMenu(bevMenu);
              }}>
                Beverage
              </ToggleButton>
            </ToggleButtonGroup>

            <Select
              labelId="item-select"
              id="item-select"
              value={itemName}
              onChange={handleSelectChange}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {menu.map((item) => (
                <MenuItem
                  key={item.itemName}
                  value={item.itemName}
                  style={getStyles(item.itemName, itemName, theme)}
                >
                  {item.itemName}
                </MenuItem>
              ))}
            </Select>

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
              onChange={(event) => {
                setQuantity(Number(event.target.value));
                let itemPrice = 0;
                menu.forEach(item => {
                  if (item.itemName == itemName[0]) {
                    itemPrice = item.itemPrice;
                  }
                });

                setPrice(itemPrice * Number(event.target.value));
              }}
            />
            <TextField
              autoFocus
              disabled
              margin="dense"
              id="price"
              name="price"
              label="price"
              type="number"
              fullWidth
              variant="standard"
              value={Price}
              onChange={(event) => { setPrice(Number(event.target.value)) }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseGetItem}>Cancel</Button>
          <Button type="submit" onClick={() => {
            setIsPushing(true);
          }}
          >
            Enter
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function CollapsibleTable() {


  const [rows, setRows]: any[] = React.useState([]);
  const [updateRows, setUpdateRows] = React.useState(true);
  React.useEffect(() => {
    if (updateRows) {
      manager.getAllTicketData().then(ticketData => setRows(ticketData));
      setUpdateRows(false);
    }
  }, [updateRows]);

  let startMenu: DocumentData[] = [];

  const [menu, setMenu] = React.useState(startMenu);
  const [updateMenu, setUpdateMenu] = React.useState(true);
  React.useEffect(() => {
    if (updateMenu) {
      MenuAndItemsQueries.getAllMenus().then(data => {
        entireMenu = data;
        setUpdateMenu(false);

        let startMenu: DocumentData[] = [];


        entireMenu.forEach(item => {
          if (item.itemName == "App") {
            startMenu.push(item);
          }
        });
        console.log(entireMenu);
        setMenu(startMenu);
      })
    }

  }, [updateMenu]);

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
      if (item.itemName == value) {
        itemPrice = item.itemPrice;
      }
    });

    setPrice(itemPrice * Quantity);
  };

  React.useEffect(() => {
    if (isPushing) {
      let ItemId = 0;
      let newItemTable = [];
      itemTable.forEach((element: any) => {
        ItemId++;
        newItemTable.push(element);
      });
      newItemTable.push({ itemId: ItemId + 1, item: Item, type: Type, quantity: Quantity, status: Status, price: Price });

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
          {rows.map((row: any) => (
            <Row key={row.TicketId} row={row} />
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
              onChange={(event) => { setName(event.target.value) }}
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
                  {itemTable.map((item: { itemId: number, item: String, type: String, quantity: number, status: String, price: number }) => (
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
                            if (element.itemId != item.itemId) {
                              element.itemId -= offset;
                              table.push(element);
                            }
                            else {
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
            <Button onClick={() => { setOpenItemTable(false); setItemTable((itemTable: any) => []); }}>Back</Button>
            <Button type="submit" onClick={() => {

              let itemArray: { itemName: string, price: number }[] = [];
              console.log(itemTable);
              itemTable.forEach((item: any) => {
                for (let i = 0; i < item.quantity; i++) {
                  itemArray.push({ itemName: item.item, price: item.price });
                }
              });

              manager.addTicket(name, "Open", itemArray);
              setTimeout(() => { manager.getAllTicketData().then(ticketData => setRows(ticketData)) }, 1000);

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
            <Stack spacing={1}>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleToggleChange}
                aria-label="Platform"
              >
                <ToggleButton value="App" onClick={() => {
                  setType("App");
                  let appMenu: DocumentData[] = []
                  entireMenu.forEach(item => {
                    if (item.itemCategory == "App") {
                      appMenu.push(item);
                    }
                  });
                  setMenu(appMenu);
                }}>
                  Appetizer
                </ToggleButton>
                <ToggleButton value="Entree" onClick={() => {
                  setType("Entree");
                  let entreeMenu: DocumentData[] = []
                  entireMenu.forEach(item => {
                    if (item.itemCategory == "Entree") {
                      entreeMenu.push(item);
                    }
                  });
                  setMenu(entreeMenu);
                }}>
                  Entree
                </ToggleButton>
                <ToggleButton value="Dessert" onClick={() => {
                  setType("Dessert");
                  let dessMenu: DocumentData[] = []
                  entireMenu.forEach(item => {
                    if (item.itemCategory == "Dessert") {
                      dessMenu.push(item);
                    }
                  });
                  setMenu(dessMenu);
                }}>
                  Dessert
                </ToggleButton>
                <ToggleButton value="Bev" onClick={() => {
                  setType("Bev");
                  let bevMenu: DocumentData[] = []
                  entireMenu.forEach(item => {
                    if (item.itemCategory == "Bev") {
                      bevMenu.push(item);
                    }
                  });
                  setMenu(bevMenu);
                }}>
                  Beverage
                </ToggleButton>
              </ToggleButtonGroup>

              <Select
                labelId="item-select"
                id="item-select"
                value={itemName}
                onChange={handleSelectChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {menu.map((item) => (
                  <MenuItem
                    key={item.itemName}
                    value={item.itemName}
                    style={getStyles(item.itemName, itemName, theme)}
                  >
                    {item.itemName}
                  </MenuItem>
                ))}
              </Select>

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
                onChange={(event) => {
                  setQuantity(Number(event.target.value));
                  let itemPrice = 0;
                  menu.forEach(item => {
                    if (item.itemName == itemName[0]) {
                      itemPrice = item.itemPrice;
                    }
                  });

                  setPrice(itemPrice * Number(event.target.value));
                }}
              />
              <TextField
                autoFocus
                disabled
                margin="dense"
                id="price"
                name="price"
                label="price"
                type="number"
                fullWidth
                variant="standard"
                value={Price}
                onChange={(event) => { setPrice(Number(event.target.value)) }}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseGetItem}>Cancel</Button>
            <Button type="submit" onClick={() => {
              setIsPushing(true);
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