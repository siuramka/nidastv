import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';

export default function TopAppBar() {

 
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
            <Box
            sx={{
                width: 500,
                maxWidth: '100%',
            }}
            >
            <TextField fullWidth label="Search..." />
            </Box>
        </Toolbar>
      </AppBar>

    </Box>
  );
}