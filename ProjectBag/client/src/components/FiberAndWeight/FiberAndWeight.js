import Button from '@mui/material/Button';
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllWeights, deleteWeight } from '../../APIManagers/WeightManager';
import { FiberForm } from './FiberCreate';
import { WeightForm } from './WeightCreate';
import "./FiberAndWeight.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid'; // Grid version 1
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import {Alert } from "reactstrap";



//list out all the Fibers
export const FiberAndWeight = () => {
  //  const [fibers, setFibers] = useState([])
   const [weights, setWeights] = useState([])
//      const [fiber, update] = useState({
//      name: "",
    
//   })
  
//    const { fiberId } = useParams();
 
//   const navigate = useNavigate()
 
//   const getFibers = () => {
//     getAllFibers().then(fibers => setFibers(fibers));
// }

const getWeights = () => {
  getAllWeights().then(weights => setWeights(weights));
}
useEffect(() => {
  getFibers();
  getWeights()
}, [])


// useEffect(() => {
//   getFiberById(fiberId) //route param
//         .then((fiberArray)=>
//       {
//             update(fiberArray) 
//         })
// }, [fiberId]) //watch state - param


// const handleFiberDelete = () => {
//   deleteFiber(fiber.id).then(() => {    
//     navigate(`/notions`)
//   });
// };


// const handleWeightDelete = () => {
//   deleteWeight(weights.id).then(() => {
//     navigate(`/notions`)
//   });
// };


const theme = createTheme();
             
return (
  <div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Hero unit */}
      <Box sx={{ bgcolor: '#d7e4fc', pt: 8, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >Manage Fiber and Weight Categories
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Stay Organized
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
Add fiber and weight tags to projects and yarns to stay organized. 
</Stack>
        </Container>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
         </Box>
      </Box>
    </ThemeProvider>


  <Grid container spacing={2}justifyContent="center">
 
  <Grid xs={6} padding={6}  >
 <p>
     A yarn's weight is importnat to understand in order to meet a pattern's gauge. Here's a handy cheatsheet for estimateing a yarn's gauge. </p>

          <h3>Gauge Cheatsheet</h3>

          <p><b> Needle size 1-4 </b></p>
         <p>Lace: 8 or more stitches  = 1"; 
          Fingering: 7-8 stiches = 1" </p>

         <p><b> Needle Size 4-7 </b></p>
         <p> Sport: 6-6.75 stitches = 1"
          DK: 5.25-6 stitches = 1" </p>

         <p><b> Needle Size 7-9 </b></p>
          <p>Worsted: 4-5 stitches = 1"
          Aran: 4 stitches = 1" </p>

          <p><b> Needle Size 9-11 </b></p>
         <p>Bulky: 3-3.75 stitches = 1"</p>

         <p><b> Needle Size 11+ </b></p>
        <p>Super Bulky: less than 2.75 sts = 1"</p>    
      <Box> 
      {weights.map((weight) => {
        return (
         <section class = "fiberlist" key={weight.id}>
       <List>
          <ListItem disablePadding>
              <ListItemText primary={weight.name} />
  
          </ListItem>
        </List>
    
      </section>
   
        )})}
 </Box>
 <Button onClick={WeightForm}>
              Add A Yarn Weight
            </Button>
  </Grid>
</Grid>
    
 </div>
 )
    }