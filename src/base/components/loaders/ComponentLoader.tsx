import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function ComponentLoader() {
  return (
    <Box sx={{ display: 'flex',my:4,alignItems:'center',justifyContent:'center' }}>
      <CircularProgress />
    </Box>
  );
}