import * as React from 'react';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia';
import narrowlogo from './narrowlogo.png'
import library from './library.png'
import projects from './projects.png'
import yarn from './yarn.png'


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


export const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    

        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '#F2EEE3',
            pt: 8,
            pb: 6,
          }}
        >
       
          <Box
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
       </Container>
        </Box>
        </Box>
        <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <Box>
          <img
            alt="yarn weight chart"
            src={projects}
            width={200}
            align="center"
            paddingBottom={6}
          />
          <Button color="secondary" align='center' href="/project" variant="contained">
            On the Needles
          </Button>
        </Box>

        <Box>
          <img
            alt="yarn weight chart"
            src={yarn}
            align="center"
            width={200}
            paddingBottom={6}
          />
          <Button color="secondary" position='center' href="/yarn" variant="contained">
            View Your Stash
          </Button>
        </Box>

        <Box>
          <img
            alt="yarn weight chart"
            src={library}
            width={200}
            align="center"
            paddingBottom={6}
          />
          <Button color="secondary" align='center'  href="/resources" variant="contained">
            Get Inspired
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}