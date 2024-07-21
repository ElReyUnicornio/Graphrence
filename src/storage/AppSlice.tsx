import { createSlice } from '@reduxjs/toolkit'

interface AppState {
    currentNode: number | null,
    documentModalOpen: boolean,
    selectedDocument: number | null,
}

const initialState: AppState = {
    currentNode: null,
    documentModalOpen: false,
    selectedDocument: null,
}

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentNode: (state, action) => {
            state.currentNode = action.payload
        },
        setDocumentModalOpen: (state, action) => {
            state.documentModalOpen = action.payload
        },
        setSelectedDocument: (state, action) => {
            state.selectedDocument = action.payload
        },
    },
});

export const { setCurrentNode, setDocumentModalOpen, setSelectedDocument } = AppSlice.actions;

export default AppSlice.reducer;