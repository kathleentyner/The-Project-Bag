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
import {deleteFiber, getFiberById } from "../../APIManagers/FiberManager"
import {Alert } from "reactstrap";
import Box from '@mui/material/Box';

import Grid from '@mui/material/Grid';
import narrowlogo from '../Nav/narrowlogo.png';


export const FiberDetails = () => {
    const [fiber, setFiber] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
      getFiberById(id).then(setFiber)
     
    }, [])
  
    if (!fiber) {
      return null;
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
          }
    }});
    
    return (
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
          justify='center'
  
        >
          <Container>
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
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
Manage Fiber            </Typography>
        
        
  
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
        <Card sx={{ maxWidth:800, bgcolor: '#545454', } }  display ="flex">
  
      <CardContent>
        <Typography gutterBottom variant="h5" color='#F2EEE3' component="div">
          {fiber.name}
        </Typography>
               
        <Button sx={{  margin: 3 }} variant="contained" 
        padding={5} 
        align="center" color='secondary' onClick={() => navigate(`/fiber/edit/${fiber.id}`)}>Edit</Button>
     


      </CardContent>

</Card>


        </Grid>      
       </Grid>
       
       </ThemeProvider>
    )
    }