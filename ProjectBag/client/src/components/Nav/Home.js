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
        <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
              color={"#00768B"}
            >
              <Button color="secondary" href="/project"variant="contained" > On the Needles</Button>
              <Button color="secondary" href="/yarn" variant="contained" >View Your Stash</Button>
              <Button color="secondary" href="/resources" variant = "contained" >Get Inspired</Button>
            </Stack>
         

    </ThemeProvider>

  );
}