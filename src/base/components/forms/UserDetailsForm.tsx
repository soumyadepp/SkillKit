import { TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'

export default function UserDetailsForm() {
    const [username, setUsername] = useState<string>("");
    const [fullName, setFullName] = useState<string>("");

    return (
        <React.Fragment>
            <Container maxWidth="lg" component="main">
                {/* Basic Details */}
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="h4" color="#1976d2">
                        Enter your Username
                    </Typography>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        sx={{ my: 1 }}
                        autoFocus
                        required />
                    <Typography variant="h4" color="#1976d2">
                        Enter your full name
                    </Typography>
                    <TextField
                        label="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        fullWidth
                        sx={{ my: 1 }}
                        autoFocus
                        required />
                </Box>
            </Container>
        </React.Fragment>
    )
}
