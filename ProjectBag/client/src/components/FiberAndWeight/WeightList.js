import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, } from "react-router-dom"
import { getAllWeights} from "../../APIManagers/FIberManager"
import "./FiberAndWeight.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//list out all the Fibers
export const WeightList = (weight) => {
   const [weights, setWeights] = useState([])

   const navigate = useNavigate()

   const getWeights = () => {
    getAllWeights().then(weights => setWeights(weights));
}

useEffect(() => {
  getWeights();
}, [])


const create = () => {
  navigate("/weight/new")
}
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
          >Manage My Fiber and Weight Tags
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Stay Organized
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
          
            Gauge Cheatsheet:

            Lace: 8 or more stitches  = 1" 
            Fingering: 7-8 stiches = 1" 
            Sport: 6-6.75 stitches = 1"
            DK: 5.25-6 stitches = 1" 
            Worsted: 4-5 stitches = 1"
            Aran: 4 stitches = 1" 
            Bulky: 3-3.75 stitches = 1" 
            Super Bulky: less than 2.75 sts  = 1"    

          </Stack>
        </Container>
        <Box m={1} display="flex" justifyContent="center" alignItems="center">
          <Button onClick={create}>
            Add A New Fiber Type
          </Button>
        </Box>
      </Box>
    </ThemeProvider>

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 300,
          height: 800,
          paddingBottom: 20,
        },
      }}
    >  
      {weights.map((weight) => {
        return (
          <section className="card" key={weight.id}>
            <header>
              <h3>Yarn Weight: {weight.name}</h3>
            </header>
           
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
      
            </Stack>
          </section>
        )})}
    </Box>
 </div>
 )
    }