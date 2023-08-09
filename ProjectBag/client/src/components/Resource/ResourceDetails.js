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
import {deleteResource, getResourceById } from "../../APIManagers/ResourceManager"
import {Alert } from "reactstrap";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


export const ResourceDetails = () => {
    const [resource, setResource] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
      getResourceById(id).then(setResource)
     
    }, [])
  
    if (!resource) {
      return null;
    }
    
  
    const handleDelete = () => {
      deleteResource(resource.id).then(() => {
        setShowAlert(false)
        navigate(`/resource`)
      });
    };
  
    const handleCancel = () => {
      setShowAlert(false) 
    }
  
    const deleteResourceAlert = () => {
      return (<>
      <Alert color="danger" key={'danger'}>
        Are you sure you want to delete this resource?
        <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
      </Alert>
      </>)
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

        <Typography gutterBottom variant="h5" component="div">
          {resource.type}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        <List sx={{ width: '100%', maxWidth: 700, bgcolor: 'background.paper' }}>
        <ListItemText primary="Description" secondary= {resource.description} />
       <ListItem>
       <Link to={resource.resourceUrl}>{resource.Title}</Link>
      </ListItem>
      </List>
      </Typography>
        <Button variant="contained" 
        padding={1} 
        align="center"  onClick={() => navigate(`/resource/edit/${resource.id}`)}>Edit</Button>
     
     <><Button
        variant="outline"
        align="center"
        padding={1}
        onClick={() => {
          setShowAlert(true);      
        }}> 
        Delete
      </Button>
        {showAlert && deleteResourceAlert()}
        </>

    </CardActionArea>
</Card>


        </Grid>      
       </Grid>
    )
    }
    