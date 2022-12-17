import { Button, Container, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react';
import homeImage from '../../assets/homepageImage.png';
import StaticStepper from '../components/stepper/StaticStepper';

export default function LandingPage() {
    const [email, setEmail] = useState("");
    return (
        <Container maxWidth="lg" sx={{ my:10, minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container maxWidth="lg" sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box textAlign="left" sx={{ flex: 0.95 }}>
                    <Typography variant="h2" fontWeight={600}>
                        The <span style={{ color: '#1976d2' }}>Employee Management</span> App you always wanted.
                    </Typography>
                    <Typography fontSize={18} fontWeight={400} sx={{ my: 2 }}>
                        SkillKit offers a comprehensive suite of management techniques to help you manage your projects faster. Start by creating your organization's admin panel and add users to the organization.
                    </Typography>
                    <Box display="flex" sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Button sx={{flex:0.7,mx:1,width:'100%',display:'block',color:'#1976d2',border:'0.4px solid #1976d2',padding:'14px'}}>
                            Get Started
                        </Button>
                        <TextField color="info" label="Email Address" value={email} sx={{flex:0.7,fontSize:'3vmin'}} onChange={e => setEmail(e.target.value)} />
                    </Box>
                </Box>
                <Box sx={{ ml: 5, flex: 1 }}>
                    <img src={homeImage} alt="home image" style={{ height: '70vh' }} />
                </Box>
            </Container>
            <Container maxWidth="lg" sx={{my:2,minHeight:'90vh',display:'flex',flexDirection:'column'}}>
                <Typography variant="h2">Admin-Flow</Typography>
                <StaticStepper/>
            </Container>
        </Container>
    )
}
