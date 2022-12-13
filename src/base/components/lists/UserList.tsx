import { useAuth0 } from '@auth0/auth0-react';
import { Avatar, Chip, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import ComponentLoader from '../loaders/ComponentLoader';

const baseApiURL = "http://localhost:4000/api/v1";

export default function UserList() {
    const {user} = useAuth0();
    const [users,setUsers] = useState<any>();
    const [isLoading,setIsLoading] = useState(false);
    const fetchUsers = () => {
        setIsLoading(true);
        axios.get(`${baseApiURL}/users`)
        .then((res) => {
            setUsers(res.data?.data);
        })
        .catch(err => {
            console.log(err);
            toast.error(err.message);
        })
        setIsLoading(false);
    }
    useEffect(() => {
        fetchUsers();
    },[users]);
  return (
    <div>
        <Box sx={{my:1}} display="flex">
            {!isLoading && users && user && <List>
                {users.map((listUser:any,index:any) => {
                    return(
                        <ListItem key={listUser._id} sx={{my:1,display:'flex',alignItems:'center',justifyContent:'center',border:'0.2px solid #000',borderRadius:'4px'}}>
                            <Avatar sx={{color:'#1976d2',border:'1px solid #1976d2',background:'#efefef'}} src={user.email}/>
                            <ListItemText sx={{mx:2}}>{listUser.email}</ListItemText>
                            {user.email === listUser.email && <Chip label="Me" sx={{background:'#1976d2',color:'#fff'}}/>}
                        </ListItem>
                    )
                })}
            </List>}
            <Box sx={{display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
                {(isLoading || !users) && <ComponentLoader/>}
            </Box>
        </Box>
    </div>
  )
}
