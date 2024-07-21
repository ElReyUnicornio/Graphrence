import { Project } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ProjectsState {
    isBussy: boolean,
    projects: Project[]
}

export const getProjects = createAsyncThunk('getProjects', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
});

export const createProject = createAsyncThunk('createProject', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
});

export const deleteProject = createAsyncThunk('deleteProject', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
});

const initialState: ProjectsState = {
    isBussy: false,
    projects: [
        {
            uid: "1",
            name: "Proyecto 1",
            articleNumber: 3,
            lastUpdate: "Hace 2 días",
        },
        {
            uid: "2",
            name: "Proyecto 2",
            articleNumber: 5,
            lastUpdate: "Hace 3 días",
        },
        {
            uid: "3",
            name: "Proyecto 3",
            articleNumber: 1,
            lastUpdate: "Hace 4 días",
        },
    ]
}

export const ProjectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProjects.pending, (state) => {
            state.isBussy = true
        })
        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.isBussy = false
            state.projects = action.payload
        })
    }
});

export const { setProjects } = ProjectsSlice.actions;

export default ProjectsSlice.reducer;