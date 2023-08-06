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
  
    const deleteButton = () => {
     
        return 
      }
    
 
  
    
  
    return (
        
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
        height="140"
        image={project.photoUrl} 
        alt= "single project"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {project.patternName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
        <ListItemText primary="Designer" secondary= {project.designer} />
        <ListItem>
        <ListItemText primary="Pattern" secondary={project.patternUrl} />
      </ListItem>
      <ListItem>
    <ListItemText primary="Notes" secondary={project.notes} />
      </ListItem>
      <ListItem>
      <ListItemText primary="Start Date" secondary= {project.startDate} />
      </ListItem>
        <ListItem>
        <ListItemText primary="Finished" secondary=  {project.endDate} />
      </ListItem>
      <ListItem>
    <ListItemText primary="Fiber" secondary= {project.fiberTag.name} />
      </ListItem>
      <ListItem> 
      <ListItemText primary="Weight" secondary= {project.weightTag.name} />
      </ListItem>
      <ListItem> 
      <ListItemText primary="Yarn Brand & Color" secondary= {project.yarns.map((yarn) => <p><b> Brand: </b>{yarn.brand}; <b>Colorway: </b>  {yarn.color} </p>)} />
      </ListItem>
    
    </List>
        </Typography>
        <Button variant="contained" 
        padding={1} 
        align="center"  onClick={() => navigate(`/manageyarn/${id}`)}>Manage Yarn</Button>


        <Button variant="contained" 
        padding={1} 
        align="center"  onClick={() => navigate(`/project/edit/${project.id}`)}>Edit</Button>
     
     <><Button
        variant="outline"
        align="center"
        padding={1}
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
    )
    }