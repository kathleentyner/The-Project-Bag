
import Button from '@mui/material/Button';
import { useEffect, useState, } from "react"
import { useNavigate, Link } from "react-router-dom"
import { getAllProjects, deleteProject } from "../../APIManagers/ProjectManager"
import { Project } from './Project';
import "./Project.css"
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import narrowlogo from '../Nav/narrowlogo.png'


//list out all the reaction entries
export const ProjectList = (project) => {
   const [projects, setProjects] = useState([])

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
           
   return (<>

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
              justify='center'>
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
            On My Needles            
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
            <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button onClick={create}>
              Cast On a New Project
            </Button>
          </Box>            </Stack>
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
        {projects.map((project) => {
          return (

            <section className="card" key={project.id}>
              <header>
              <Typography variant="h5" align="center" color="#545454" fontFamily={'sans-serif'} paragraph>

               <Link to={`/project/${project.id}`}>{project.patternName} </Link>
               </Typography>

               <Typography variant="h6" align="center" color="#545454" paragraph>

                Pattern by: {project.designer}

                </Typography>
              </header>
              <CardMedia
                component="img"
                height="200"
                width="200"
                image={project.photoUrl}
                alt="projects"
              />
             
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center" >
      
              </Stack>
            </section>
          );
        })}
      </Box>
      </ThemeProvider>
      </>
 
     
     );
    } 