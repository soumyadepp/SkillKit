import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Container, Tab, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ReactFragment, useState } from 'react';
import homeImage from '../../assets/homepageImage.png';
import StaticStepper from '../components/stepper/StaticStepper';
import { adminStepMap, adminSteps, userStepMap, userSteps } from '../utils/common_data';
import screenImage1 from '../../assets/screen3.png';
import screenImage2 from '../../assets/screen2.png';
import screenImage3 from '../../assets/screen7.png';
import FeatureSection from './static/FeatureSection';

export default function LandingPage() {
    const [email, setEmail] = useState("");
    const [value, setValue] = useState('1');
    const [featureValue,setFeatureValue] = useState('1');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };
    const handleFeatureChange = (event:React.SyntheticEvent,newValue: string) => {
        setFeatureValue(newValue);
    }
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
            <Container maxWidth="lg" sx={{ my: 2, minHeight: '60vh', display: 'flex', flexDirection: 'column' }}>
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
            <Container maxWidth="lg" sx={{my:2,minHeight:'60vh',display:'flex',flexDirection:'column'}}>
                <Typography variant="h2">Features</Typography>
                <TabContext value={featureValue}>
                    <Box sx={{borderBottom:1,my:2,borderColor:'divider'}}>
                        <TabList onChange={handleFeatureChange}>
                            <Tab label="User Dashboard" value="1"/>
                            <Tab label="Projects List" value="2"/>
                            <Tab label="Project assignment" value="3"/>
                        </TabList>
                        <TabPanel value="1">
                            <FeatureSection 
                            title="User Dashboard" 
                            text="Our dynamic user dashboard allows the users to manage and complete the assigned projects efficiently with professional communication between the team." 
                            image={screenImage1} height='240px'/>
                        </TabPanel>
                        <TabPanel value="2">
                            <FeatureSection 
                            title="Projects List" 
                            text="A page to show the details of all the projects assigned to you. The attractive UI makes the task less boring and more effective." 
                            image={screenImage2} height='250px'/>
                        </TabPanel>
                        <TabPanel value="3">
                            <FeatureSection 
                            title="Assignment made easy" 
                            text="Projects can be easily assigned to the respective users by the admin at just one click. The users can then see the task assigned to them." 
                            image={screenImage3} height='300px'/>
                        </TabPanel>
                    </Box>
                </TabContext>
            </Container>
        </Container>
    )
}
