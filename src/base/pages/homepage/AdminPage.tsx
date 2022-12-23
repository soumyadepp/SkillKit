import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import UserDetails from '../../components/cards/UserDetails'
import { Data, Project, User, UserDetailType } from '../../types'
import AdminPanel from '../../components/panels/AdminPanel'
import { Toaster } from 'react-hot-toast'
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import CommonPanel from '../../components/panels/CommonPanel'
import useFetch from '../../api/hooks/apiHooks'


type AdminPagePropsType = {
  user: User;
  token: string;
  userMetadata: any;
  userDetails?: UserDetailType;
  isAdmin: boolean;
  updateMetaData : Function
  picture?:string;
}

export default function AdminPage(props: AdminPagePropsType) {
  const { user, token, userMetadata,userDetails,picture } = props;
  const [projects,setProjects] = useState<Project[]>();
  const {data:APIData,loading:APILoading,error:APIError} = useFetch({url:`${process.env.REACT_APP_BACKEND_URL}/projects`,method:'GET'});
  const [data,setData] = useState<Data | null>();
  const [error,setError] = useState<Error | null>();
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    setData(APIData);
    setLoading(APILoading);
    setError(APIError);
    if(APIData) setProjects(APIData?.data);
  },[APIData,APILoading,APIError,user,token]);

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
            updateMetaData = {props.updateMetaData}
            isAdmin={true} 
            token={token} 
            skills={userDetails?.skills || []} 
            projects={projects}/>
          </Box>
        </Container>
        <AdminPanel token={token} />
      </Container>
    </React.Fragment>
  )
}
