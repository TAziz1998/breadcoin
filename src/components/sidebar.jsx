import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HistoryIcon from '@mui/icons-material/History';
import SendToMobileIcon from '@mui/icons-material/SendToMobile';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch
  } from "react-router-dom";

export default function Management() {

    const [open, setOpen] = React.useState(true);
  
    const handleClick = () => {
      setOpen(!open);
    };
  
      return (
        <List
        style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 1)' }}
        sx={{  bgcolor: 'background.paper' }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 1)' }} to="/balance">
        <ListItemButton>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          
          <ListItemText primary="Balance" />
        </ListItemButton>
        </Link>

        <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 1)' }} to="/transaction-history">
        <ListItemButton>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItemButton>
        </Link>

        <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 1)' }} to="/breadcoin-transfer">
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <SendToMobileIcon />
          </ListItemIcon>
          <ListItemText primary="Breadcoin Transfer" />
          {/* {open ? <ExpandLess /> : <ExpandMore />} */}
        </ListItemButton>
        </Link>
        {/* <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse> */}
        
         <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 1)' }} to="/selling-points">
        <ListItemButton>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Selling Points" />
        </ListItemButton>
        </Link>
        
        <ListItemButton>
          <ListItemIcon>
            <ShoppingBasketIcon />
          </ListItemIcon>
          <ListItemText primary="Breadcoin Shop" />
        </ListItemButton>

        <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 1)' }} to="/edit-profile">
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Edit Profile" />
        </ListItemButton>
        </Link>

        <Link style={{ textDecoration: 'none', color: 'rgba(0, 0, 0, 1)' }} to="/regulations">
        <ListItemButton>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Regulations" />
        </ListItemButton>
        </Link>
      </List>
      
      );
  }