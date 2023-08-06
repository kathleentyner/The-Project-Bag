import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, } from "react-router-dom"
import { getAllFibers} from "../../APIManagers/FIberManager"
import "./FiberAndWeight.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


//list out all the Fibers
export const FiberList = (fiber) => {
   const [fibers, setFibers] = useState([])

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
          Selecting the right fiber for a project is just as critical as starting with the right needles to meet gauge. Wool holds heat and stays warm when wet. It makes a good choice for cold weather knits. Wool has excellent stitch definition and springiness. It provides stretch when knitting. Different animal fibers have different properties and "memory" or ability to hold its original shape. Cotton and other plant fibers produce a fabric with a loose drape and are heavier than wool. They are good choices for warm weather knits and an open gauge. 
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
      {fibers.map((fiber) => {
        return (
          <section className="card" key={fiber.id}>
            <header>
              <h3>Fiber Type: {fiber.name}</h3>
            </header>
           
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
      
            </Stack>
          </section>
        )})}
    </Box>
 </div>
 )
    }