import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllWeights} from '../../APIManagers/WeightManager';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid'; // Grid version 1
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

//list out all the Fibers
export const WeightList = () => {
   const [weight, setWeight ] = useState([])


 
 const navigate = useNavigate()

 const getWeight = () => {
    getAllWeights().then(weights => setWeight(weights));
}

useEffect(() => {
  getWeight();
}, [])

const create = () => {
  navigate("/weight/new")
}

const theme = createTheme({

  palette: {
    primary: {
      light: '#0494AD',
      main: '#00768B',
      dark: '#015362',
      main: '#0494AD'
    },
  },
});             
return (
  <div>
  <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Hero unit */}
      <Box sx={{   bgcolor: '#F2EEE3',
            pt: 8,
            pb: 6,
            color: "#545454"}}>
        <Container maxWidth="lg">
          <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="#545454"
                  gutterBottom
          >Manage Weight Categories
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Select the yarn weight for your project to produce the perfect fit
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          Add yarn weight categories to projects and yarns to stay organized. 
        </Stack>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button onClick={create} color="primary" variant="contained" >
              Add A New Yarn Weight Category
            </Button>
          </Box>
        </Container>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
         </Box>
      </Box>

  <Grid xs={6} padding={6}>

<Box><p>A yarn's weight is important to understand in order to meet a pattern's gauge. Here's a handy cheatsheet for estimateing a yarn's gauge. </p>

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
</Box>


{weight.map((weight) => {
return (
 
    <section classname = "fiberlist" key={weight.id}>
  <List>
     <ListItem disablePadding>
         <Link to={`/weight/${weight.id}`}>{weight.name}</Link>
         
     </ListItem>
   </List>
  
 </section>

)})}
</Grid>
</ThemeProvider>

 </div>
 )
    }