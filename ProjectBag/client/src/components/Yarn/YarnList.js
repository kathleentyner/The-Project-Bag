
import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllYarn } from "../../APIManagers/YarnManager"
import { Yarn } from './Yarn';
import "./Yarn.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import narrowlogo from '../Nav/narrowlogo.png'


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
    <div>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {/* Hero unit */}
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
                    <Container >
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
                        
            <Typography variant="h5" align="center" color="#545454" paragraph>
             What's in My Yarn Stash
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button onClick={create}>
              Add A New Yarn
            </Button>
          </Box>           
           </Stack>
          </Container>
          
        </Box>
  
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
              <Typography variant="h5" align="center" color="#545454" fontFamily={'sans-serif'} paragraph>

                <Link to={`/yarn/${yarn.id}`}>{yarn.brand}</Link>
                </Typography>
                <Typography variant="h6" align="center" color="#545454" paragraph>

                Color: {yarn.color}
                </Typography>
                <CardMedia
      component="img"
      height="200"
      width="200"
      image={yarn.yarnUrl}
      alt="yarn"
    />
              </header>
             
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
        
              </Stack>
            </section>
          )})}
      </Box></ThemeProvider>
   </div>      

   )
      }