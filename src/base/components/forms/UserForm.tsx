import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MultiSelect from 'multiselect-react-dropdown';
import options from "./utils";
import { User } from "../../types";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const theme = createTheme();


type OptionType = {
    id: number;
    name: string;
    value: string;
}

type PropsType = {
    afterUpdate : Function
}

const baseApiURL = `https://dev-aq0ru8q8.us.auth0.com/api/v2`;

export default function UserForm(props: PropsType) {
    const { user, getAccessTokenSilently } = useAuth0();
    const [formEmail, setFormEmail] = useState(user?.email || "");
    const [skills, setSkills] = useState<OptionType[]>();
    const [userMetadata, setUserMetadata] = useState<any>();
    const [token,setToken] = useState("");
    const handleSelect = (selectedList: any, selectedItem: any) => {
        setSkills(selectedList);
    }
    const handleRemove = (selectedList: any, selectedItem: OptionType) => {
        setSkills(selectedList);
    }
    useEffect(() => {
        const getUserMetadata = async () => {
            const domain = "dev-aq0ru8q8.us.auth0.com";

            try {
                const accessToken = await getAccessTokenSilently({
                    audience: `https://${domain}/api/v2/`,
                    scope: "read:current_user",
                });
                setToken(accessToken);
                const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user?.sub}`;

                const metadataResponse = await fetch(userDetailsByIdUrl, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const { user_metadata } = await metadataResponse.json();

                setUserMetadata(user_metadata);
                setSkills(user_metadata?.skills);
                localStorage.setItem('user_data', JSON.stringify(user_metadata));
            } catch (e: any) {
                console.log(e.message);
            }
        };
        getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);
    useEffect(() => {
        axios.get(`${baseApiURL}/users/${user?.sub}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then((res) => {
                setUserMetadata(res.data?.user_metadata);
                setSkills(res.data?.user_metadata?.skills);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [user]);
    const patchRequestOptions = {
        method: 'PATCH',
        url: `${baseApiURL}/users/${user?.sub}`,
        headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
        data: { user_metadata: { skills: skills } }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.request(patchRequestOptions).
            then((res) => {
                console.log(res);
                toast.success('Successfully Updated.')
                // setTimeout(() => {
                //     window.location.reload();
                // }, 1000);
                props.afterUpdate();
            })
            .catch((err) => {
                toast.error(err.message);
                console.log(err);
            })
    }
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
                    <Typography component="h5" variant="h6">
                        Basic Details
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        sx={{ mt: 1, width: '100%' }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            aria-readonly
                            value={formEmail}
                            onChange={formEmail === "" ? (e) => setFormEmail(e.target.value) : () => { }}
                            style={formEmail !== "" ? { background: '#efefef' } : {}}
                            autoFocus
                        />
                        <Box sx={{ my: 2 }}>
                            <Typography sx={{ my: 1, textAlign: 'left' }} component="h5" variant="h6">Add or Update Skills</Typography>
                            <MultiSelect
                                style={{ fontSize: '3vmin' }}
                                options={options}
                                displayValue="name"
                                onSelect={handleSelect}
                                onRemove={handleRemove}
                                selectedValues={skills}
                                placeholder="Select Skills"></MultiSelect>
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
