import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { CardActionArea} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {deleteFiber, getFiberById } from "../../APIManagers/FIberManager"
import {Alert } from "reactstrap";
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


export const FiberDetails = () => {
    const [fiber, setFiber] = useState();
    const [showAlert, setShowAlert] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
      getFiberById(id).then(setFiber)
     
    }, [])
  
    if (!fiber) {
      return null;
    }
    
  
    const handleDelete = () => {
      deleteFiber(fiber.id).then(() => {
        setShowAlert(false)
        navigate(`/fiber`)
      });
    };
  
    const handleCancel = () => {
      setShowAlert(false) 
    }
  
    const deleteFiberAlert = () => {
      return (<>
      <Alert color="danger" key={'danger'}>
        Are you sure you want to delete {fiber.name} from your fiber catagories?
        <br></br><Link onClick={handleDelete}>Yes</Link> / <Link onClick={handleCancel}>No</Link>
      </Alert>
      </>)
    }
    const theme = createTheme({

      palette: {
        primary: {
          light: '#0494AD',
          main: '#00768B',
          dark: '#015362',
         
        },
      },
    });
    
    return (
      <ThemeProvider theme={theme}>
      <CssBaseline />

        <Box
      sx={{
        bgcolor: '#F2EEE3',
        pt: 8,
        pb: 6,
        color: "#545454"
      }}
    >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="#545454"
              gutterBottom
            >
            Manage Fiber Catagories
            </Typography>
            
          </Container>
        </Box>         
        
        <Grid
        container
        spacing={6}
        direction="column"
        alignItems="center"
        justify="center"
        marginTop={8}
        style={{ minHeight: '100vh' }}
       >
        <Grid item xs={3}>
        <Card sx={{ maxWidth:800} }  display ="flex">
  
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {fiber.name}
        </Typography>
               
    <Button
        variant="contained"
        align="center"
        color="primary"
        padding={1}
        onClick={() => {
          setShowAlert(true);      
        }}> 
        Delete
      </Button>
        {showAlert && deleteFiberAlert()}

      </CardContent>

</Card>


        </Grid>      
       </Grid>
       </ThemeProvider>
    )
    }