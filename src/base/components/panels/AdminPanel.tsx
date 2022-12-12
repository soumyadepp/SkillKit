import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProjectsForm from '../forms/ProjectsForm';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Assignment } from '@mui/icons-material';

type AdminPanelPropType = {
  token:string;
}

export default function AdminPanel(props:AdminPanelPropType) {
  // const {token} = props;
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ mt:2,width: '100%', typography: 'body1',boxShadow:'0px 0px 4px lightgray'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Projects" value="1" />
            <Tab label="Team" value="2" />
            <Tab label="Issues" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <Accordion>
                <AccordionSummary expandIcon={<AddIcon/>}
                aria-controls="panel1a-content"
                id="panel1a-header">
                    <Typography fontSize={16} fontWeight={500}>Create New</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <ProjectsForm/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary expandIcon={<Assignment/>}
              aria-controls="panel1a-content"
              id="panel1a-header">
                <Typography fontSize={16} fontWeight={500}>Assign Users</Typography>
              </AccordionSummary>
              <AccordionDetails>
                AssignUsers here
              </AccordionDetails>
            </Accordion>
        </TabPanel>
        <TabPanel value="2">
          
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
