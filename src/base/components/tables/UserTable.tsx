import { Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material'
import { Box, Container } from '@mui/system';
import { Project, TechType } from '../../types';
import { colorMap } from '../../utils/common_data';
import ComponentLoader from '../loaders/ComponentLoader';

type UserTablePropType = {
  rows: Project[];
}

const columnHeaders = [
  'Name',
  'Version',
  'Deadline',
  'Frontend',
  'Backend',
  'Databases',
  'Status',
  'Description'
]

export default function UserTable(props:UserTablePropType) {
  const {rows} = props;
  return (
    <TableContainer sx={{mt:2}} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            {columnHeaders.map((column:string,index:any) => {
              return <TableCell key={index}>
                <Typography fontSize={14}>
                {column}
                </Typography>
              </TableCell>
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!rows && <Container sx={{display:"flex",alignItems:"center",justifyContent:"center",minHeight:'50vh'}}>
            <ComponentLoader/>
          </Container>}
          {rows && rows.map((row:Project) => {
            return <TableRow>
              <TableCell sx={{color:'#1976d2',fontWeight:'500'}}>
                {row.name}
              </TableCell>
              <TableCell>{row.version}</TableCell>
              <TableCell>{row.deadline}</TableCell>
              <TableCell>
                <Tooltip title={row.stackUsed.frontend.name}>
                  <img src={row.stackUsed.frontend.image} alt={row.stackUsed.frontend.name} height="35rem"/>
                </Tooltip>
              </TableCell>
              <TableCell>
                {row.stackUsed.backend.map((b:TechType,index:any) => {
                  return <Tooltip title={b.name} key={index}>
                    <img style={{margin:'5px'}} src={b.image} alt={b.name} height="35rem"/>
                  </Tooltip>
                })}
              </TableCell>
              <TableCell>
                {row.stackUsed.databases.map((d:TechType) => {
                  return <Tooltip title={d.name}>
                    <img style={{margin:'5px'}} src={d.image} alt={d.name} height="40rem"/>
                  </Tooltip>
                })}
              </TableCell>
              <TableCell>
                <Chip label={row.status} sx={{background:colorMap.get(row.status)[0],color:colorMap.get(row.status)[1]}}/>
              </TableCell>
              <TableCell>
                <Typography sx={{p:1}} fontSize={13} color="GrayText">
                  {row.description}
                </Typography>
              </TableCell>
            </TableRow>
          })}
        </TableBody>
      </Table>
      {rows && rows.length === 0 && <Box display="flex" alignItems="center" justifyContent="center" height="50vh" width="90vw">
            <Typography textAlign="center" fontSize={18}>No Projects Found.</Typography>
          </Box>}
    </TableContainer>
  )
}
