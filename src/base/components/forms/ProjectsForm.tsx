import { ThemeProvider } from '@emotion/react'
import { TaskAltRounded } from '@mui/icons-material'
import { Button, createTheme, CssBaseline, Divider, FormControl, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { useEffect, useState } from 'react';
import { Project, TechType } from '../../types';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import Multiselect from 'multiselect-react-dropdown';
import { frontend, backend, databases } from './utils';
import toast, { Toaster } from 'react-hot-toast';
const theme = createTheme();

type ProjectsFormPropType = {
    project?: Project;
}

export default function ProjectsForm(props: ProjectsFormPropType) {
    const { user } = useAuth0();
    const { project } = props;
    const [projectName, setProjectName] = useState(project?.name || "");
    const [projectDescription, setProjectDescription] = useState(project?.description || "");
    const [version, setVersion] = useState(project?.version || "");
    const [deadline, setDeadline] = useState(project?.deadline || "");
    const [backendSelected, setBackendSelected] = useState<TechType[]>(project?.stackUsed.backend || []);
    const [fid, setFid] = useState(project?.stackUsed.frontend.id || "");
    const [frontendSelected, setFrontendSelected] = useState<TechType>();
    const [databasesSelected, setDatabasesSelected] = useState<TechType[]>([]);

    const handleSelectBackend = (selectedList: any, selectedItem: TechType) => {
        setBackendSelected(selectedList);
    }
    const handleRemoveBackend = (selectedList: any, selectedItem: TechType) => {
        setBackendSelected(selectedList);
    }
    const handleSelectDatabases = (selectedList: any, selectedItem: TechType) => {
        setDatabasesSelected(selectedList);
    }
    const handleRemoveDatabases = (selectedList: any, selectedItem: TechType) => {
        setDatabasesSelected(selectedList);
    }
    const handleFrontendChange = (e: any) => {
        setFid(e.target.value as string);
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!projectName || !projectDescription || !version || !deadline || !fid || backendSelected.length === 0 || databasesSelected.length === 0) {
            console.log(project,projectDescription,version,deadline,fid,backendSelected,frontendSelected,databasesSelected);
            toast.error('Please fill in all the fields');
            return;
        }
        const deadlineString = new Date(deadline).toLocaleDateString();
        const payloadFrontend = frontend.find(x => x.name === fid);
        const projectPayload = {
            name: projectName,
            description: projectDescription,
            version: version,
            deadline: deadlineString,
            stackUsed: {
                frontend: payloadFrontend || frontendSelected,
                backend: backendSelected,
                databases: databasesSelected,
            },
            createdBy: user?.sub
        }
        axios.post('http://localhost:4000/api/v1/projects', projectPayload)
            .then(res => {
                console.log(res.data.message);
                toast.success('Project Added');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            })
    }
    useEffect(() => {

    }, [])
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
                        Generate a new project for the engineering team
                        <TaskAltRounded sx={{ color: 'green' }} />
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1, width: '100%' }}
                    >
                        <TextField
                            sx={{ mb: 1 }}
                            fullWidth
                            value={projectName}
                            label="Project Name"
                            onChange={e => setProjectName(e.target.value)}
                            autoFocus
                            required
                        />
                        <TextField
                            sx={{ my: 1 }}
                            fullWidth
                            value={projectDescription}
                            label="Project Description"
                            onChange={e => setProjectDescription(e.target.value)}
                            autoFocus
                            required
                        />
                        <Box sx={{ my: 1, display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-evenly' }}>
                            <TextField
                                sx={{ mr: 1 }}
                                value={version}
                                label="Version"
                                onChange={e => setVersion(e.target.value)}
                                autoFocus
                                fullWidth
                                required
                            />
                            <TextField
                                type="date"
                                value={deadline}
                                onChange={e => setDeadline(e.target.value)}
                                autoFocus
                                fullWidth
                                required
                            />
                        </Box>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ my: 1, display: 'flex', flexDirection: 'column', alignItems: 'start', width: '100%', justifyContent: 'space-evenly' }}>
                            <FormControl sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography fontSize={14} sx={{ my: 2 }} color="#1976d2">
                                    Frontend Framework
                                </Typography>
                                <Select
                                    fullWidth
                                    value={fid}
                                    onChange={e => handleFrontendChange(e)}
                                    required
                                >
                                    {frontend.map((item) => {
                                        return (
                                            <MenuItem value={item.name} key={item.name}>
                                                {item.name}
                                            </MenuItem>
                                        )
                                    })}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography fontSize={14} sx={{ my: 2 }} color="#1976d2">
                                    Backend Framework(s)
                                </Typography>
                                <Multiselect
                                    options={backend}
                                    displayValue="name"
                                    onSelect={handleSelectBackend}
                                    onRemove={handleRemoveBackend}
                                    selectedValues={backendSelected}
                                    selectionLimit={3}
                                    placeholder="Backend Framework(s)"></Multiselect>
                            </FormControl>
                            <FormControl sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                                <Typography fontSize={14} sx={{ my: 2 }} color="#1976d2">
                                    Database(s)
                                </Typography>
                                <Multiselect
                                    options={databases}
                                    displayValue="name"
                                    onSelect={handleSelectDatabases}
                                    onRemove={handleRemoveDatabases}
                                    selectedValues={databasesSelected}
                                    selectionLimit={2}
                                    placeholder="Database(s)"></Multiselect>
                            </FormControl>
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
