
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

  const theme = createTheme();

  return (
    <div>
      {/* ... (ThemeProvider, CssBaseline, Box, Typography, and Button components) */}
  
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
        {Object.keys(resourcesByType).map((type) => (
          <section key={type}>
            <Typography variant="h5" color="text.primary" gutterBottom>
              {type} Resources
            </Typography>
            {resourcesByType[type].map((res) => (
              <div className="card" key={res.id}>
                <header>
                  <h3><Link to={res.resourceUrl}>{res.title}</Link></h3>
                  <p>Desctiption: {res.description}</p>
                  <Link to={`/resource/${res.id}`}>Manage Resource</Link>
                </header>
                {/* ... (Stack component) */}
              </div>
            ))}
          </section>
        ))}
      </Box>
    </div>
  );
}
