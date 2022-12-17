import { useAuth0 } from '@auth0/auth0-react';
import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Chip, Divider, List, ListItem, ListItemAvatar, ListItemText, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { SkillType } from '../../types';
import { designationMap } from '../../utils/common_data';
import ComponentLoader from '../loaders/ComponentLoader';

const baseApiURL = "http://localhost:4000/api/v1";

export default function UserList() {
    const { user } = useAuth0();
    const [users, setUsers] = useState<any>();
    const [expanded,setExpanded] = useState<String|false>();
    const [isLoading, setIsLoading] = useState(false);
    const handleExpandedChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const fetchUsers = () => {
        setIsLoading(true);
        axios.get(`${baseApiURL}/users/metadata`)
            .then((res) => {
                setUsers(res.data?.data);
            })
        setIsLoading(false);
    }
    useEffect(() => {
        fetchUsers();
    }, [users]);
    return (
        <div>
            <Box sx={{ my: 1 }} display="flex">
                {!isLoading && users && user && <List>
                    {users.map((listUser: any, index: any) => {
                        if (listUser.user_email === user?.email) return;
                        return (
                            <Accordion key={listUser?.user_email} expanded={expanded === `p-${index + 1}`} onChange={handleExpandedChange(`p-${index + 1}`)}>
                                <AccordionSummary expandIcon={<ExpandMoreRounded />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header">
                                    <Box display="flex" alignItems="start" justifyContent="space-evenly">
                                        <Avatar src={listUser.user_email} />
                                        <Box>
                                            <Typography sx={{ mx: 2 }} fontSize={15}>{listUser?.username || listUser?.user_email}</Typography>
                                            <Typography sx={{ mx: 2 }} color="GrayText" fontSize={12}>{listUser?.user_email}</Typography>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Divider sx={{ mb: 2 }} />
                                    <Box sx={{ mx: 1 }} display="flex" alignItems="center" justifyContent="start">
                                        <Typography fontSize={13}>{listUser.fullName}</Typography>
                                        <Chip sx={{ mx: 1 }} label={designationMap.get(listUser.designation) || 'Unassigned'} />
                                    </Box>
                                    {listUser.address && <Box sx={{ my: 2, mx: 1 }}>
                                        <Typography sx={{mb:2}} fontSize={18} color="primary">Skills</Typography>
                                        <Box display="flex" alignItems="center" flexWrap="wrap">
                                            {listUser && listUser.skills && listUser.skills.map((skill: SkillType) => {
                                                return (
                                                    <Box sx={{mx:2,my:1}}>
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
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </List>}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {(isLoading || !users) && <ComponentLoader />}
                </Box>
            </Box>
        </div>
    )
}
