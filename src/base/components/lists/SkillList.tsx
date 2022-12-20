import { Fab, Paper, Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { SkillType } from '../../types';
import Modal from '@mui/material/Modal';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ComponentLoader from '../loaders/ComponentLoader';
import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { useSpring, animated } from 'react-spring';
import SkillsForm from '../forms/SkillsForm';
import React from 'react';
import { BackpackRounded } from '@mui/icons-material';

type ListPropType = {
  skills: SkillType[];
  token:string;
}


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


export default function SkillList(props: ListPropType) {
  const { skills,token} = props;
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="skills list">
        {skills?.length === 0 && <Paper sx={{my:4,maxHeight:'250px',overflow:'auto',boxShadow:'none'}}>
          <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <Typography variant="h5">Nothing to show here.</Typography>
            <BackpackRounded sx={{my:2}} color='primary'/>
          </Box>
        </Paper>}
        {skills && <Box display="flex" alignItems="center" justifyContent="start" flexWrap="wrap">
          {skills.map((skill: SkillType) => {
            return (
              <Box mx={1} my={1}>
                <Tooltip title={skill.name}>
                  <img src={skill.image} alt={skill.value} style={{width:'3rem'}} height="auto"/>
                </Tooltip>
              </Box>
            )
          })}
        </Box>}
        <Box sx={{ my: 1,display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Fab color="secondary" aria-label="edit" sx={{ background: '#1976d2', display: 'flex', alignContent: 'center' }} onClick={handleOpen}>
            {skills?.length > 0 && <EditIcon/>}
            {skills?.length === 0 && <AddIcon/>}
          </Fab>
        </Box>
        <Modal
          aria-labelledby="spring-modal-title"
          aria-describedby="spring-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <SkillsForm token={token} skills={skills}/>
            </Box>
          </Fade>
        </Modal>
        {skills === undefined && <ComponentLoader />}

      </nav>
    </Box>
  );
}
