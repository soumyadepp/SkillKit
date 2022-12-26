import { useAuth0 } from '@auth0/auth0-react';
import AddIcon from '@mui/icons-material/Add';
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Button, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { desigations } from '../../utils/common_data';
import AddressForm from '../../components/forms/AddressForm';
import ImageUpload from '../../components/forms/imageUpload/ImageUpload';

const baseApiURL = process.env.REACT_APP_BACKEND_URL;

type UserDetailsPropType = {
    updateMetadata: Function;
}

export default function UserDetailsForm(props: UserDetailsPropType) {
    const { user } = useAuth0();
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");
    const [designation, setDesignation] = useState<string>("unassigned");
    const [expanded, setExpanded] = useState<string | false>('basic-details');
    const handleExpandedChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    const handleSubmitBasicDetails = () => {
        if (!username || username.length < 6 || !fullName || fullName.length < 6) {
            toast.error('Please enter all the details');
            return;
        }
        if (username && designation && fullName) {
            axios.patch(`${baseApiURL}/users/metadata/basic/${user?.email}`, {
                username: username,
                fullName: fullName,
                designation: designation
            })
                .then((res) => {
                    console.log(res.data?.data);
                    toast.success(res.data?.message);
                    setExpanded(false);
                    localStorage.removeItem('user_metadata');
                    props.updateMetadata();
                })
                .catch(err => {
                    console.log(err);
                    if (err.response.status === 402) {
                        toast.error('Username already exists. Please select a different username');
                    }
                    else {
                        toast.error(err.message);
                    }
                })
        }
    }
    return (
        <React.Fragment>
            <Toaster />
            <Container maxWidth="sm" component="main" sx={{ my: 10 }}>
                {/* Basic Details */}
                <Accordion expanded={expanded === 'basic-details'} onChange={handleExpandedChange('basic-details')} sx={{ p: 2 }}>
                    <AccordionSummary expandIcon={<AddIcon sx={{ color: '#1976d2' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="h5">Basic Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box display="flex" flexDirection="column" alignItems="start">
                            <FormControl sx={{ my: 1, width: '100%' }}>
                                <Typography variant="h4" color="#1976d2">
                                    Choose a cool username!
                                </Typography>
                                <TextField
                                    label="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    fullWidth
                                    sx={{ my: 2 }}
                                    autoFocus
                                    required />
                            </FormControl>
                            <FormControl sx={{ my: 1, width: '100%' }}>
                                <Typography variant="h4" color="#1976d2">
                                    What is your full name?
                                </Typography>
                                <TextField
                                    label="Full Name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    fullWidth
                                    sx={{ my: 2 }}
                                    autoFocus
                                    required />
                            </FormControl>
                            <FormControl sx={{ my: 1, width: '100%' }}>
                                <Typography variant="h4" sx={{ mb: 2 }} color="#1976d2">
                                    What is your role?
                                </Typography>
                                <Typography fontSize={15} sx={{ mb: 1 }}>
                                    If you select nothing, your role will be 'unsassigned'.
                                </Typography>
                                <Select
                                    fullWidth
                                    value={designation}
                                    onChange={e => setDesignation(e.target.value)}
                                    required
                                >
                                    {desigations.map((desg, index) => {
                                        return (
                                            <MenuItem value={desg.value} key={index}>
                                                {desg.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'address-details'} onChange={handleExpandedChange('address-details')} sx={{ p: 2 }}>
                    <AccordionSummary expandIcon={<AddIcon sx={{ color: '#1976d2' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="h5">Address (optional)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AddressForm updateMetaData={props.updateMetadata} />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'picture-upload'} onChange={handleExpandedChange('picture-upload')} sx={{ p: 2 }}>
                    <AccordionSummary expandIcon={<AddIcon sx={{ color: '#1976d2' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header">
                        <Typography variant="h5">Add profile picture (optional)</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ my: 5,mx:'28%'}} display="flex" alignItems="center" justifyContent="center">
                            <ImageUpload />
                        </Box>
                    </AccordionDetails>
                </Accordion>
                <Button sx={{ mt: 2 }} variant="contained" fullWidth onClick={handleSubmitBasicDetails}>Save Changes</Button>
            </Container>
        </React.Fragment>
    )
}
