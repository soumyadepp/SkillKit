import React, { useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../../types';
import { Box, Container } from '@mui/system';
import UserDetails from '../../components/cards/UserDetails';
import UserPanel from '../../components/panels/UserPanel';
import UserForm from '../../components/forms/UserForm';

export default function Homepage() {
    const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState<any>(null);
    const [token,setToken] = useState<string>("");
    useEffect(() => {
        const getUserMetadata = async () => {
          const domain = "dev-aq0ru8q8.us.auth0.com";
      
          try {
            const accessToken = await getAccessTokenSilently({
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            });

            setToken(accessToken);
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;
      
            const metadataResponse = await fetch(userDetailsByIdUrl, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
      
            const { user_metadata } = await metadataResponse.json();
      
            setUserMetadata(user_metadata);
            localStorage.setItem('user_data',JSON.stringify(user_metadata));
          } catch (e:any) {
            console.log(e.message);
          }
        };
        getUserMetadata();
      }, [getAccessTokenSilently, user?.sub]);
    if (!user || !isAuthenticated) return <>None</>
    return (
        <div>
            <Container sx={{ display: 'flex', alignItems: 'start', justifyContent: 'space-evenly' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ my: 2 }}>
                        <UserDetails nickname={user?.nickname} username={user?.name} name={user?.family_name} email={user?.email} picture={user?.picture} verified={user?.email_verified} />
                    </Box>
                    <Box sx={{ my: 2 }}>
                        <UserPanel skills={userMetadata?.skills} />
                    </Box>
                </Container>
                <Container sx={{ my: 2 }}>
                    <UserForm/>
                </Container>
            </Container>
        </div>
    )
}
