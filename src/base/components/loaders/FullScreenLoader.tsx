import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function FullScreenLoader() {
  return (
    <Box sx={{ display: 'flex',flexDirection:'column',minHeight:'100vh',alignItems:'center',justifyContent:'center'}}>
      <CircularProgress />
      <Typography sx={{my:2,color:'blue'}}>
        Please Wait a moment...
      </Typography>
    </Box>
  );
}