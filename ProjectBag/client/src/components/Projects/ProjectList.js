
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
              What I'm Working On
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              My Projects
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
              {/* Your content here */}
            </Stack>
          </Container>
          <Box m={1} display="flex" justifyContent="center" alignItems="center">
            <Button onClick={create}>
              Cast On a New Project
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
        {projects.map((project) => {
          return (
            <section className="card" key={project.id}>
              <header>
                <h3><Link to={`/project/${project.id}`}>{project.patternName}</Link></h3>
                <h3>Pattern by: {project.designer}</h3>
              </header>
              <CardMedia
                component="img"
                height="300"
                width="300"
                image={project.photoUrl}
                alt="projects"
              />
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                {/* <Button variant="contained" padding={1} align="center" href={`/project/${project.id}/edit`}>
                  Edit
                </Button>
 */}
              </Stack>
            </section>
          );
        })}
      </Box>
    </div>
  );
    } 