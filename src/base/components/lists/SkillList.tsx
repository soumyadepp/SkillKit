import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SkillType } from '../../types';
import ComponentLoader from '../loaders/ComponentLoader';

type ListPropType = {
    skills: SkillType[];
}

export default function SkillList(props: ListPropType) {
    const { skills } = props;
    return (
        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            <nav aria-label="skills list">
                {skills && <List>
                    {skills.map((skill: SkillType) => {
                        return (
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <img src={skill.image} height="30px" width="auto"/>
                                    </ListItemIcon>
                                    <ListItemText primary={skill.name} />
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>}
                {!skills && <ComponentLoader/>}
            </nav>
        </Box>
    );
}
