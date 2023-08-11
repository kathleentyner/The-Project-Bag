import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {deleteProject, getProjectById } from "../../APIManagers/ProjectManager"
import {Alert } from "reactstrap";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import narrowlogo from '../Nav/narrowlogo.png'
import { common } from "@mui/material/colors";



export const ProjectDetails = () => {
    const [project, setProject] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
      getProjectById(id).then(setProject)
    
    }, [])
  
    if (!project) {
      return null;
    }
    
  
    const handleDelete = () => {
      deleteProject(project.id).then(() => {
        setShowAlert(false)
        navigate(`/project`)
      });
    };
  
    const handleCancel = () => {
      setShowAlert(false) 
    }
  
    const deleteProjectAlert = () => {
      return (<>
      <Alert color="danger" key={'danger'}>
        Are you sure you want to delete this project?
        <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
      </Alert>
      </>)
    }
    const theme = createTheme({
      palette: {
          light: '#0494AD',
          main: '#00768B',
          dark: '#015362',
       
          background: {
          default: '#F2EEE3',
          },
    
          secondary:{
            main: "#00768B"
          },
          primary: {
            main: "#545454"
          }
    }
 
  });


    return (<>
      <ThemeProvider theme={theme}>
                <CssBaseline />
          
            
                <Box
                 sx={{
                  bgcolor: '#F2EEE3',
                  pt: 8,
                  pb: 6,
              }}
       
              display='flex'
              alignItems='center'
              justify='center'>
                    <Container >
                    <Container >
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: "center"
                            }}
                        >
                            <img
                                alt='Project Bag logo'
                                src={narrowlogo}
                                width={800}
                                align="center"

                            />
                        </Box>
                        </Container>
              
                <Typography variant="h5" align="center" color="#545454"  paragraph>
                What's On My Needles
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                </Stack>
              </Container>
            </Box>         
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: '100vh' }}
       >
      
        <Grid item xs={3}>
        <Card sx={{ maxWidth:800} }  display ="flex">
   <CardActionArea>

      <CardMedia
        component="img"
        height="600"
        image={project.photoUrl} 
        alt= "single project"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" color="#545454" component="div">
          {project.patternName}
        </Typography>
        <Typography variant="body2" color="#545454">
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: '#F2EEE3' }}>
                      <ListItem sx={{ bgcolor: '#F2EEE3' }}>
                        <ListItemText sx={{color:"#545454"}} primary="Designer" color="#545454" secondary={project.designer} />
                      </ListItem>
                      <ListItem sx={{ bgcolor: '#F2EEE3' }}>
                      <ListItemText sx={{color:"#545454"}} primary="Pattern Name" color="#545454" secondary=<Link sx={{color:"#545454"}} to={project.patternUrl} style={{ color: '#545454' }}>{project.patternName}</Link> />
 
                      </ListItem>
                      <ListItem sx={{ bgcolor: '#F2EEE3' }}>
                        <ListItemText sx={{color:"#545454"}} primary="Needles Used and Notes" color="#545454" secondary={project.notes} />
                      </ListItem>
                      <ListItem sx={{ bgcolor: '#F2EEE3' }}>
                        <ListItemText sx={{color:"#545454"}} primary="Fiber" color="#545454" secondary={project.fiberTag.name} />
                      </ListItem>
                      <ListItem sx={{ bgcolor: '#F2EEE3' }}>
                        <ListItemText sx={{color:"#545454"}} primary="Weight" color="#545454" secondary={project.weightTag.name} />
                      </ListItem>
                      <ListItem sx={{ bgcolor: '#F2EEE3' }}>
                        <ListItemText sx={{color:"#545454"}}
                          primary="Yarn Brand & Color"
                          color="#545454"
                          secondary={project.yarns.map((yarn) => (
                            <p>
                              <b>Brand: </b>
                              {yarn.brand}; <b>Colorway: </b> {yarn.color}
                            </p>
                          ))}
                        />
                      </ListItem>
                    </List>
        </Typography>
        <Button variant="contained" 
        padding={1} color='secondary'
        align="center"  onClick={() => navigate(`/manageyarn/${id}`)}>Manage Yarn</Button>


        <Button variant="contained" 
        padding={1} color='secondary'
        align="center"  onClick={() => navigate(`/project/edit/${project.id}`)}>Edit</Button>
     
     <><Button
        variant="outline"
        align="center"
        padding={1}
        color='secondary'
        onClick={() => {
          setShowAlert(true);      
        }}> 
        Delete
      </Button>
        {showAlert && deleteProjectAlert()}
        </>
      </CardContent>
    </CardActionArea>
</Card>


        </Grid>      
       </Grid>
       </ThemeProvider>
       </>
    )
    }