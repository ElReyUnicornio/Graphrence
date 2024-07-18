import { createSlice } from '@reduxjs/toolkit'

interface AppState {
    currentNode: number | null,
    articleModalOpen: boolean,
    documentModalOpen: boolean,
    selectedArticle: number | null,
    selectedDocument: number | null,
}

const initialState: AppState = {
    currentNode: null,
    articleModalOpen: false,
    documentModalOpen: false,
    selectedArticle: null,
    selectedDocument: null,
}

export const AppSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCurrentNode: (state, action) => {
            state.currentNode = action.payload
        },
        setArticleModalOpen: (state, action) => {
            state.articleModalOpen = action.payload
        },
        setDocumentModalOpen: (state, action) => {
            state.documentModalOpen = action.payload
        },
        setSelectedArticle: (state, action) => {
            state.selectedArticle = action.payload
        },
        setSelectedDocument: (state, action) => {
            state.selectedDocument = action.payload
        },
    },
});

export const { setCurrentNode, setArticleModalOpen, setDocumentModalOpen, setSelectedArticle, setSelectedDocument } = AppSlice.actions;

export default AppSlice.reducer;