import { Drawer, Toolbar, IconButton, Divider, List } from "@mui/material";
import { mainListItems } from "./Header";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import React from "react";

const Navigation = (): JSX.Element => {
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

    return <>
     <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {mainListItems}
            {/* <Divider sx={{ my: 1 }} />
            {secondaryListItems} */}
          </List>
        </Drawer>
    </>;
  };
  
export default Navigation;