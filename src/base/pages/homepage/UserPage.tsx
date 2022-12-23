import { User } from '@auth0/auth0-react'
import { Box, Container } from '@mui/system'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import UserDetails from '../../components/cards/UserDetails'
import CommonPanel from '../../components/panels/CommonPanel'
import { Data, Project, UserDetailType } from '../../types'
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import useFetch from '../../api/hooks/apiHooks'
import UserPanel from '../../components/panels/UserPanel'
import ComponentLoader from '../../components/loaders/ComponentLoader'
import { MetaDataContext } from '../../../App'
import {useContext} from 'react';



type UserPagePropType = {
    user: User;
    token: string;
    userMetadata: any;
    userDetails?: UserDetailType;
    isAdmin: boolean;
    picture?: string;
    updateMetaData : Function
}


export default function Userpage(props: UserPagePropType) {
    const { user, token, userMetadata, userDetails, picture } = props;
    const [projects, setProjects] = useState<Project[]>([]);
    const [data, setData] = useState<Data | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    // const { data: APIData, loading: APILoading, error: APIError } = useFetch({ url: `${process.env.REACT_APP_BACKEND_URL}/users/metadata/${user?.email}`, method: 'GET' });
    // const metaData = useContext(MetaDataContext);
    useEffect(() => {
        // setData(APIData);
        // setLoading(APILoading);
        // setProjects(APIData?.data?.assignedProjects);
        // setError(APIError);
    }, [projects,user,token]);

    return (
        <div>
            <Toaster />
            <Container sx={{ my: 10, display: 'flex', alignItems: 'start', justifyContent: 'space-evenly' }}>
                <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                    <Box sx={{ my: 2, ml: 2, display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <UserDetails
                            username={userDetails?.username || user?.name}
                            name={userDetails?.fullName || user?.family_name}
                            email={user?.email} picture={picture || user?.picture}
                            designation={userDetails?.designation}
                            verified={user?.email_verified} />
                    </Box>
                    <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                        <Box sx={{ my: 2 }}>
                            <CommonPanel
                                token={token}
                                skills={userDetails?.skills || []}
                                projects={projects}
                                updateMetaData={props.updateMetaData} />
                        </Box>
                    </Container>
                </Container>
                <Box mt={2} width="100%" display="flex" alignItems="center" justifyContent="center">
                    <UserPanel projects={projects} userMetadata={userDetails} />
                </Box>
            </Container>
        </div>
    )
}
