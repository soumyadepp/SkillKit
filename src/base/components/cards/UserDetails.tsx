import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PendingActionsRounded, VerifiedRounded } from '@mui/icons-material';
import { Container } from '@mui/system';

type UserDetailProps = {
    nickname: string | undefined;
    username: string | undefined;
    email: string | undefined;
    name: string | undefined;
    picture?: string | undefined;
    verified: boolean | undefined;
};

export default function UserDetails(props: UserDetailProps) {
    const username = props.username || props.name;
    const email = props.email || 'Email not configured';
    const name = props.name || props.username
    const picture = props.picture || undefined;
    const verified = props.verified || false;
    const UserCard = (
        <React.Fragment>
            <CardContent>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img src={picture} height="100px" width="auto" style={{ marginInlineEnd: '10px', borderRadius: '8px' }} />
                        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <Typography sx={{ fontSize: 10 }} color="InactiveCaptionText" gutterBottom>
                                {email}
                            </Typography>
                            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                <Typography sx={{ mb: 1, mx: -3, marginInlineEnd: 1 }} fontSize={20}>
                                    {name}
                                </Typography>
                                <Typography variant="body2">
                                    {verified && <VerifiedRounded style={{ color: 'green' }} />}
                                    {!verified && <PendingActionsRounded sx={{ color: '#eed202' }} />}
                                </Typography>
                            </Container>
                            <Typography sx={{ mb: 1, mx: 0 }} color="GrayText" fontSize={12}>
                                {username}
                            </Typography>
                        </Container>
                    </Box>
                </Container>

            </CardContent>
        </React.Fragment>
    );
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">{UserCard}</Card>
        </Box>
    );
}
