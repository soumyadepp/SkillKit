import { useAuth0 } from '@auth0/auth0-react';
import { CameraAltOutlined } from '@mui/icons-material';
import { Button, CircularProgress, Dialog, Fab, Modal, Tooltip, Typography } from '@mui/material';
import { Container } from '@mui/system';
import axios from 'axios';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

export default function ImageUpload() {
    const {user} = useAuth0();
    const [fileInputState, setFileInputState] = useState('');
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [previewSource, setPreviewSource] = useState<any>();
    const [open, setOpen] = useState(false);
    const hiddenFileInput = useRef<any>();
    const handleClose = () => {
        setOpen(false);
    }
    const handleClick = (e: any) => {
        hiddenFileInput.current.click();
    }
    const handleFileInputChange = (e: any) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    const previewFile = (file: any) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
        setOpen(true);
    }

    const uploadImage = (base64EncodedString:any) => {
        console.log(base64EncodedString);
        axios.patch(`${process.env.REACT_APP_BACKEND_URL}/users/metadata/image/${user?.email}`,{
            image:base64EncodedString
        })
        .then((res) => {
            toast.success(res.data?.message);
            console.log('Success');
            setTimeout(() => {
                window.location.reload();
            },1500)
        })
        .catch(err => {
            console.log('Failed');
        })
    }

    const handleSubmitFile = (e:any) => {
        e.preventDefault();
        setIsLoading(true);
        if(!previewSource){
            setIsLoading(false);
            return;
        }
        uploadImage(previewSource);
        setIsLoading(false);
    }

    return (
        <React.Fragment>
            <Container sx={{ mt: -6, ml: 5 }}>
                <input ref={hiddenFileInput} hidden={true} type="file" accept='image/jpeg image/png' name="image" onChange={handleFileInputChange} value={fileInputState} />
                <Tooltip title="Add or Update Profile Pic">
                    <Fab color="info" aria-label="edit" sx={{ height: '3rem', width: '3rem', my: 1, background: '#1976d2', display: 'flex', alignContent: 'center' }} onClick={e => handleClick(e)}>
                        <CameraAltOutlined />
                    </Fab>
                </Tooltip>
                {previewSource && <Dialog open={open} onClose={handleClose}>
                    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography sx={{my:2}} variant="h4">Upload Profile Picture</Typography>
                        <Typography sx={{mb:2}} fontSize={15}>The following image will be set as your display picture.</Typography>
                        {!isLoading && <img src={previewSource} alt="chosen image" style={{ borderRadius:'50%',maxHeight: '35vmin', width: 'auto', padding: '0 auto' }} />}
                        {isLoading && <CircularProgress/>}
                        <Button sx={{ margin: '10px' }} type="submit" onClick={handleSubmitFile} variant="contained" fullWidth>Upload</Button>
                    </Container>
                </Dialog>}
            </Container>
        </React.Fragment>
    )
}
