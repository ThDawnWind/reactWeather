import { configureStore } from '@reduxjs/toolkit';
import weatherBoard from '../components/weatherBoard/weatherBoardSlice.js';

const store = configureStore({
    reducer: {
        weather: weatherBoard
    },
    devTools: process.env.NODE_ENV !== 'production',
})

export default store;