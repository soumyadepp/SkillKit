import { ExpandMoreRounded } from '@mui/icons-material';
import { Accordion, AccordionSummary, AccordionDetails, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { TechType } from '../../types';

type ProjectAccordionPropType = {
    title: string;
    projectItems?: TechType[];
    projectItem?: TechType;
}

export default function ProjectAccordion(props: ProjectAccordionPropType) {
    const { title, projectItems, projectItem } = props;
    return (
        <Accordion sx={{ textAlign: 'left',border:'none',boxShadow:'none'}}>
            <AccordionSummary expandIcon={<ExpandMoreRounded />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography sx={{ mt: 3, textAlign: 'left', color: '#1976d2', fontWeight: '600' }} fontSize={14}>
                    {title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ textAlign: 'left' }}>
                    {projectItems && projectItems.map((tech) => {
                        return (
                            <ListItemButton>
                                <ListItemText sx={{ fontSize: '12px' }}>
                                    <Typography fontSize={14}>{tech.name}</Typography>
                                </ListItemText>
                                <ListItemIcon>
                                    <img src={tech.image} alt={tech.name} height="28px" />
                                </ListItemIcon>
                            </ListItemButton>
                        )
                    })}
                    {projectItem && <ListItemButton>
                        <ListItemText sx={{ fontSize: '12px' }}>
                            <Typography fontSize={14}>{projectItem.name}</Typography>
                        </ListItemText>
                        <ListItemIcon>
                            <img src={projectItem.image} alt={projectItem.name} height="28px" />
                        </ListItemIcon>
                    </ListItemButton>}
                </List>
            </AccordionDetails>
        </Accordion>
    )
}
