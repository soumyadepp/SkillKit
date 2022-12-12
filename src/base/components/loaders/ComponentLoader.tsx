import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

export default function ComponentLoader() {
  return (
    <Box sx={{ display: 'flex',my:4,flexDirection:'column',alignItems:'center',justifyContent:'center' }}>
      <CircularProgress />
      <Typography sx={{my:2,color:'#1979d2'}}>
        Loading...
      </Typography>
    </Box>
  );
}