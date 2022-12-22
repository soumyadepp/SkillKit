import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ProjectsForm from '../forms/ProjectsForm';
import { Accordion, AccordionDetails, AccordionSummary, Button, Chip, MenuItem, Select, Tooltip, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Assignment, CheckCircleOutline, ManageHistory} from '@mui/icons-material';
import AssignUsersForm from '../forms/AssignUsersForm';
import axios from 'axios';
import { Data, Project } from '../../types';
import toast from 'react-hot-toast';
import Edit from '@mui/icons-material/Edit';
import UserList from '../lists/UserList';
import { colorMap, statusOptions } from '../../utils/common_data';

type AdminPanelPropType = {
  token: string;
}


const baseApiURL = process.env.REACT_APP_BACKEND_URL;



export default function AdminPanel(props: AdminPanelPropType) {
  const [value, setValue] = React.useState('1');
  const [projects, setProjects] = useState<Project[]>([]);
  const [status, setStatus] = useState<String>();
  const [projectId,setProjectId] = useState("");
  const [expanded, setExpanded] = useState<string | false>(false);
  const [subExpanded,setSubExpanded] = useState<string | false>(false);
  const handleExpandedChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  
  const handleSubExpandedChange = 
    (panel:string) => (event: React.SyntheticEvent, isExpanded:boolean) => {
      setSubExpanded(isExpanded ? panel : false);
    };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleUpdate = () => {
    console.log(projectId);
    console.log(status);
    axios.put(`${baseApiURL}/projects/status/${projectId}`,{
      status: status
    })
    .then((res) => {
      fetchProjects();
    })
    .catch(err => console.log(err)); 
  }

  function fetchProjects(){
    axios.get(`${baseApiURL}/projects`)
    .then((res) => {
      setProjects(res.data?.data);
      console.log(status);
    })
    .catch(err => {
      console.log(err);
      toast.error(err.message);
    })
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Box sx={{ mt: 2, width: '100%', typography: 'body1', boxShadow: '0px 0px 4px lightgray' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab label="Team" value="1" />
            <Tab label="Manage Projects" value="2" />
            <Tab label="Issues" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <UserList/>
        </TabPanel>
        <TabPanel value="2">
          <Accordion expanded={expanded === 'panel-create'} onChange={handleExpandedChange('panel-create')}>
            <AccordionSummary expandIcon={<AddIcon sx={{color:'#1976d2'}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography fontSize={16} fontWeight={500}>Create New</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ProjectsForm />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'assign-users'} onChange={handleExpandedChange('assign-users')}>
            <AccordionSummary expandIcon={<Assignment sx={{color:'#1976d2'}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Typography fontSize={16} fontWeight={500}>Assign Users</Typography>
            </AccordionSummary>
            <AccordionDetails >
              <AssignUsersForm />
            </AccordionDetails>
          </Accordion>
          <Accordion expanded={expanded === 'status-panel'} onChange={handleExpandedChange('status-panel')}>
            <AccordionSummary expandIcon={<ManageHistory sx={{color:'#1976d2'}}/>}
              aria-controls="panel1a-content"
              id="panel1a-header">
              <Tooltip title="You can update the status of your project here">
                <Typography fontSize={16} fontWeight={500}>Milestones</Typography>
              </Tooltip>
            </AccordionSummary>
            <AccordionDetails sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              <Typography fontSize={13} fontWeight={400} sx={{ my:2,color: '#1976d2' }}>
                *The projects you close will be marked as done. But the projects you delete cannot be recovered in the futre.
              </Typography>
              {projects && projects.map((project,index) => {
                return (
                  <Accordion key={index} expanded={subExpanded === `panel-${index + 1}`} onChange={handleSubExpandedChange(`panel-${index + 1}`)} sx={{ width: '100%' }}>
                    <AccordionSummary expandIcon={<Edit />}
                      aria-controls="panel1a-content"
                      id="panel1a-header">
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',width:'100%'}}>
                        <Typography>{project.name}</Typography>
                        <Chip label={project.status} sx={{mx:2,background:`${colorMap.get(project.status)[0]}`,color:`${colorMap.get(project.status)[1]}`}}/>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Box>
                        <Box display="flex" alignItems="center">
                          <Typography sx={{ my: 2 }} fontSize={16}>Mark the progress of {project.name}</Typography>
                          <CheckCircleOutline sx={{ mx: 1, color: 'green' }} />
                        </Box>
                        <Select
                          fullWidth
                          value={status}
                          hidden
                          onChange={(e) => {
                            setStatus(e.target.value);
                            setProjectId(project._id);
                          }}
                          required
                        >
                          {statusOptions.map((item: any) => {
                            return (
                              <MenuItem value={item.value} key={item.value}>
                                {item.name}
                              </MenuItem>
                            )
                          })}
                        </Select>
                        <Button
                          onClick={handleUpdate}
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Save Changes
                        </Button>
                      </Box>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
