import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

type FullScreenLoaderPropType = {
  text?: string;
}

export default function CircularStatic(props:FullScreenLoaderPropType) {
  const {text} = props;
 return(
  <React.Fragment>
    <Box sx={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <CircularProgress/>
      <Typography fontSize={13} sx={{my:2,color:'#197962'}}>
        {text}
      </Typography>
    </Box>
  </React.Fragment>
 );
}
