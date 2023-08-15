import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {deleteWeight, getWeightById } from "../../APIManagers/WeightManager"
import {Alert } from "reactstrap";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from "@mui/material/Container";

export const WeightDetails = () => {
    const [weight, setWeight] = useState();
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
      getWeightById(id).then(setWeight)
     
    }, [])
  
    if (!weight) {
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
            Manage Yarn Weight Catagories
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
        <Card sx={{ maxWidth:800, bgcolor: '#545454', } }  display ="flex">
  
      <CardContent>
        <Typography gutterBottom variant="h5" color='#F2EEE3'component="div">
          {weight.name}
        </Typography>
               
        <Button sx={{  margin: 3 }} variant="contained" 
        padding={5} 
        align="center" color='secondary' onClick={() => navigate(`/weight/edit/${weight.id}`)}>Edit</Button>
     



      </CardContent>

</Card>


        </Grid>      
       </Grid>
       </ThemeProvider>
    )
    }