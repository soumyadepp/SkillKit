import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UserDetails from '../../components/cards/UserDetails'
import { User } from '../../types'
import AdminPanel from '../../components/panels/AdminPanel'
import axios from 'axios'

type AdminPagePropsType = {
  user: User;
  token: string;
  userMetadata: any;
  isAdmin: boolean;
}



export default function AdminPage(props: AdminPagePropsType) {
  const { user, token, userMetadata } = props;
  const fetchProjects = () => {
    axios.get('http://localhost:4000/api/v1/projects')
    .then((res) => {
      console.log(res.data.data);
    })
  }
  
  useEffect(() => {

  },[])
  return (
    <React.Fragment>
      <Container sx={{ display: 'flex', alignItems: 'start' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Box sx={{ my: 2, display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
            <UserDetails isAdmin={true} nickname={user?.nickname} username={user?.name} name={user?.family_name} email={user?.email} picture={user?.picture} verified={user?.email_verified} />
          </Box>
        </Container>
        <AdminPanel token={token}/>
      </Container>
    </React.Fragment>
  )
}
