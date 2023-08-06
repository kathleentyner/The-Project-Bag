
import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllYarn, deleteYarn } from "../../APIManagers/YarnManager"
import { Yarn } from './Yarn';
import "./Yarn.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
//import ManageProjectYarn from '../ProjectYarn/ManageProjectYarn';


//list out all the reaction entries
export const YarnList = () => {
   const [yarn, setYarns] = useState([])

   const navigate = useNavigate()

   const getYarns = () => {
    getAllYarn().then(yarn => setYarns(yarn));
}

useEffect(() => {
  getYarns();
}, [])


const create = () => {
  navigate("/yarn/new")
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
            >
              Yarn Stash
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              My Yarn
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              {/* Your content here */}
            </Stack>
          </Container>
          <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button onClick={create}>
              Add A New Yarn
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
        {yarn.map((yarn) => {
          return (
            <section className="card" key={yarn.id}>
              <header>
                <h3><Link to={`/yarn/${yarn.id}`}>{yarn.brand}</Link></h3>
                <h3>Color: {yarn.color}</h3>
              </header>
             
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        
              </Stack>
            </section>
          )})}
      </Box>
   </div>
   )
      }