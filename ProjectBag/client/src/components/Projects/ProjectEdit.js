import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editProject, getProjectById } from "../../APIManagers/ProjectManager"
import "./Form.css"
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import { getAllFibers } from "../../APIManagers/FiberManager";
import { getAllWeights } from "../../APIManagers/WeightManager";
import narrowlogo from '../Nav/narrowlogo.png'
import Card from '@mui/material/Card';



export const ProjectEdit = () => {
    const navigate = useNavigate()
    const { projectId } = useParams();
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


    const [editedProject, updateProject] = useState({
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
    useEffect(() => {
        getProjectById(projectId)
            .then((projects) => {
                updateProject(projects)
            })
    }, [projectId]);

    const handleSave = (event) => {
        event.preventDefault()
        const projectToEdit = {
            Id: parseInt(projectId),
            PatternName: editedProject.patternName,
            Designer: editedProject.designer,
            PatternUrl: editedProject.patternUrl,
            PhotoUrl: editedProject.photoUrl,
            Notes: editedProject.notes,
            StartDate: editedProject.startDate,
            EndDate: editedProject.endDate,
            FiberId: editedProject.fiberId,
            WeightId: editedProject.weightId,
            UserId: editedProject.userId
        }
        return editProject(projectToEdit)
            .then(() => {
                navigate(`/project/${editedProject.id}`)
            })
    }
    //I've found this method to be very useful when needing to select an item then add it to the database
    const selectListFiber = (event) => {
        const copy = {
            ...editedProject
        }
        copy.fiberId = event.target.value
        updateProject(copy)
    }

    const selectListWeight = (event) => {
        const copy = {
            ...editedProject
        }
        copy.weightId = event.target.value
        updateProject(copy)
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
                    <Container m>
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
                    <Typography variant="h5" align="center" color="#545454" paragraph>
                        Edit your {editedProject.patternName}
                    </Typography>
                    <Stack
                        sx={{ pt: 4 }}
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                    >
                    </Stack>
                </Container>
            </Box>   <Box
                sx={{
                    justifyContent: "center",
                    display: "flex"
                }}
            >
                <Card sx={{ bgcolor: '#F2EEE3', marginBottom: 10, padding: 5 }} bgcolor="#545454" >
                    <form style={{ width: 600, }}>
                        <Typography variant="h6" align="center" color="#545454" paragraph>
                            Update your project's details.
                        </Typography>
                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Pattern Name: </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={editedProject.patternName}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedProject }
                                            copy.patternName = event.target.value
                                            updateProject(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Designer: </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={editedProject.designer}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedProject }
                                            copy.designer = event.target.value
                                            updateProject(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="description">Link to Pattern: </label>
                                <input
                                    required autoFocus
                                    type="text"
                                    className="form-control"
                                    value={editedProject.patternUrl}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedProject }
                                            copy.patternUrl = event.target.value
                                            updateProject(copy)
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
                                    value={editedProject.notes}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedProject }
                                            copy.notes = event.target.value
                                            updateProject(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>

                        <fieldset>
                            <div className="form-group">
                                <label htmlFor="fiber-select">Yarn Fiber Type </label>
                                {/* Select that category from the list!! */}
                                <select id="type"
                                    value={
                                        editedProject.fiberId
                                    }
                                    onChange={
                                        event => selectListFiber(event)
                                    }>
                                    <option value="0">Select the Fiber Type </option>
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
                                        editedProject.weightId
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
                                    value={editedProject.photoUrl}
                                    onChange={
                                        (event) => {
                                            const copy = { ...editedProject }
                                            copy.photoUrl = event.target.value
                                            updateProject(copy)
                                        }
                                    } />
                            </div>
                        </fieldset>


                        <Button variant="contained" color='secondary' onClick={(clickEvent) => handleSave(clickEvent)} >
                            Save
                        </Button>

                    </form>

                </Card>
            </Box>

        </ThemeProvider>
    </>
    )
}