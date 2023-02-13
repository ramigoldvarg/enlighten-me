import { Box, Button, Tab, Tabs } from "@mui/material";
import React from "react";

function NavBar() {
  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        // value={value}
        // onChange={handleChange}
        aria-label="basic tabs example"
      >
        {/* <Tab label="Home" value="/" LinkComponent={}/> */}
      </Tabs>
    </Box>
  );
}

export default NavBar;
