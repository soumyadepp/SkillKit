import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Container, Tab, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react';
import homeImage from '../../assets/homepageImage.png';
import StaticStepper from '../components/stepper/StaticStepper';
import { adminStepMap, adminSteps, userStepMap, userSteps } from '../utils/common_data';

export default function LandingPage() {
    const [email, setEmail] = useState("");
    const [value, setValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    return (
        <Container maxWidth="lg" sx={{ my: 10, minHeight: '90vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Container maxWidth="lg" sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box textAlign="left" sx={{ flex: 0.95 }}>
                    <Typography variant="h2" fontWeight={600}>
                        The <span style={{ color: '#1976d2' }}>Employee Management</span> App you always wanted.
                    </Typography>
                    <Typography fontSize={18} fontWeight={400} sx={{ my: 2 }}>
                        SkillKit offers a comprehensive suite of management techniques to help you manage your projects faster. Start by creating your organization's admin panel and add users to the organization.
                    </Typography>
                    <Box display="flex" sx={{ alignItems: 'center', justifyContent: 'space-evenly' }}>
                        <Button sx={{ flex: 0.7, mx: 1, width: '100%', display: 'block', color: '#1976d2', border: '0.4px solid #1976d2', padding: '14px' }}>
                            Get Started
                        </Button>
                        <TextField color="info" label="Email Address" value={email} sx={{ flex: 0.7, fontSize: '3vmin' }} onChange={e => setEmail(e.target.value)} />
                    </Box>
                </Box>
                <Box sx={{ ml: 5, flex: 1 }}>
                    <img src={homeImage} alt="home image" style={{ height: '70vh' }} />
                </Box>
            </Container>
            <Container maxWidth="lg" sx={{ my: 2, minHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h2">Flows</Typography>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1,my:2, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Admin Flow"  value="1" />
                            <Tab label="User Flow" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <Typography variant="h4">Admin Flow</Typography>
                        <StaticStepper steps={adminSteps} stepMap={adminStepMap}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <Typography variant="h4">User Flow</Typography>
                        <StaticStepper steps={userSteps} stepMap={userStepMap}/>
                    </TabPanel>
                </TabContext>
            </Container>
        </Container>
    )
}
