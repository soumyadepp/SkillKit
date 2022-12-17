import { Box, Container } from '@mui/system'
import React from 'react'
import UserDetails from '../../components/cards/UserDetails'
import { SkillType, User, UserAddress, UserDetailType } from '../../types'
import AdminPanel from '../../components/panels/AdminPanel'
import { Toaster } from 'react-hot-toast'
import CommonPanel from '../../components/panels/CommonPanel'


type AdminPagePropsType = {
  user: User;
  token: string;
  userMetadata: any;
  userDetails?: UserDetailType;
  isAdmin: boolean;
}



export default function AdminPage(props: AdminPagePropsType) {
  const { user, token, userMetadata,userDetails } = props;
  return (
    <React.Fragment>
      <Toaster />
      <Container sx={{ my: 10, display: 'flex', alignItems: 'start' }}>
        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
          <Box sx={{ my: 2, display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
            <UserDetails isAdmin={true} nickname={userDetails?.username || user?.nickname} username={userDetails?.username} name={userDetails?.fullName || user?.given_name} email={user?.email} picture={user?.picture} verified={user?.email_verified} />
          </Box>
          <Box sx={{ my: 2, display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
            <CommonPanel token={token} skills={userMetadata?.skills || []} />
          </Box>
        </Container>
        <AdminPanel token={token} />
      </Container>
    </React.Fragment>
  )
}
