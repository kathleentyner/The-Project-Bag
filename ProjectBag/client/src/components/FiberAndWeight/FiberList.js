import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getAllFibers} from '../../APIManagers/FIberManager';
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
export const FiberList = () => {
   const [fiber, setFibers ] = useState([])


 
 const navigate = useNavigate()

 const getFibers = () => {
    getAllFibers().then(fibers => setFibers(fibers));
}

useEffect(() => {
  getFibers();
}, [])

const create = () => {
  navigate("/fiber/new")
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
          >Manage Fiber Categories
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Choose the right fiber for your project
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          You can assign fibers to your projects and yarn when creating or editing a yarn/project.        </Stack>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button onClick={create} color="primary" variant="contained">
              Add A New Fiber Category
            </Button>
          </Box>
        </Container>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
         </Box>
      </Box>

  <Grid xs={6} padding={6}>
  <Box    
    >  <p>
      Selecting the right fiber for a project is just as critical as starting with the right needles to meet gauge. <b>Wool</b> holds heat and stays warm when wet. It makes a good choice for cold weather knits. Wool has excellent stitch definition and springiness. It provides stretch when knitting. Different animal fibers have different properties and "memory" or ability to hold its original shape. 
    </p>
    <p> <b>Plant fibers</b> like cotton, hemp, and bamboo produce a fabric with a loose drape and are heavier than wool. They are good choices for warm weather knits and an open gauge. </p>
     </Box>
     
      {fiber.map((fiber) => {
        return (
         <section classname = "fiberlist" key={fiber.id}>
       <List>
          <ListItem disablePadding>
              <Link to={`/fiber/${fiber.id}`}>{fiber.name}</Link>
              
          </ListItem>
        </List>
       
      </section>
   
        )})}

        </Grid>
        </ThemeProvider>

 </div>
 )
    }