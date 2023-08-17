
import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, Link, useParams} from "react-router-dom"
import {  getAllResources } from '../../APIManagers/ResourceManager';
import { Resource } from './Resource';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import narrowlogo from '../Nav/narrowlogo.png';
import video from './video.png'
import Wishlist from './Wishlist.png'
import Card from '@mui/material/Card';
import {Alert } from "reactstrap";


export const ResourceList = () => {
  const [resource, setResources] = useState([]);
  const navigate = useNavigate();

  const getResources = () => {
    getAllResources().then(resource => setResources(resource));
  }

  useEffect(() => {
    getResources();
  }, []);

  const create = () => {
    navigate("/resource/new");
  }

  const resourcesByType = {};

  resource.forEach((res) => {
    if (!resourcesByType[res.type]) {
      resourcesByType[res.type] = [];
    }
    resourcesByType[res.type].push(res);
  });

  const videoResources = [];
  const wishlistResources = [];

  Object.keys(resourcesByType).forEach((type) => {
    if (type === "Video") {
      videoResources.push(...resourcesByType[type]);
    } else if (type === "Wishlist") {
      wishlistResources.push(...resourcesByType[type]);
    }
  });

  


  const theme = createTheme({
    palette: {
      light: '#0494AD',
      main: '#00768B',
      dark: '#015362',

      background: {
        default: '#F2EEE3',
      },

      secondary: {
        main: "#00768B"
      }
    }
  });
  // Calculate the number of resource types per column
  const totalResourceTypes = Object.keys(resourcesByType).length;
  const resourceTypesPerColumn = Math.ceil(totalResourceTypes / 2);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
        <Container>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img
              alt='Project Bag logo'
              src={narrowlogo}
              width={800}
              align="center"
            />
          </Box>
          <Typography variant="h5" align="center" color="text.secondary" paragraph>
            Get Inspired
          </Typography>
          <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Box m={1} display="flex" justifyContent="center" alignItems="center" marginBottom={5}>
              <Button onClick={create}>
                Add A Resource
              </Button>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {/* Video Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingRight: '30px' }}>
          {Object.keys(resourcesByType).slice(0, resourceTypesPerColumn).map((type) => (
            <section key={type}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
                <img
                  alt='Project Bag logo'
                  src={video}
                  width={150}
                />
                <Typography variant="h5" align="center" color="#545454" gutterBottom>
                  {type} Library
                </Typography>
              </Box>

              {resourcesByType[type].map((res) => (
                <Card sx={{ maxWidth: 450, maxHeight: 5000, margin: 5, bgcolor: "#545454" }} key={res.id}>
                  <Typography gutterBottom variant='h6' padding={3} color='#F2EEE3' marginTop={2} marginBottom={1} component='div'>
                    Watch: <Link to={res.resourceUrl} style={{ color: '#38B6FF', fontFamily: 'sans-serif' }}> {res.title}</Link>
                  </Typography>

                  <Typography gutterBottom variant='body1' paddingLeft={3} paddingRight={3} marginBottom={2} color='#F2EEE3' component='div'>

                    Description: {res.description}
                  </Typography>

                  <Button sx={{ align: 'center', margin: 2 }} variant="contained" color='secondary'

                    onClick={() => navigate(`/resource/edit/${res.id}`)}
                  >
               Edit
                  </Button>
       
        
                </Card>
              ))}
            </section>
          ))}
        </Box>
        {/* Wishlist Column */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '30px' }}>
          {Object.keys(resourcesByType).slice(resourceTypesPerColumn).map((type) => (
            <section key={type}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 3 }}>
                <img
                  alt='Project Bag logo'
                  src={Wishlist}
                  width={200}
                />
                <Typography variant="h5" align="center" color="#545454" gutterBottom>
                  {type}
                </Typography>
              </Box>
              {resourcesByType[type].map((res) => (
                <Card sx={{ maxWidth: 450, maxHeight: 550, margin: 5, bgcolor: "#545454" }} key={res.id}>
                  <Typography gutterBottom variant='h6' padding={3} color='#F2EEE3' marginTop={2} marginBottom={1} component='div'>
                
                  Buy: <Link to={res.resourceUrl} style={{ color: '#38B6FF', fontFamily: 'sans-serif'}}>{res.title}</Link>
                    </Typography>
                    <Typography gutterBottom variant='body1' paddingLeft={3} paddingRight={3} marginBottom={2} color='#F2EEE3' component='div'>
                    Description: {res.description}
                  </Typography>
                  <Button sx={{ align: 'center', margin: 2 }} variant="contained" color='secondary'

onClick={() => navigate(`/resource/edit/${res.id}`)}
>
Edit
</Button> 
                </Card>
              ))}
            </section>
          ))}
        </Box>
      </Box>
    </ThemeProvider>
  )
}
