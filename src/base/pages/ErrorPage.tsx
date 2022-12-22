import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

type ErrorPagePropType = {
    errorCode:Number;
    errorMessage:string;
}

export default function ErrorPage(props:ErrorPagePropType) {
    const {errorCode,errorMessage} = props;
  return (
    <Box minHeight="90vh" display="flex" alignItems="center" flexDirection="column" justifyContent="center">
        <Typography variant="h4">{errorCode.toString()}</Typography>
        <Typography fontSize={16}>{errorMessage}</Typography>
    </Box>
  )
}
