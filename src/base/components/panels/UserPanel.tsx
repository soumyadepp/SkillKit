import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Button, Chip, Divider, Tab, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Project, UserDetailType } from '../../types';
import ComponentLoader from '../loaders/ComponentLoader';

type UserPanelPropType = {
    projects: Project[];
    userMetadata?: UserDetailType;
}

export default function UserPanel(props: UserPanelPropType) {
    const { projects } = props;
    const [value, setValue] = React.useState('1');
    const [workValue, setWorkValue] = React.useState('4');
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleWorkChange = (event: React.SyntheticEvent, newValue: string) => {
        setWorkValue(newValue);
    }
    return (
        <Box sx={{ width: '100%', typography: 'body1', boxShadow: '0px 0px 4px lightgray' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Projects" value="1" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <TabContext value={workValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
                            <TabList onChange={handleWorkChange} aria-label="lab API tabs example">
                                <Tab label="Upcoming" value="4" />
                                <Tab label="Pending" value="5" />
                                <Tab label="Completed" value="6" />
                            </TabList>
                            <TabPanel value="4">
                                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={1}>
                                    <Typography fontWeight={500} color="CaptionText">Project</Typography>
                                    <Typography fontWeight={500} color="CaptionText">Deadline</Typography>
                                </Box>
                                <Divider />
                                {!projects && <Box display="flex" alignItems="center" justifyContent="center">
                                    <ComponentLoader/>
                                </Box>}
                                {projects && projects.filter((p:Project)=>{
                                    const todayDate = new Date();
                                    const newDate = p.deadline.replace(/(\d+[/])(\d+[/])/, '$2$1');
                                    const deadline = new Date(newDate);
                                    return deadline.getTime() - todayDate.getTime() >= 0;
                                }).map((project: Project) => {
                                    return <Box key={project._id} py={1} display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                        <Typography fontWeight={500} color="#1976d2" fontSize={16}>{project.name}</Typography>
                                        <Chip label={project.deadline} color="error" />
                                    </Box>
                                })}
                                {projects && !projects.filter((p:Project) => {
                                    const todayDate = new Date();
                                    const newDate = p.deadline.replace(/(\d+[/])(\d+[/])/, '$2$1');
                                    const deadline = new Date(newDate);
                                    return deadline.getTime() - todayDate.getTime() >= 0;
                                }).length && <Box display="flex" alignItems="center" justifyContent="center">
                                    <Typography sx={{ my: 2 }} fontWeight={500} color="CaptionText" fontSize={16}>No Upcoming Work.</Typography>
                                </Box>}
                            </TabPanel>
                            <TabPanel value="5">
                                <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" mb={1}>
                                    <Typography fontWeight={500} color="CaptionText">Project</Typography>
                                    <Typography fontWeight={500} color="CaptionText">Due Date</Typography>
                                </Box>
                                <Divider />
                                {!projects && <Box display="flex" alignItems="center" justifyContent="center">
                                    <ComponentLoader/>
                                </Box>}
                                {projects && projects.filter((p:Project) => {
                                    const todayDate = new Date();
                                    const newDate = p.deadline.replace(/(\d+[/])(\d+[/])/, '$2$1');
                                    const deadline = new Date(newDate);
                                    return deadline.getTime() - todayDate.getTime() < 0;
                                }).map((pendingProject: Project) => {
                                    return <Box key={pendingProject._id} py={1} display="flex" alignItems="center" justifyContent="space-between" width="100%">
                                        <Typography fontWeight={500} color="#1976d2" fontSize={16}>{pendingProject.name}</Typography>
                                        <Chip label={pendingProject.deadline} color="warning"/>
                                    </Box>
                                })}
                                {projects && !projects.filter((p:Project) => {
                                    const todayDate = new Date();
                                    const newDate = p.deadline.replace(/(\d+[/])(\d+[/])/, '$2$1');
                                    const deadline = new Date(newDate);
                                    return deadline.getTime() - todayDate.getTime() < 0;
                                }).length && <Box display="flex" alignItems="center" justifyContent="center">
                                    <Typography sx={{ my: 2 }} fontWeight={500} color="CaptionText" fontSize={16}>No Pending Work.</Typography>
                                </Box>}

                            </TabPanel>
                            <TabPanel value="6">
                                <Typography fontSize={15}>Completed</Typography>
                            </TabPanel>
                        </Box>
                    </TabContext>
                </TabPanel>
                <TabPanel value="2">

                </TabPanel>
                <TabPanel value="3">

                </TabPanel>
            </TabContext>
        </Box>
    );
}
