import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { AdminPanelSettingsRounded, PendingActionsRounded, VerifiedRounded } from '@mui/icons-material';
import { Container } from '@mui/system';
import { Avatar, Tooltip } from '@mui/material';
import { useSpring, animated } from 'react-spring';

type UserDetailProps = {
    nickname?: string;
    username?: string;
    email?: string;
    name?: string;
    picture?: string;
    verified?: boolean;
    isAdmin?: boolean;
};

export default function UserDetails(props: UserDetailProps) {
    const username = props.username || props.name;
    const email = props.email || 'Email not configured';
    const name = props.name || props.username
    const picture = props.picture;
    const verified = props.verified || false;
    const isAdmin = props.isAdmin || false;
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    interface FadeProps {
        children?: React.ReactElement;
        in: boolean;
        onEnter?: () => {};
        onExited?: () => {};
    }

    const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
        const { in: open, children, onEnter, onExited, ...other } = props;
        const style = useSpring({
            from: { opacity: 0 },
            to: { opacity: open ? 1 : 0 },
            onStart: () => {
                if (open && onEnter) {
                    onEnter();
                }
            },
            onRest: () => {
                if (!open && onExited) {
                    onExited();
                }
            },
        });

        return (
            <animated.div ref={ref} style={style} {...other}>
                {children}
            </animated.div>
        );
    });

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '0.5px solid #000d1a',
        boxShadow: 24,
        p: 4,
    };

    const UserCard = (
        <React.Fragment>
            <CardContent>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar alt="Remy Sharp" src={picture} />
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
                                    {isAdmin &&<Tooltip title="Admin">
                                         <AdminPanelSettingsRounded sx={{ color: '#1976d2' }} /></Tooltip>}
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
