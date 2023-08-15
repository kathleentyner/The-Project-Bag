import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addProject, getAllProjects } from "../../APIManagers/ProjectManager"
import "./Form.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { getAllFibers } from "../../APIManagers/FiberManager";
import { getAllWeights } from "../../APIManagers/WeightManager";
import Typography from '@mui/material/Typography';
import narrowlogo from '../Nav/narrowlogo.png'
import Card from '@mui/material/Card';


export const ProjectForm = () => {
    const navigate = useNavigate()

    const [weights, setWeights] = useState([])
    const [fibers, setFibers] = useState([])

    const getFibers = () => {
        getAllFibers().then(allFibers => setFibers(allFibers));
    }
    const getWeights = () => {
        getAllWeights().then(allWeights => setWeights(allWeights));
    }

    useEffect(() => {
        getFibers()
        getWeights()
    }, [])


    const [project, update] = useState({
        patternName: "",
        designer: "",
        patternUrl: "",
        photoUrl: "",
        notes: "",
        startDate: Date.now(),
        endDate: Date.now(),
        fiberId: 0,
        weightId: 0,
        userId: 0

    })

    const handleSave = (event) => {
        event.preventDefault()

        const projectToAPI = {
            PatternName: project.patternName,
            Designer: project.designer,
            PatternUrl: project.patternUrl,
            PhotoUrl: project.photoUrl,
            Notes: project.notes,
            StartDate: new Date().toISOString(),
            EndDate: new Date().toISOString(),
            FiberId: project.fiberId,
            WeightId: project.weightId,
            UserId: 1

        }

        // how to navigate to the project I just created?
        return addProject(projectToAPI).then(navigate(`/project`))
    }
    //I've found this method to be very useful when needing to select an item then add it to the database
    const selectListFiber = (event) => {
        const copy = {
            ...project
        }
        copy.fiberId = event.target.value
        update(copy)
    }

    const selectListWeight = (event) => {
        const copy = {
            ...project
        }
        copy.weightId = event.target.value
        update(copy)
    }

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
                                

                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >    <Typography variant="h5" align="center" color="#545454" paragraph>
                            What's On Your Needles?
                        </Typography>

                    </Stack>
                </Container>
            </Box>        
             <Box
                sx={{
                    justifyContent: "center",
                    display: "flex"
                }}
            >
                <Card sx={{ bgcolor: '#F2EEE3', marginBottom: 10, padding: 5 }} bgcolor="#545454" >
                    <form style={{ width: 600, }}>
                        <Typography variant="h6" align="center" color="#545454" paragraph>

                            Fill out this form to add a new project.
                        </Typography>
                        < fieldset>

                            <div className="form-group">
                                <label htmlFor="description" >Pattern Name: </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={project.patternName}
                                    onChange={
                                        (event) => {
                                            const copy = { ...project }
                                            copy.patternName = event.target.value
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Designer:  </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={project.designer}
                                    onChange={
                                        (event) => {
                                            const copy = { ...project }
                                            copy.designer = event.target.value
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group" >
                                <label htmlFor="description">Link to Pattern:  </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={project.patternUrl}
                                    onChange={
                                        (event) => {
                                            const copy = { ...project }
                                            copy.patternUrl = event.target.value
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Add Your Needles and Project Notes:  </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={project.notes}
                                    onChange={
                                        (event) => {
                                            const copy = { ...project }
                                            copy.notes = event.target.value
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="fiber-select">Yarn Fiber Type: </label>
                                {/* Select that category from the list!! */}
                                <select id="type"
                                    value={
                                        project.fiberId
                                    }
                                    onChange={
                                        event => selectListFiber(event)
                                    }>
                                    <option value="0">Select the Fiber Type: </option>
                                    {
                                        fibers.map(fiber => {
                                            return <option value={fiber.id} key={
                                                fiber.id
                                            }>
                                                {
                                                    fiber.name
                                                }</option>
                                        })
                                    } </select>
                            </div>
                        </fieldset>


                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="weight-select">Yarn Weight </label>
                                {/* Select that category from the list!! */}
                                <select id="type"
                                    value={
                                        project.weightId
                                    }
                                    onChange={
                                        event => selectListWeight(event)
                                    }>
                                    <option value="0">Select the Yarn Weight </option>
                                    {
                                        weights.map(weight => {
                                            return <option value={weight.id} key={
                                                weight.id
                                            }>
                                                {
                                                    weight.name
                                                }</option>
                                        })
                                    } </select>
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description"> Project Photo:  </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={project.photoUrl}
                                    onChange={
                                        (event) => {
                                            const copy = { ...project }
                                            copy.photoUrl = event.target.value
                                            update(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>

                        <Button variant="contained" color='secondary' onClick={(clickEvent) => handleSave(clickEvent)} >
                            Submit
                        </Button>
                    </form>

                </Card>
            </Box>

        </ThemeProvider>
    </>
    )
}