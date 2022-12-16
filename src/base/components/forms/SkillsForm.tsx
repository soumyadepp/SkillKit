import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MultiSelect from 'multiselect-react-dropdown';
import { options } from "./utils";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import ComponentLoader from "../loaders/ComponentLoader";
import { TaskAltOutlined } from "@mui/icons-material";

const theme = createTheme();


type OptionType = {
    id: number;
    name: string;
    image:string;
    value: string;
}


const baseApiURL = `https://dev-aq0ru8q8.us.auth0.com/api/v2`;
const mongoApiURL = 'http://localhost:4000/api/v1';

export default function UserForm() {
    const { user, getAccessTokenSilently } = useAuth0();
    const [skills, setSkills] = useState<OptionType[]>();
    const [userMetadata, setUserMetadata] = useState<any>();
    const [token, setToken] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const handleSelect = (selectedList: any, selectedItem: any) => {
        setSkills(selectedList);
    }
    const handleRemove = (selectedList: any, selectedItem: OptionType) => {
        setSkills(selectedList);
    }
    const getUserMetadata = async () => {
        const domain = "dev-aq0ru8q8.us.auth0.com";
        try {
            const accessToken = await getAccessTokenSilently({
                audience: `https://${domain}/api/v2/`,
                scope: "read:current_user",
            });
            setToken(accessToken);
            console.log(accessToken);
            const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;


            const metadataResponse = await fetch(userDetailsByIdUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            const { user_metadata } = await metadataResponse.json()
            setUserMetadata(user_metadata);
            localStorage.setItem('user_data', JSON.stringify(user_metadata));
        } catch (e: any) {
            console.log(e.message);
        }
    };
    useEffect(() => {
        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);
    useEffect(() => {
        setIsLoading(true);
        axios.get(`${baseApiURL}/users/${user?.sub}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setUserMetadata(res.data?.user_metadata);
                setSkills(res.data?.user_metadata?.skills);
                setIsLoading(false);
            })
            .catch((err) => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 10000);
                console.log(err);
            })
    }, [user, token]);
    const patchRequestOptions = {
        method: 'PATCH',
        url: `${baseApiURL}/users/${user?.sub}`,
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        data: { user_metadata: { skills: skills } }
    }

    const mongoPatchRequestOptions = {
        method: 'PATCH',
        url: `${mongoApiURL}/users/metadata/skills/${user?.email}`,
        data: { skills: skills }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.request(patchRequestOptions).then((res) => {
            console.log(res);
            axios.request(mongoPatchRequestOptions).then((res2) => {
                console.log(res2);
            })
                .catch(err => {
                    toast.error(err.message);
                    console.log(err);
                })
            toast.success('Successfully Updated.')
            setTimeout(() => {
                window.location.reload();
            }, 1500);
        })
            .catch((err) => {
                toast.error(err.message);
                console.log(err);
            });
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
                        Help us know you better.
                        <TaskAltOutlined sx={{ color: 'green' }} />
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1, width: '100%' }}
                    >
                        <Box sx={{ my: 2 }}>
                            <Typography sx={{ my: 1, textAlign: 'left' }} component="h5" variant="h6">Add or Update Skills</Typography>
                            {!isLoading && <MultiSelect
                                style={{ fontSize: '3vmin' }}
                                options={options}
                                displayValue="name"
                                onSelect={handleSelect}
                                onRemove={handleRemove}
                                selectedValues={skills}
                                placeholder="Select Skills"></MultiSelect>}
                            {isLoading && <ComponentLoader />}
                            <Button
                                onClick={handleSubmit}
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Save Changes
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
