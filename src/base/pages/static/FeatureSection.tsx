import { Box, Typography } from '@mui/material'
import React from 'react'

type FeatureSectionPropType = {
    title:string;
    text:string;
    image:string | undefined;
    height?:string;
    width?:string;
    reverse?:boolean;
}

export default function FeatureSection(props:FeatureSectionPropType) {
    const {title,text,image,height,width,reverse} = props;
    return (
        <Box my={1} display="flex" flexDirection={reverse?'row-reverse':'row'} alignItems="start" justifyContent="space-between">
            <img style={{boxShadow:'0px 0px 8px #ddd'}}  src={image} alt={title} height={height} width={width}/>
            <Box mx={4} p={2}>
                <Typography variant="h3" color="#1976d2">{title}</Typography>
                <Typography sx={{ mt: 2 }} fontSize={18}>
                    {text}
                </Typography>
            </Box>
        </Box>
    )
}
