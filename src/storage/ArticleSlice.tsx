import { Article } from "@/types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface ArticlesState {
    isBussy: boolean,
    articles: Article[]
}

export const getArticles = createAsyncThunk('getArticles', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
});

export const createArticle = createAsyncThunk('createArticle', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
});

export const searchArticle = createAsyncThunk('deleteArticle', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
});

export const getBookArticle = createAsyncThunk('deleteArticle', async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts')
    return response.json()
});

const initialState: ArticlesState = {
    isBussy: false,
    articles: [
        {
            uid: '1',
            name: "Artículo 1",
            relations: ['2', '3', '4']
        },
        {
            uid: '2',
            name: "Artículo 2",
            relations: ['4', '6']
        },
        {
            uid: '3',
            name: "Artículo 3",
            relations: ['5', '4']
        },
        {
            uid: '4',
            name: "Artículo 4",
            relations: ['6']
        },
        {
            uid: '5',
            name: "Artículo 5",
            relations: ['6', '2']
        },
        {
            uid: '6',
            name: "Artículo 6",
            relations: []
        }
    ]
}

export const ArticlesSlice = createSlice({
    name: 'articles',
    initialState,
    reducers: {
        setArticles: (state, action) => {
            state.articles = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getArticles.pending, (state) => {
            state.isBussy = true
        })
        builder.addCase(getArticles.fulfilled, (state, action) => {
            state.isBussy = false
            state.articles = action.payload
        })
    }
});

export const { setArticles } = ArticlesSlice.actions;

export default ArticlesSlice.reducer;