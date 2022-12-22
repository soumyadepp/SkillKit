import { useAuth0 } from '@auth0/auth0-react';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Avatar, Chip, Divider, List, TextField, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react'
import useFetch from '../../api/hooks/apiHooks';
import { Data, Project, SkillType } from '../../types';
import { designationMap } from '../../utils/common_data';
import ComponentLoader from '../loaders/ComponentLoader';

const baseApiURL = process.env.REACT_APP_BACKEND_URL;


export default function UserList() {
    const { user } = useAuth0();
    const [searchUsers, setSearchUsers] = useState<any>();
    const [users, setUsers] = useState<any>();
    const [expanded, setExpanded] = useState<String | false>();
    const [searchQueryUser, setSearchQueryUser] = useState<String>();
    const flatProps = {
        options: users?.filter((mappedUser: any) => mappedUser.user_email !== user?.email)?.map((u: any) => u.username || u.user_email)
    };
    const { data: APIData, loading: APILoading, error: APIError } = useFetch({ url: `${baseApiURL}/users/metadata`, method: 'GET' });
    const [data, setData] = useState<Data | null>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>();

    const handleExpandedChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        setData(APIData);
        setUsers(data?.data);
        setLoading(APILoading);
        setError(APIError);
        setSearchUsers(data?.data);
    }, [APIData, APILoading, APIError]);

    if (loading) return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
             <ComponentLoader />
        </Box>
    )
    return (
        <div>
            <Box sx={{ my: 1 }} display="flex" flexDirection="column" alignItems="center">
                <Autocomplete
                    {...flatProps}
                    disablePortal
                    value={searchQueryUser}
                    onChange={(event: any, newValue: any) => {
                        setSearchQueryUser(newValue);
                    }}
                    id="user-search"
                    sx={{ width: '100%', mb: 2 }}
                    renderInput={(params: any) => <TextField {...params} label="Search User" />}
                />
                {searchUsers && user && <List>
                    {searchUsers.length === 0 && <Box display="flex" alignItems="center" justifyContent="center">
                        <Typography fontSize={15} color="primary">No users found.</Typography>
                    </Box>}
                    {searchUsers.filter((u: any) => searchQueryUser ? u.username ? u.username === searchQueryUser : u.user_email === searchQueryUser : {}).map((listUser: any, index: any) => {
                        if (listUser.user_email === user?.email) return;
                        return (
                            <Accordion key={listUser?.user_email} expanded={expanded === `p-${index + 1}`} onChange={handleExpandedChange(`p-${index + 1}`)} sx={{minWidth:'520px'}}>
                                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Box display="flex" alignItems="start" justifyContent="space-evenly">
                                        <Avatar src={listUser.picture || listUser.user_email} />
                                        <Box>
                                            <Typography sx={{ mx: 2 }} fontSize={17}>{listUser?.username || listUser?.user_email}</Typography>
                                            <Typography sx={{ mx: 2 }} color="GrayText" fontSize={12}>{listUser?.user_email}</Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box sx={{ mx: 1 }} display="flex" alignItems="center" justifyContent="start">
                                        <Typography fontSize={15}>{listUser.fullName}</Typography>
                                        <Chip sx={{ ml: 2 }} label={designationMap.get(listUser.designation) || 'Unassigned'} />
                                    </Box>
                                    {listUser.skills && <Box sx={{ my: 2, mx: 1 }}>
                                        <Typography sx={{ mb: 2 }} fontSize={18} color="primary">Skills</Typography>
                                        <Box display="flex" alignItems="center" flexWrap="wrap">
                                            {listUser.skills.map((skill: SkillType) => {
                                                return (
                                                    <Box key={skill.id} sx={{ mx: 2, my: 1 }}>
                                                        <Tooltip title={skill.name}>
                                                            <img src={skill.image} alt={skill.name} height="35px" width="auto" />
                                                        </Tooltip>
                                                    </Box>
                                                )
                                            })}
                                            {(!listUser || !listUser.skills || listUser.skills?.length === 0) && <Box width="100%" display="flex" alignItems="center" justifyContent="center">
                                                <Typography fontSize={15}>No Data found</Typography>
                                            </Box>}
                                        </Box>
                                    </Box>}
                                    <Divider />
                                    {listUser.assignedProjects && <Box sx={{ my: 1, mx: 1 }}>
                                        <Typography sx={{ mb: 2 }} fontSize={18} color="primary">Assigned Projects</Typography>
                                        <Box display="flex" alignItems="center" flexDirection="column">
                                            {listUser.assignedProjects.map((assignedProject: Project) => {
                                                return (
                                                    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" key={assignedProject._id} sx={{ my: 1 }}>
                                                        <Typography fontSize={15}>{assignedProject.name}</Typography>
                                                        <Chip label={assignedProject.deadline} color="error" />
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Box>}
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </List>}
            </Box>
        </div>
    )
}
