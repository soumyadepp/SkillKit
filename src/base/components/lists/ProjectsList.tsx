import { Accordion, AccordionDetails, AccordionSummary, List, Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { Project } from '../../types'
import ComponentLoader from '../loaders/ComponentLoader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProjectAccordion from './ProjectAccordion';

type ProjectsListPropType = {
    projects?:Project[];
}


export default function ProjectsList(props: ProjectsListPropType) {
    const {projects} = props;
    const [expanded, setExpanded] = useState<string | false>(false);
    const handleExpandedChange =
        (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
            setExpanded(isExpanded ? panel : false);
        };
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="skills list">
                {projects && <List>
                    {projects?.map((project: Project,index) => {
                        return (
                            <Accordion key={project._id} expanded={expanded === `p-${index + 1}`} onChange={handleExpandedChange(`p-${index + 1}`)}>
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

                                    <ProjectAccordion title="Frontend" projectItem={project.stackUsed.frontend} />
                                    <ProjectAccordion title="Backend" projectItems={project.stackUsed.backend} />
                                    <ProjectAccordion title="Databases" projectItems={project.stackUsed.databases} />
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
            </nav>
            {!projects && <ComponentLoader />}
        </Box>
    )
}
