import { ThemeProvider } from '@emotion/react'
import { TaskAltRounded } from '@mui/icons-material'
import { Button, createTheme, CssBaseline, Divider, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect, useState } from 'react';
import { Project, TechType, UserDetailType } from '../../types';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Multiselect from 'multiselect-react-dropdown';
import toast, { Toaster } from 'react-hot-toast';
const theme = createTheme();

type TaskFormPropType = {
    projects: Project[];
    users:UserDetailType[];
}

export default function TaskForm(props: TaskFormPropType) {
    const { user } = useAuth0();
    const { projects,users } = props;
    const [taskNumber,setTaskNumber] = useState<string>("");
    const [title,setTitle] = useState<string>("");
    const [description,setDescription] = useState<string>("");
    const [deadline,setDeadline] = useState<string>("");
    const [assignedUsers,setAssignedUsers] = useState<UserDetailType[]>([]);
    const [project,setProject] = useState<Project>();
    const [backendRequired,setBackendRequired] = useState<string>("");
    const [databaseRequired,setDatabaseRequired] = useState<string>("");
    const [projectDisplayName,setProjectDisplayName] = useState<string>("");
    const [userOptions,setUserOptions] = useState<UserDetailType[]>(users);
    const assignedBy = user?.email;

    const handleChange = (e:any) => {
        setProjectDisplayName(e.target.value);
    }

    const handleBackendChange = (e:any) => {
        setBackendRequired(e.target.value);
        console.log(backendRequired);
    }
    const handleSelectUser= (selectedList: any, selectedItem: UserDetailType) => {
        setAssignedUsers(selectedList);
    }
    const handleRemoveUser = (selectedList: any, selectedItem: UserDetailType) => {
        setAssignedUsers(selectedList);
    }

    const handleSubmit = (e:any) => {
        const payloadData = {
            taskNumber: taskNumber,
            title:title,
            description:description,
            deadline:deadline,
            project:project,
            assignedUsers:assignedUsers,
            assignedBy:assignedBy
        }
        console.log(payloadData);
    }

    useEffect(() => {
        setProject(projects.find((p:Project) => p.name === projectDisplayName));
        console.log(project);
    },[projectDisplayName,users]);

    
    return (
        <ThemeProvider theme={theme}>
            <Toaster />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "start"
                    }}
                >
                    <Typography component="h1" variant="h6" fontSize={15} sx={{ my: 2, display: 'flex', alignItems: 'center', lineHeight: '1rem', color: '#1976d2' }}>
                        Create a new task for your team members.
                        <TaskAltRounded sx={{ color: 'green' }} />
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1, width: '100%' }}
                    >
                        <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            value={taskNumber}
                            label="Task Number"
                            onChange={e => setTaskNumber(e.target.value)}
                            autoFocus
                            required
                        />
                        <TextField
                            sx={{ mb: 2 }}
                            fullWidth
                            value={title}
                            label="Task Title"
                            onChange={e => setTitle(e.target.value)}
                            autoFocus
                            required
                        />
                        <TextField
                            sx={{ my: 2 }}
                            fullWidth
                            value={description}
                            multiline
                            maxRows={4}
                            label="Task Description"
                            onChange={e => setDescription(e.target.value)}
                            autoFocus
                            required
                        />
                        <Typography fontSize={15} sx={{my:1}} color="#1976d2">
                            Enter Deadline
                        </Typography>
                        <TextField
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                                autoFocus
                                fullWidth
                                required
                        />
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ my: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}>
                            <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography fontSize={14} sx={{ my: 2 }} color="#1976d2">
                                    Project to which task is Affiliated to:
                                </Typography>
                                <Select
                                    fullWidth
                                    value={projectDisplayName}
                                    onChange={e => handleChange(e)}
                                    required
                                >
                                    {projects.map((item,index) => {
                                        return (
                                            <MenuItem value={item.name} key={index}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            {project && projectDisplayName && <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography fontSize={14} sx={{ my: 2 }} color="#1976d2">
                                    Frontend tool required
                                </Typography>
                                <TextField
                                value={project.stackUsed.frontend.name}
                                autoFocus
                                fullWidth
                                required
                        />
                            </FormControl>}
                            {project && projectDisplayName &&  <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography fontSize={14} sx={{ my: 2 }} color="#1976d2">
                                    Select backend for this task
                                </Typography>
                                <Select
                                    fullWidth
                                    value={backendRequired}
                                    onChange={handleBackendChange}
                                    required
                                >
                                    {project.stackUsed.backend.map((item,index) => {
                                        return (
                                            <MenuItem value={item.name} key={index}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>}
                            {project && backendRequired && <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography fontSize={14} sx={{ my: 2 }} color="#1976d2">
                                    Select Users to assign the task (max:3)
                                </Typography>
                                <Multiselect
                                    options={userOptions}
                                    displayValue={"username" || "user_email"}
                                    onSelect={handleSelectUser}
                                    onRemove={handleRemoveUser}
                                    selectedValues={assignedUsers}
                                    selectionLimit={3}
                                    placeholder="Assigned User(s)"></Multiselect>
                            </FormControl>}
                        </Box>
                        <Box sx={{ my: 2 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
