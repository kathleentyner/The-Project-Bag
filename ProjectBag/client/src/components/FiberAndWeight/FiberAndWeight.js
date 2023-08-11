import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAllWeights, deleteWeight, addWeight } from '../../APIManagers/WeightManager';
import { getAllFibers } from '../../APIManagers/FIberManager';

import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import narrowlogo from '../Nav/narrowlogo.png';
import weight from './weight.jpg'

export const FiberAndWeight = () => {
  const [fibers, setFibers] = useState([]);
  const [weights, setWeights] = useState([]);
  const navigate = useNavigate()

  const getFibers = () => {
    getAllFibers().then(fibers => setFibers(fibers));
  };

  const getWeights = () => {
    getAllWeights().then(weights => setWeights(weights));
  };

  useEffect(() => {
    getFibers();
    getWeights();
  }, []);

  const create = () => {
    navigate("/weight/new")
  }

  const createFiber = () => {
    navigate("/fiber/new")
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
            Add fiber and weight tags to your projects and yarns to stay organized
          </Typography>
        </Container>
      </Box>
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <Box>               
             <Typography variant="body1" bgcolor='#F2EEE3' padding={5}
color="#545454" paragraph>

            <p>
              Selecting the right fiber for a project is just as critical as starting with the right needles to meet gauge. <b>Animal Fibers</b>, like sheeps wool, holds heat and stays warm when wet. It makes a good choice for cold weather knits. Wool has excellent stitch definition and springiness. It provides stretch when knitting. Different animal fibers have different properties and "memory" or ability to hold its original shape.
            </p>
            <p><b>Plant fibers</b> like cotton, hemp, and bamboo produce a fabric with a loose drape and are heavier than wool. They are good choices for warm weather knits and an open gauge.</p>
        </Typography>


        <Typography paddingLeft={6} paddingBottom={3} variant="h4" align="left" color="#545454" fontFamily={'sans-serif'} >
              Fiber Types
              </Typography>
         </Box>
         {fibers.map((fiber) => {
          return (
            <section className="list" key={fiber.id}>
            <header>
            <Typography paddingLeft={6} paddingBottom={3} align="left" color="#545454" fontFamily={'sans-serif'} >

                {fiber.name}
                </Typography>
                </header>
                </section>)
  })
} <Button onClick={createFiber} variant="contained" paddingLeft={8} padding={6} align="center" color='secondary'>
              Add A New Fiber Category
            </Button>

        </Grid>

        <Grid item xs={6}>
          <Box>    <Typography variant="body1" bgcolor='#F2EEE3' padding={5}
          color="#545454" paragraph>
            <p>A yarn's weight is important to understand in order to meet a pattern's gauge. Read on to learn more about choosing the right yarn for your project.</p>
            </Typography> 
          
<Typography paddingLeft={6} paddingBottom={3} variant="h4" align="left" color="#545454" fontFamily={'sans-serif'} >


My Yarn Weights
  
  </Typography> 
  
 
  </Box>
  <Grid item xs={6}>

  {weights.map((weight) => {
          return (
            <section className="list" key={weight.id}>
            <header>
              <Typography paddingLeft={6} paddingBottom={3} align="left" color="#545454" fontFamily={'sans-serif'} >
              
                {weight.name}
                </Typography>
                </header>
                </section>)
  })
}  <Button onClick={create} variant="contained" paddingLeft={8} padding={6} align="center" color='secondary' >
              Add A New Weight
            </Button>
            </Grid>
<Grid>
  <Box
            sx={{
              display: 'flex',
              justifyContent: "center"
            }}
          >
            <img
              alt='yarn weight chart'
              src={weight}
              width={300}
              align='center'
              paddingBottom={6}
            />
            </Box>
         
      </Grid>
      </Grid>
      </Grid>
    </ThemeProvider>
  );
};
