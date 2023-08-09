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


const cards = [1, 2, 3, 4, 5, 6];

const theme = createTheme();

export const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: '#d7e4fc',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="lg">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
            The Project Bag
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Organize and Inspire
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button href="/projects"variant="contained">On the Needles</Button>
              <Button href="/yarn" variant="contained">View Your Stash</Button>
              <Button href="/resources" variant = "contained">Get Inspired</Button>
            </Stack>
          </Container>
        </Box>
       
         
      </main>
    </ThemeProvider>

  );
}