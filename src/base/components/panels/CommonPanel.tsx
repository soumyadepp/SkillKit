import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { SkillType } from '../../types';
import SkillList from '../lists/SkillList';
import ProjectsList from '../lists/ProjectsList';

type PanelPropType = {
  skills: SkillType[];
  projects?: any;
  token:string;
}

export default function CommonPanel(props:PanelPropType) {
  const {skills} = props || [];
  const {token} = props;
  const [value, setValue] = React.useState('1');
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%', typography: 'body1',boxShadow:'0px 0px 4px lightgray'}}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="My Skills" value="1" />
            <Tab label="Projects" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SkillList skills={skills}/>
        </TabPanel>
        <TabPanel value="2">
          <ProjectsList token={token}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}
