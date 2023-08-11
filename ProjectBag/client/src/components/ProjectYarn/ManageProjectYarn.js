import React, { useState, useEffect } from "react";
import { addPY, deletePY } from "../../APIManagers/ProjectYarnManager";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Card from "@mui/material/Card";
import Typography from '@mui/material/Typography';
import { Box, CardActionArea} from '@mui/material';
import Button from '@mui/material/Button';


export const ManageProjectYarn = ({ yarn, project }) => {
  const navigate = useNavigate();
  const [yarnAdded, setYarnAdded] = useState(false);

  useEffect(() => {
    if (project.yarns) { // Check if project.yarns exists
      const isYarnAdded = project.yarns.some(pYarn => pYarn.id === yarn.id);
      setYarnAdded(isYarnAdded);
    }
  }, [project.yarns, yarn.id]);

  const savePY = () => {
    const newPY = {
      projectId: project.id,
      yarnId: yarn.id,
    };

    addPY(newPY)
      .then(() => {
        navigate(`/project/${project.id}`);
      });
  };

  const handleRemoveYarn = () => {
    const pjToRemove = {
      yarnId: yarn.id,
      projectId: project.id,
    };

    deletePY(pjToRemove)
      .then(() => {
        navigate(`/project/${project.id}`);
      });
  };
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
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row', 
          '& > :not(style)': {
            m: 1,
            width: 400,
            height: 350,
            paddingBottom: 20,
          },
        }}
      >      
        <Card sx={{ maxWidth:400} }   >
   <CardActionArea>

    <CardContent>
    <CardMedia
      component="img"
      height="200"
      width="200"
      image={yarn.yarnUrl}
      alt="yarn"
    />
    <Typography gutterBottom variant="h5" component="div">
        Brand: {yarn.brand}; Colorway: {yarn.color}
        </Typography>
   
        {yarnAdded ? (
          <Button onClick={handleRemoveYarn} variant="contained" color='secondary'>
            Remove
          </Button>
        ) : (
          <Button variant="contained" color='secondary' onClick={savePY}>
            Add Yarn
          </Button>
        )}
      </CardContent>
    </CardActionArea>
    </Card>
    </Box>
  </ThemeProvider>

  )
};

export default ManageProjectYarn;