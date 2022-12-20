import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UserDetails from '../../components/cards/UserDetails'
import { Project, User, UserDetailType } from '../../types'
import AdminPanel from '../../components/panels/AdminPanel'
import toast, { Toaster } from 'react-hot-toast'
import CommonPanel from '../../components/panels/CommonPanel'
import axios from 'axios'


type AdminPagePropsType = {
  user: User;
  token: string;
  userMetadata: any;
  userDetails?: UserDetailType;
  isAdmin: boolean;
  picture?:string;
}

export default function AdminPage(props: AdminPagePropsType) {
  const { user, token, userMetadata,userDetails,picture } = props;
  const [projects,setProjects] = useState<Project[]>([]);
  const fetchProjects = () => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects`)
    .then((res) => {
      setProjects(res.data?.data);
      console.log(res.data?.data);
    })
    .catch(err => {
      console.log(err);
      toast.error(err.message);
    })
  }
  useEffect(() => {
    fetchProjects();
  },[user,token]);
  return (
    <React.Fragment>
      <Toaster />
      <Container sx={{ my: 10, display: 'flex', alignItems: 'start' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Box sx={{ my: 2, display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
            <UserDetails 
            isAdmin={true} 
            nickname={userDetails?.username || user?.nickname} 
            username={userDetails?.username} 
            name={userDetails?.fullName || user?.given_name} 
            email={user?.email} 
            designation={userDetails?.designation}
            picture={picture || user?.picture} 
            verified={user?.email_verified} />
          </Box>
          <Box sx={{ my: 2, display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
            <CommonPanel 
            isAdmin={true} 
            token={token} 
            skills={userMetadata?.skills || []} 
            projects={projects}/>
          </Box>
        </Container>
        <AdminPanel token={token} />
      </Container>
    </React.Fragment>
  )
}
