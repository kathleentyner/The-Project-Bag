//this component creates the post-tag obj. It represents a single tag assigned to a post  

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardLink, Table } from "reactstrap";
import { getProjectById } from "../../APIManagers/ProjectManager";
import { getAllYarn } from "../../APIManagers/YarnManager";
import { ManageProjectYarn } from "../ProjectYarn/ManageProjectYarn";
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import narrowlogo from '../Nav/narrowlogo.png'


export const ProjectYarn = () => {
    //state for posts and tags - watching id
    const [project, setProject] = useState({});
    const [yarns, setYarns] = useState([]);
    const { id } = useParams();


    // get the tags
    const getYarns = () => { //get all the tags for the post.
        getAllYarn().then(yarn => setYarns(yarn));
    };

    //get the posts

    const getProjects = () => { //the the post by post id
        getProjectById(id).then(singleProject => setProject(singleProject));
    };

    useEffect(() => { //load data into component
        getYarns();
        getProjects();
    }, []);

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


    return (<ThemeProvider theme={theme}>
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
                <Container >
                    <Container>
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
                <Typography

                    variant="h3"
                    align="center"
                    color="#545454"
                    gutterBottom
                >

                    {project.patternName}
                </Typography>

                <CardLink href={`/project/${id}`}>
                    Go back to my project
                </CardLink>

                <Typography

                    align="center"
                    color="#545454"
                    gutterBottom
                >

                   Choose Yarn From My Stash
                </Typography>
            </Container>
        </Box>

    
                        
                  

                            {yarns.map((yarn) => (
                                <ManageProjectYarn
                                    yarn={yarn}
                                    project={project}
                                    
                                />
                                
                            ))}
                
        
    </ThemeProvider>
    )
}
