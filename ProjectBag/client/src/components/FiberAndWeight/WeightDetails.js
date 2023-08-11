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
    const [showAlert, setShowAlert] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate();
   
  
    useEffect(() => {
      getWeightById(id).then(setWeight)
     
    }, [])
  
    if (!weight) {
      return null;
    }
    
  
    const handleDelete = () => {
      deleteWeight(weight.id).then(() => {
        setShowAlert(false)
        navigate(`/weight`)
      });
    };
  
    const handleCancel = () => {
      setShowAlert(false) 
    }
  
    const deleteWeightAlert = () => {
      return (<>
      <Alert color="danger" key={'danger'}>
        Are you sure you want to delete this yarn weight?
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
        <Card sx={{ maxWidth:800} }  display ="flex">
  
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {weight.name}
        </Typography>
               
    <Button
        variant="contained"
        align="center"
        padding={1}
        color="primary"
        onClick={() => {
          setShowAlert(true);      
        }}> 
        Delete
      </Button>
        {showAlert && deleteWeightAlert()}

      </CardContent>

</Card>


        </Grid>      
       </Grid>
       </ThemeProvider>
    )
    }