import { User } from '@auth0/auth0-react'
import { Box, Container } from '@mui/system'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import UserDetails from '../../components/cards/UserDetails'
import CommonPanel from '../../components/panels/CommonPanel'
import { Project, UserDetailType } from '../../types'
import FullScreenLoader from '../../components/loaders/FullScreenLoader';

type UserPagePropType = {
    user: User;
    token: string;
    userMetadata: any;
    userDetails?: UserDetailType;
    isAdmin: boolean;
    picture?: string;
}


export default function Userpage(props: UserPagePropType) {
    const { user, token, userMetadata, userDetails, picture } = props;
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const fetchAssignedProjects = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users/metadata/${user?.email}`)
            .then((res) => {
                console.log(res.data);
                setProjects(res.data?.data.assignedProjects);
            })
            .catch(err => {
                toast.error(err.message);
            })
    }
    useEffect(() => {
        setIsLoading(true);
        fetchAssignedProjects();
        setIsLoading(false);
    }, [user, token])
    if (isLoading) return <FullScreenLoader />
    return (
        <div>
            <Toaster />
            <Container sx={{ my: 10, display: 'flex', alignItems: 'start', justifyContent: 'space-evenly' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ my: 2, display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <UserDetails
                            username={userDetails?.username || user?.name}
                            name={userDetails?.fullName || user?.family_name}
                            email={user?.email} picture={picture || user?.picture}
                            designation={userDetails?.designation}
                            verified={user?.email_verified} />
                    </Box>
                    <Container sx={{display: 'flex', alignItems: 'start', justifyContent: 'start' }}>
                        <Box sx={{ my: 2}}>
                            <CommonPanel
                                token={token}
                                skills={userMetadata?.skills || []}
                                projects={projects} />
                        </Box>
                    </Container>
                </Container>
            </Container>
        </div>
    )
}
