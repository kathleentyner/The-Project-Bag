
import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllProjects, searchProjects} from "../../APIManagers/ProjectManager"
import { Project } from './Project';
import "./Project.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import narrowlogo from '../Nav/narrowlogo.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { CardActionArea} from '@mui/material';

//list out all the Projects, create projects, search projects 
export const ProjectList = (project) => {
   const [projects, setProjects] = useState([])
   const [ searchTerm, setSearchTerm] = useState("")
   const [ searchResults, setSearchResults ] = useState({})

   const handleSearchInput = (event) => {
       setSearchTerm(event.target.value)
   };

   const handleButtonClick = (event) => {
       event.preventDefault();

       searchProjects(searchTerm)
       .then((res) => {
           setSearchResults(res);
   })}
  

   const navigate = useNavigate()

   const getProjects = () => {
    getAllProjects().then(allProjects => setProjects(allProjects));
}

useEffect(() => {
  getProjects();
}, [])


const create = () => {
  navigate("/project/new")
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
            align='center'
          />
        </Box>

        <Typography variant='h5' align='center' color='#545454' paragraph>
          On My Needles
        </Typography>
        <Stack sx={{ pt: 4 }} direction='row' spacing={2} justifyContent='center'>
          <Box m={1} display='flex' justifyContent='center' alignItems='center' marginBottom={10}>
            <Button onClick={create}>
              Cast On a New Project
            </Button>
          </Box>
        </Stack>

        <form className='post-form'>
          <> <Typography gutterBottom variant='h6' color='#545454' component='div'>

             Search projects by yarn weight or fiber type
             </Typography>
             <Typography gutterBottom variant='body1' color='#545454' component='div'>
             Enter a fiber or yarn weight:
              <input
                type='text'
                id='searchTerm'
                value={searchTerm}
                onChange={handleSearchInput}
              />
            </Typography>
          </>
          <Button
            onClick={(clickEvent) => handleButtonClick(clickEvent)}
            variant='contained'
            color='primary'
            sx={{ bgcolor: '#545454', color: '#F2EEE3' }}
          >
            Search
          </Button>
        </form>

        {searchResults.length > 0 && (
          <>
           <Typography gutterBottom variant='h5' color='#545454' component='div' marginTop={10}>
        Search Results:
      </Typography> 
            <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            '& > :not(style)': {
              m: 1,
              width: 200,
              height: 250,
              paddingBottom: 20,
            },
          }}
        > <>
           
              {searchResults.map((project) => (

                
                <Card sx={{ maxWidth: 200, bgcolor: '#F2EEE3'}} key={project.id} >
                  <CardActionArea>
                    <CardMedia
                      component='img'
                      height='150'
                      width='150'
                      image={project.photoUrl}
                      alt='single project'
                    />
                    <CardContent onClick={() => navigate(`/project/${project.id}`)}
>
                      <Typography gutterBottom variant='body2' color='#545454' component='div'>
                      Pattern: {project.patternName}
                      </Typography>
                      
                      <Button
                        sx={{ align: 'center',  }}
                        variant='contained'
                        color='secondary'
                        onClick={() => navigate(`/project/${project.id}`)}
                      >
                        View
                      </Button>
                    </CardContent>
                  </CardActionArea>
                </Card>
             
              ))}
            </>   </Box>
          </>
        )}
 < Typography gutterBottom variant='h5' color='#545454' component='div'marginTop={10}>
                My Projects
               </Typography> 
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'row',
            '& > :not(style)': {
              m: 1,
              width: 400,
              height: 550,
              paddingBottom: 20,
              
            },
          } 
                }>
          {projects.map((project) => (
            <Card sx={{ maxWidth: 400, bgcolor: '#545454' }} key={project.id} >
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='400'
                  width='200'
                  image={project.photoUrl}
                  alt='single project'
                />
                <CardContent>
                  <Typography gutterBottom variant='h6' color='#F2EEE3' component='div'>
                    Pattern: {project.patternName}
                  </Typography>
                  <Typography variant='body1' color='#F2EEE3'>
                    By: {project.designer}
                  </Typography>
                  <Button
                    sx={{ align: 'center', margin: 2 }}
                    variant='contained'
                    color='secondary'
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    View
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  </ThemeProvider>
)};