import { User } from '@auth0/auth0-react'
import { Box, Container } from '@mui/system'
import { Toaster } from 'react-hot-toast'
import UserDetails from '../../components/cards/UserDetails'
import CommonPanel from '../../components/panels/CommonPanel'

type UserPagePropType = {
    user: User;
    token: string;
    userMetadata:any;
    isAdmin: boolean;
}

export default function Userpage(props:UserPagePropType) {
    const {user,token,userMetadata} = props;
    console.log(user);
    return (
        <div>
            <Toaster />
            <Container sx={{ my:10,display: 'flex', alignItems: 'start', justifyContent: 'space-evenly' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <UserDetails nickname={user?.nickname} username={user?.name} name={user?.family_name} email={user?.email} picture={user?.picture} verified={user?.email_verified} />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <CommonPanel token={token} skills={userMetadata?.skills || []} />
                    </Box>
                </Container>
            </Container>
        </div>
    )
}
