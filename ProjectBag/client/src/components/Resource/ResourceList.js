
import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllResources } from '../../APIManagers/ResourceManager';
import { Resource } from './Resource';
import "./Yarn.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
//import ManageProjectYarn from '../ProjectYarn/ManageProjectYarn';
// ... (import statements)

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
             
     return (<>
  
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* Hero unit */}
          <Box sx={{   bgcolor: '#F2EEE3', pt: 8, pb: 6 }}>
            <Container maxWidth="lg">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="#545454"
                gutterBottom
              >
                Resource Library
              </Typography>
              <Typography variant="h5" align="center" color="#545454" paragraph>
                Get Inspired
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                {/* Your content here */}
              </Stack>
            </Container>
            <Box m={1} display="flex" justifyContent="center" alignItems="center">
              <Button   color='secondary' onClick={create}>
                Add a Resource
              </Button>
            </Box>
          </Box>
        
       
      <Box
        sx={{
          position: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: 800,
            height: 300,
            paddingBottom: 20,
            
          },
        }}
      >  
        {Object.keys(resourcesByType).map((type) => (
          <section key={type} >
            <Typography variant="h5"  align="center" color="#545454" gutterBottom>
              {type}
            </Typography>
            {resourcesByType[type].map((res) => (
              <div className="card" key={res.id}>
             
                <Typography  align="center" color="#545454" gutterBottom>

                  <Link to={res.resourceUrl}>{res.title}</Link>
                  Desctiption: {res.description}
                  </Typography>
                  <Button variant="contained" 
        padding={1} color='secondary'
        align="center" onClick={() => navigate(`/resource/edit/${resource.id}`)}>Manage</Button>
                
                <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center" >
      
      </Stack>
              </div>
            ))}
          </section>
        ))}
      </Box>
    </ThemeProvider> </>
  );
}
