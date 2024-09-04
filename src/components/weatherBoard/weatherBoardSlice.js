import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCityWeather } from "../../services/useWeatherService.js";


const initialState = {
    weatherData: null,
    city: '',
    temp: '',
    max_temp: '',
    pop: '',
    pressure: '',
    wind: '',
    humidity: '',
    dscrWeather: '',
    weatheLoadingStatus: 'idle'
}

export const fetchWeather = createAsyncThunk(
    'weather/fetchWeather',
    async ({ lat, lon }) => {
        const response = await getCityWeather(lat, lon);
        // console.log(response);
        return response;
    }
)

const weatherBoardSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWeather.pending, (state) => {
                state.weatheLoadingStatus = 'loading'
                state.error = null;
            })
            .addCase(fetchWeather.fulfilled, (state, action) => {
                state.weatheLoadingStatus = 'loaded';
                state.weatherData = action.payload.data;
                state.city = action.payload.city_name;
                state.temp = action.payload.data[0].temp;
                state.max_temp = action.payload.data[0].max_temp;
                state.pressure = action.payload.data[0].pres;
                state.wind = action.payload.data[0].wind_spd;
                state.humidity = action.payload.data[0].rh;
                state.dscrWeather = action.payload.data[0].weather.description;
            })
            .addCase(fetchWeather.rejected, (state, action) => {
                state.weatheLoadingStatus = 'error';
                state.error = action.error.message;
            });
    },
});

const { actions, reducer } = weatherBoardSlice;
export default reducer;
export const {
    weatherFetch,
    weatherFetched
} = actions;