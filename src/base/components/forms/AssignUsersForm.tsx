import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MultiSelect from 'multiselect-react-dropdown';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ComponentLoader from "../loaders/ComponentLoader";
import { DeleteRounded, TaskAltOutlined, VerifiedUser } from "@mui/icons-material";
import { User, Project, UserLocalType } from "../../types";
import { Chip, Dialog, Divider, List, ListItem, ListItemIcon, ListItemText, MenuItem, Select, Tooltip } from "@mui/material";
const theme = createTheme();
const baseApiURL = process.env.REACT_APP_BACKEND_URL;



export default function AssignUsersForm() {
    const { user } = useAuth0();
    const [projects, setProjects] = useState<Project[]>([]);
    const [users, setUsers] = useState<any>();
    const [selectedUsers, setSelectedUsers] = useState<UserLocalType[]>([]);
    const [project, setProject] = useState<Project>();
    const [isLoading, setIsLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const handleSelect = (selectedList: any, selectedItem: any) => {
        setSelectedUsers(selectedList);
    }
    const handleRemove = (selectedList: any, selectedItem: any) => {
        setSelectedUsers(selectedList);
    }
    const fetchProjects = () => {
        axios.get(`${baseApiURL}/projects`)
            .then((res) => {
                setProjects(res.data?.data);
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message);
            })
    }
    const fetchUsers = () => {
        axios.get(`${baseApiURL}/users`)
            .then((res) => {
                setUsers(res.data?.data);
                
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            })
    }
    useEffect(() => {
        setIsLoading(true);
        fetchProjects();
        fetchUsers();
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        if (project) {
            var assigned: UserLocalType[] = [];
            project?.assignedUsers.map((assignedUser) => {
                assigned.concat(users.find((user: User) => user.email === assignedUser));
            })
            setSelectedUsers(assigned);
        }
    }, [project])

    const handleChange = (e: any) => {
        setProject(projects.find(x => x.name === e.target.value));
    }

    const handleUnassign = (e: React.SyntheticEvent, project: Project, userToUnassign: string) => {
        axios.put(`${baseApiURL}/projects/unassign/${project._id}`, {
            userToUnassign: userToUnassign
        })
            .then((res) => {
                console.log(res.data?.data);
                toast.success(res.data?.message);
                setTimeout(() => {
                    window.location.reload();
                }, 1500)
            })
            .catch((err) => {
                console.log(err.message);
                toast.error(err.message)
            })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const idList = selectedUsers.map((selectedUser: UserLocalType) => selectedUser.email);
        console.log(idList);
        axios.put(`${baseApiURL}/projects/assign/${project?._id}`, { assignedUsers: idList })
            .then((res) => {
                console.log(res.data);
                toast.success('Updated successfully');
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <ThemeProvider theme={theme}>
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
                    <Typography component="h1" variant="h6" fontSize={18} sx={{ display: 'flex', alignItems: 'center', lineHeight: '1rem', color: '#1976d2' }}>
                        Divide your work at ease.
                        <TaskAltOutlined sx={{ color: 'green' }} />
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1, width: '100%' }}
                    >
                        <Box sx={{ my: 2 }}>
                            <Typography variant="h6" sx={{ my: 2 }}>Select a project</Typography>
                            <Select
                                fullWidth
                                value={project?.name || ''}
                                onChange={e => handleChange(e)}
                                required
                                placeholder="Select a Project"
                            >
                                {projects && projects.map((item) => {
                                    return (
                                        <MenuItem value={item.name} key={item._id}>
                                            {item.name}
                                        </MenuItem>
                                    )
                                })}
                            </Select>
                        </Box>
                        <Box sx={{ my: 2 }}>
                            {project && project.assignedUsers.length > 0 &&
                                <Box sx={{ my: 1 }} display="flex" alignItems="center" justifyContent="space-evenly">
                                    <Typography variant="h6">
                                        {project.assignedUsers.length === 1 ? 'User' : 'Users'} assigned to {project.name}
                                    </Typography>
                                    <Chip label={`Due on ${project.deadline}`} sx={{ ml: 2, fontSize: '12px', color: '#d10023', fontWeight: '500', border: '1px solid #d10023', background: '#ffff' }} />
                                </Box>
                            }

                            {project && <List>
                                {project.assignedUsers.map((assignedUser) => {
                                    return (
                                        <ListItem sx={{ display: 'flex', alignItems: 'center' }}>
                                            <ListItemText>{assignedUser}</ListItemText>
                                            <ListItemIcon>
                                                <VerifiedUser color="primary" />
                                                <Tooltip title={`Unassign ${assignedUser}`}>
                                                    <DeleteRounded color="error" onClick={() => setOpenDialog(true)} />
                                                </Tooltip>
                                            </ListItemIcon>
                                            <Dialog open={openDialog}>
                                                <Box display="flex" flexDirection="column" alignItems="center">
                                                    <Typography mt={2} variant="h5" fontWeight={600}>Unassign User</Typography>
                                                    <Divider/>
                                                    <Typography m={2} fontSize={20}>Are you sure you want to unassign {assignedUser} from {project.name}?</Typography>
                                                    <Box p={3} display="flex" alignItems="center" justifyContent="space-evenly">
                                                        <Button sx={{mx:1}} variant="contained" onClick={e => handleUnassign(e, project, assignedUser)}>Yes</Button>
                                                        <Button sx={{mx:1}} variant="contained" color="error" onClick={() => setOpenDialog(false)}>No</Button>
                                                    </Box>
                                                </Box>
                                            </Dialog>
                                        </ListItem>
                                    )
                                })}
                            </List>}
                        </Box>
                        {project && <Box sx={{ my: 2 }}>
                            <Typography sx={{ my: 1, textAlign: 'left' }} component="h5" variant="h6">Assign a new list of users to <span style={project ? { color: '#1976d2' } : {}}>{`${project ? project.name : 'project'}`}</span></Typography>
                            <Typography sx={{ my: 1 }} fontSize={11}>*Note that the list of users you select will overwrite the existing list of users.</Typography>
                            {!isLoading && <MultiSelect
                                style={{ fontSize: '3vmin' }}
                                options={users}
                                displayValue={"email"}
                                onSelect={handleSelect}
                                onRemove={handleRemove}
                                selectedValues={selectedUsers}
                                placeholder="Select Users"></MultiSelect>}
                            {isLoading && <ComponentLoader />}
                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                        </Box>}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
