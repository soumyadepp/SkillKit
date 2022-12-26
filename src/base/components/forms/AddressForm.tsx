import { useAuth0 } from '@auth0/auth0-react';
import { Button, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react'
import toast from 'react-hot-toast';

type AddressFormPropType = {
    updateMetaData:Function;
}

export default function AddressForm(props:AddressFormPropType) {
    const {user} = useAuth0();
    const baseApiURL = process.env.REACT_APP_BACKEND_URL;
    const [formStreet, setFormStreet] = useState<any>('');
    const [formLine1, setFormLine1] = useState<any>('');
    const [formLine2, setFormLine2] = useState<any>('');
    const [formCity, setFormCity] = useState<any>('');
    const [formState, setFormState] = useState<any>('');
    const [formPincode, setFormPincode] = useState('');
    const handleSubmitAddress = () => {
        if (formStreet && formLine1 && formCity && formState && formPincode) {
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
                    props.updateMetaData();
                })
                .catch(err => {
                    console.log(err);
                    toast.error(err.message);
                })
        }
    }
  return (
    <React.Fragment>
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
    </React.Fragment>
  )
}
