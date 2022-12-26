import { useAuth0 } from '@auth0/auth0-react'
import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import useFetch from '../../api/hooks/apiHooks'
import UserTable from '../../components/tables/UserTable'
import { Data } from '../../types'
import FullScreenLoader from '../../components/loaders/FullScreenLoader';


export default function ProjectPage() {
    const {user} = useAuth0();
    const [data,setData] = useState<Data | null>();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState<Error | null>();
    const {data:APIData,loading:APILoading,error:APIError} = useFetch({url:`${process.env.REACT_APP_BACKEND_URL}/users/metadata/${user?.email}`,method:'GET'});
    const [rows,setRows] = useState<any>([]);
    useEffect(() => {
      setData(APIData);
      setRows(data?.data.assignedProjects);
      setLoading(APILoading);
      setError(APIError);
    },[APIData,APILoading,APIError])
  if(loading) return <FullScreenLoader text="Fetching Projects..."/>
  return (
    <React.Fragment>
        <Box display="flex" mt={10} flexDirection="column" alignItems="start" p={3}>
             <Typography sx={{mx:1}} variant="h2">Projects</Typography>
            <UserTable rows={rows}/>
        </Box>
    </React.Fragment>
  )
}
