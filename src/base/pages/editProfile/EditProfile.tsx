import { useAuth0 } from '@auth0/auth0-react'
import { ThemeProvider } from '@emotion/react';
import { TaskAltRounded } from '@mui/icons-material';
import Edit from '@mui/icons-material/Edit';
import { Avatar, Box, Button, Chip, createTheme, CssBaseline, Divider, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { UserAddress } from '../../types';

const theme = createTheme();

const baseApiURL = "http://localhost:4000/api/v1";

const desigations = [
    {
        id: 1,
        name: 'SDE-1',
        value: 'software_engineer_1'
    },
    {
        id: 2,
        name: 'SDE-2',
        value: 'software_engineer_2'
    },
    {
        id: 3,
        name: 'SDE-3',
        value: 'software_engineer_3'
    },
    {
        id: 4,
        name: 'Project Manager',
        value: 'project_manager'
    },
    {
        id: 5,
        name: 'Program Manager',
        value: 'program_manager'
    },
    {
        id: 6,
        name: 'Engineering Lead',
        value: 'engineering_lead'
    },
    {
        id: 7,
        name: 'UI/UX Designer',
        value: 'ui_ux_designer'
    },
    {
        id: 8,
        name: 'Product Head',
        value: 'product_head'
    },
    {
        id: 9,
        name: 'Design Engineer',
        value: 'design_engineer'
    },
    {
        id: 10,
        name: 'Data Analyst',
        value: 'data_analyst'
    },
    {
        id: 11,
        name: 'Business Analyst',
        value: 'business_analyst'
    },
    {
        id: 12,
        name: 'Associate Software Engineer',
        value: 'associate_software_engineer'
    },
    {
        id: 13,
        name: 'Senior Software Engineer',
        value: 'senior_software_engineer'
    }
]

const designationMap = new Map();
designationMap.set('software_engineer_1','SDE-1');
designationMap.set('software_engineer_2','SDE-2');
designationMap.set('software_engineer_3','SDE-3');
designationMap.set('project_manager','Project Manager');
designationMap.set('program_manager','Program Manager');
designationMap.set('engineering_lead','Engineering Lead');
designationMap.set('ui_ux_designer','UI/UX Designer');
designationMap.set('product_head','Product Manager');
designationMap.set('design_engineer','Design Engineer');
designationMap.set('data_analyst','Data Analyst');
designationMap.set('business_analyst','Business Analyst');
designationMap.set('associate_software_engineer','ASE');
designationMap.set('senior_software_engineer','SSE');

export default function EditProfile() {
    const { user } = useAuth0();
    const [formDesignation, setFormDesignation] = useState<any>('');
    const [formStreet, setFormStreet] = useState<any>('');
    const [formLine1, setFormLine1] = useState<any>('');
    const [formLine2, setFormLine2] = useState<any>('');
    const [formCity, setFormCity] = useState<any>('');
    const [formState, setFormState] = useState<any>('');
    const [formPincode, setFormPincode] = useState('');
    const [formFullName, setFormFullName] = useState<any>('');
    const [formUsername, setFormUsername] = useState<any>('');

    const handleSubmitBasicDetails = () => {
        if (user && formDesignation && formFullName && formUsername) {
            axios.patch(`${baseApiURL}/users/metadata/basic/${user?.email}`, {
                username: formUsername,
                fullName: formFullName,
                designation: formDesignation
            })
                .then((res) => {
                    toast.success(res.data?.message);
                    console.log(res.data?.data);
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                })
        }
    }
    const handleSubmitAddress = () => {
        if(user && formStreet && formLine1 && formCity && formState && formPincode){
            axios.patch(`${baseApiURL}/users/metadata/address/${user?.email}`,{
                address:{
                    street:formState,
                    line1:formLine1,
                    line2:formLine2,
                    city:formCity,
                    state:formState,
                    pincode:formPincode
                }
            })
            .then((res) => {
                console.log(res.data?.data);
                toast.success(res.data?.message);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            })
        }
    }
    const fetchUserMetadata = () => {
        axios.get(`${baseApiURL}/users/metadata/${user?.email}`)
            .then((res) => {
                console.log(res.data?.data);
                setFormUsername(res.data?.data?.username);
                setFormFullName(res.data?.data?.fullName);
                setFormDesignation(res.data?.data?.designation);
                setFormStreet(res.data?.data?.address?.street);
                setFormLine1(res.data?.data?.address?.line1);
                setFormLine2(res.data?.data?.address?.line2);
                setFormCity(res.data?.data?.address?.city);
                setFormState(res.data?.data?.address?.state);
                setFormPincode(res.data?.data?.address?.pincode);
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        fetchUserMetadata();
    }, [])
    return (
        <div>
            <Container sx={{ mt: 4, minHeight: '70vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                <ThemeProvider theme={theme}>
                    <Toaster />
                    <Container component="main" maxWidth="lg" sx={{boxShadow:'0px 0px 3px gray',color:'#000',mt:6,display:'flex',alignItems:'start',justifyContent:'space-between'}}>
                        <Box display="flex" alignItems="center" sx={{p:2}}>
                            <Avatar src = {user?.picture} sx={{height:'100px',width:'auto'}}/>
                            <Box display="flex" flexDirection="column" alignItems="start" sx={{mx:2}}>
                                <Typography fontSize={25}>{formFullName || user?.given_name}</Typography>
                                <Typography fontSize={20} sx={{color:'#1976d2'}}>{formUsername || user?.nickname}</Typography>
                                <Typography fontSize={14} color="GrayText">{user?.email}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{p:2}}>
                            <Chip sx={{fontSize:15}} label={designationMap.get(formDesignation) || 'Unassigned'}/>
                        </Box>
                    </Container>
                    <Container component="main" maxWidth="lg" sx={{ display: 'flex', alignItems: 'start',width:'100%',justifyContent:'space-evenly' }}>
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "start"
                            }}
                        >
                            <Typography fontSize={18} sx={{ my: 2, display: 'flex', alignItems: 'center', lineHeight: '1rem', color: '#1976d2' }}>
                                Edit you account details
                                <TaskAltRounded sx={{ color: 'green' }} />
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                sx={{ mt: 1, width: '100%' }}
                            >
                                <Box display="flex" alignItems="center" justifyContent="center">
                                    <TextField
                                        sx={{ mr: 1 }}
                                        fullWidth
                                        value={formUsername}
                                        label="Username"
                                        onChange={e => setFormUsername(e.target.value)}
                                        autoFocus
                                        required
                                    />
                                    <TextField
                                        sx={{ ml: 1 }}
                                        fullWidth
                                        value={formFullName}
                                        label="Full Name"
                                        disabled={formFullName ? true : false}
                                        onChange={e => setFormFullName(e.target.value)}
                                        autoFocus
                                        required
                                    />
                                </Box>
                                <Box sx={{ my: 1 }} display="flex" flexDirection="column" alignItems="center">
                                    <Box sx={{ my: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}>
                                        <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                            <Typography fontSize={18} sx={{ my: 2 }} color="#1976d2">
                                                Designation
                                            </Typography>
                                            <Select
                                                fullWidth
                                                value={formDesignation}
                                                onChange={e => setFormDesignation(e.target.value)}
                                                required
                                            >
                                                {desigations.map((designation, index) => {
                                                    return (
                                                        <MenuItem value={designation.value} key={index}>
                                                            {designation.name}
                                                        </MenuItem>
                                                    )
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Box>
                                <Divider sx={{ mb: 2 }} />
                                <Box sx={{ my: 2 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleSubmitBasicDetails}
                                    >
                                        Save Changes
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ mx: 4,my:1 }} display="flex" flexDirection="column" alignItems="center" justifyContent="center" flex="0.7">
                            <Typography fontSize={18} sx={{ my:1,color: '#1976d2' }}>Update your Address</Typography>
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth
                                value={formStreet}
                                label="House Number/Street"
                                onChange={e => setFormStreet(e.target.value)}
                                autoFocus
                                required
                            />
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth
                                value={formLine1}
                                label="Address Line 1"
                                onChange={e => setFormLine1(e.target.value)}
                                autoFocus
                                required
                            />
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth
                                value={formLine2}
                                label="Address Line 2"
                                onChange={e => setFormLine2(e.target.value)}
                                autoFocus
                                required
                            />
                            <TextField
                               sx={{my:1}}
                               fullWidth
                               label="City"
                               value={formCity}
                               onChange={e => setFormCity(e.target.value)}
                               autoFocus
                               required
                            />
                            <TextField
                               sx={{my:1}}
                               fullWidth
                               label="State"
                               value={formState}
                               onChange={e => setFormState(e.target.value)}
                               autoFocus
                               required
                            />
                            <TextField
                               sx={{my:1}}
                               fullWidth
                               label="Pincode"
                               value={formPincode}
                               onChange={e => setFormPincode(e.target.value)}
                               autoFocus
                               required
                            />
                            <Box sx={{ my: 2,width:'100%'}}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2 }}
                                        onClick={handleSubmitAddress}
                                    >
                                        Save Address
                                    </Button>
                                </Box>
                        </Box>
                    </Container>
                </ThemeProvider>
            </Container>
        </div>
    )
}
