import { useAuth0 } from '@auth0/auth0-react'
import { ThemeProvider } from '@emotion/react';
import { TaskAltRounded } from '@mui/icons-material';
import { Avatar, Box, Button, Chip, createTheme, CssBaseline, Divider, FormControl, MenuItem, Select, TextField, Tooltip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { designationMap,desigations } from '../../utils/common_data';
import FullScreenLoader from '../../components/loaders/FullScreenLoader';
import ImageUpload from '../../components/forms/imageUpload/ImageUpload';
import { MetaDataContext } from '../../../App';
const theme = createTheme();

const baseApiURL = process.env.REACT_APP_BACKEND_URL;

type EditProfileProps = {
    picture?:string;
    updateMetaData : Function
}

export default function EditProfile(props:EditProfileProps) {
    const { user } = useAuth0();
    const {picture} = props;
    const [formDesignation, setFormDesignation] = useState<any>('');
    const [formStreet, setFormStreet] = useState<any>('');
    const [formLine1, setFormLine1] = useState<any>('');
    const [formLine2, setFormLine2] = useState<any>('');
    const [formCity, setFormCity] = useState<any>('');
    const [formState, setFormState] = useState<any>('');
    const [formPincode, setFormPincode] = useState('');
    const [formFullName, setFormFullName] = useState<any>('');
    const [formUsername, setFormUsername] = useState<any>('');
    const [isLoading,setIsLoading] = useState(false);
    const userMeta : any = useContext(MetaDataContext);
    const [userMetaData, setUserMetaData] = useState<any>(null);

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
                    localStorage.removeItem('user_metadata');
                    setUserMetaData(null);
                    props.updateMetaData();
                })
                .catch(err => {
                    console.log(err);
                    if(err.response.status === 405){
                        toast.error('Username already exists. Please select a different username');
                    }
                    else{
                        toast.error(err.message);
                    }
                })
        }
    }
    const handleSubmitAddress = () => {
        if (user && formStreet && formLine1 && formCity && formState && formPincode) {
            axios.patch(`${baseApiURL}/users/metadata/address/${user?.email}`, {
                address: {
                    street: formStreet,
                    line1: formLine1,
                    line2: formLine2,
                    city: formCity,
                    state: formState,
                    pincode: formPincode
                }
            })
                .then((res) => {
                    console.log(res.data?.data);
                    toast.success(res.data?.message);
                    localStorage.removeItem('user_metadata');
                    setUserMetaData(null);
                    props.updateMetaData();
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                })
        }
    }
    const fetchUserMetadata = () => {
        setIsLoading(true);
                console.log(userMetaData);
                setFormUsername(userMetaData?.username);
                setFormFullName(userMetaData?.fullName);
                setFormDesignation(userMetaData?.designation);
                setFormStreet(userMetaData?.address?.street);
                setFormLine1(userMetaData?.address?.line1);
                setFormLine2(userMetaData?.address?.line2);
                setFormCity(userMetaData?.address?.city);
                setFormState(userMetaData?.address?.state);
                setFormPincode(userMetaData?.address?.pincode);
        setIsLoading(false);
    }

    useEffect(()=>{
        if(userMetaData!==null)
            fetchUserMetadata();
    }, [userMetaData]);

    useEffect(() => {
        if(userMetaData===null)
            setUserMetaData(userMeta);
    }, [userMeta])
    if(isLoading) return <FullScreenLoader/>
    return (
        <div>
            <Container sx={{ mt: 4, minHeight: '70vh', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', width: '100%' }}>
                <ThemeProvider theme={theme}>
                    <Toaster />
                    <Container component="main" maxWidth="lg" sx={{ boxShadow: '0px 0px 3px gray', color: '#000', mt: 6, display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Box>
                            <Avatar src={picture || user?.picture} sx={{ height: '100px', width: '100px' }} />
                            <ImageUpload/>
                            </Box>
                            <Box display="flex" flexDirection="column" alignItems="start" width="100%" sx={{ mr: 2 }}>
                                <Typography fontSize={25}>{formFullName || user?.given_name}</Typography>
                                <Typography fontSize={20} sx={{ color: '#1976d2' }}>{formUsername || user?.nickname}</Typography>
                                <Typography fontSize={14} color="GrayText">{user?.email}</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" alignItems="center" sx={{ p: 2 }}>
                            <Tooltip title={formDesignation}>
                                <Chip sx={{ fontSize: 15 }} label={designationMap.get(formDesignation) || 'Unassigned'} />
                            </Tooltip>
                        </Box>
                    </Container>
                    <Container component="main" maxWidth="lg" sx={{ display: 'flex', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}>
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
                                        onChange={e => setFormFullName(e.target.value)}
                                        autoFocus
                                        required
                                    />
                                </Box>
                                <Box sx={{ my: 1 }} display="flex" flexDirection="column" alignItems="center">
                                    <Box sx={{ my: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}>
                                        <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                            <Typography fontSize={18} sx={{ mb: 2 }} color="#1976d2">
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
                        <Box sx={{ mx: 4, my: 1 }} display="flex" flexDirection="column" alignItems="start" justifyContent="center" flex="0.7">
                            <Typography fontSize={18} sx={{ mb: 2,mt:1, color: '#1976d2' }}>Update your Address</Typography>
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
                                sx={{ my: 1 }}
                                fullWidth
                                label="City"
                                value={formCity}
                                onChange={e => setFormCity(e.target.value)}
                                autoFocus
                                required
                            />
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth
                                label="State"
                                value={formState}
                                onChange={e => setFormState(e.target.value)}
                                autoFocus
                                required
                            />
                            <TextField
                                sx={{ my: 1 }}
                                fullWidth
                                label="Pincode"
                                value={formPincode}
                                onChange={e => setFormPincode(e.target.value)}
                                autoFocus
                                required
                            />
                            <Box sx={{ my: 2, width: '100%' }}>
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
