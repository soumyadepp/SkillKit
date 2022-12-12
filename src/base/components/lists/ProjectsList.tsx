import { Accordion, AccordionDetails, AccordionSummary, List,Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Project } from '../../types'
import ComponentLoader from '../loaders/ComponentLoader';
import { animated, useSpring } from 'react-spring';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProjectAccordion from './ProjectAccordion';
interface FadeProps {
    children?: React.ReactElement;
    in: boolean;
    onEnter?: () => {};
    onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0.5px solid #000d1a',
    boxShadow: 24,
    p: 4,
};

type ProjectsListPropType = {
    token: string;
}

export default function ProjectsList(props: ProjectsListPropType) {
    const { token } = props;
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/v1/projects')
            .then((res) => {
                setProjects(res.data?.data);
            })
            .catch(err => {
                toast.error(err.message);
            })
    }, []);

    useEffect(() => {

    }, [projects])

    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="skills list">
                {projects && <List>
                    {projects?.map((project: Project) => {
                        return (
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} width='100%'>
                                        <Typography>{project.name}</Typography>
                                        <Typography fontSize={14}>version: {project.version}</Typography>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography fontSize={13} textAlign="left">
                                        {project.description}
                                    </Typography>
                                    <ProjectAccordion title="Frontend" projectItem={project.stackUsed.frontend}/>
                                    <ProjectAccordion title="Backend" projectItems={project.stackUsed.backend}/>
                                    <ProjectAccordion title="Databases" projectItems={project.stackUsed.databases}/>
                                    <Divider sx={{ my: 1 }} />
                                    <Box sx={{ mt: 1, display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <Typography textAlign="left" fontSize={13} color="#d20023">Deadline</Typography>
                                        <Typography textAlign="left" fontSize={13}>{project.deadline}</Typography>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        )
                    })}
                </List>}
                {!projects && <ComponentLoader />}
            </nav>
        </Box>
    )
}
