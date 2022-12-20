import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AdminPanelSettingsRounded, PendingActionsRounded, VerifiedRounded } from '@mui/icons-material';
import { Container } from '@mui/system';
import { Avatar, Button, Chip, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { designationMap } from '../../utils/common_data';

type UserDetailProps = {
    nickname?: string;
    username?: string;
    email?: string;
    name?: string;
    picture?: string;
    verified?: boolean;
    isAdmin?: boolean;
    designation?:string;
};

export default function UserDetails(props: UserDetailProps) {
    const username = props.username || props.name;
    const email = props.email || 'Email not configured';
    const name = props.name || props.username
    const picture = props.picture;
    const verified = props.verified || false;
    const isAdmin = props.isAdmin || false;
    const {designation} = props;

    const UserCard = (
        <React.Fragment>
            <CardContent>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{height:'5rem',width:'5rem'}} alt="Remy Sharp" src={picture} />
                        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                            <Typography sx={{ fontSize: 10 }} color="InactiveCaptionText" gutterBottom>
                                {email}
                            </Typography>
                            <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                <Typography sx={{ mb: 1, mx: -3, marginInlineEnd: 1 }} fontSize={20}>
                                    {name}
                                </Typography>
                                <Typography variant="body2">
                                    {verified && <Tooltip title="Email Verified">
                                        <VerifiedRounded style={{ color: 'green' }} />
                                    </Tooltip>}
                                    {!verified && <Tooltip title="Email Verification Pending">
                                        <PendingActionsRounded sx={{ color: '#eed202' }} />
                                    </Tooltip>}
                                    {isAdmin && <Tooltip title="Admin">
                                        <AdminPanelSettingsRounded sx={{ color: '#1976d2' }} /></Tooltip>}
                                </Typography>
                            </Container>
                            <Chip sx={{mb:1}} label={designationMap.get(designation)}/>
                            <Link style={{textDecoration:'none'}} to="/edit">
                            <Button variant="contained">Edit Profile</Button>
                            </Link>
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
