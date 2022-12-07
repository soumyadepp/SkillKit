import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SkillType } from '../../types';
import SkillList from '../lists/SkillList';

type PanelPropType = {
  skills: SkillType[];
  projects?: any;
}

export default function UserPanel(props:PanelPropType) {
  const {skills,projects} = props;
  console.log(skills);
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Skills" value="1" />
            <Tab label="Projects" value="2" />
            <Tab label="Efficiency" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SkillList skills={skills}/>
        </TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
