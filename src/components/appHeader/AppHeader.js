import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchWeather } from '../weatherBoard/weatherBoardSlice.js';
import { MdLocationCity } from "react-icons/md";
import { FaMoon } from "react-icons/fa";

// import dropIcon from '../../assets/Vector.svg';
import './appHeader.scss';

const cityCoordinates = {
    'moscow': { lat: 55.7558, lon: 37.6176 },
    'saint-petersburg': { lat: 59.916668, lon: 30.25 },
    'novosibirsk': { lat: 55.0084, lon: 82.9357 },
    'sochi': { lat: 43.599998, lon: 39.730278 }
};


const AppHeader = () => {
    const dispatch = useDispatch();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    const handleCityChange = (event) => {
        const selectedCity = event.target.value;

        if (cityCoordinates[selectedCity]) {
            const { lat, lon } = cityCoordinates[selectedCity];
            dispatch(fetchWeather({ lat, lon }));
        }
    };
    const onChangeTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    return (
        <header className="app__header">
            <div className="app__header_block">
                <h1 className="app__header_title">
                    Current Weather
                </h1>
                <span className="app__header_iconTheme" onClick={onChangeTheme}><FaMoon /></span>
            </div>

            <div className="app__header_city-selector">
                <div className="app__header_icon">
                    <MdLocationCity size={45} />
                </div>
                <select className="app__header_select" name="city" onChange={handleCityChange}>
                    <option value="">Выбрать город</option>
                    <option value="moscow">Москва</option>
                    <option value="saint-petersburg">Санкт-Петербург</option>
                    <option value="novosibirsk">Новосибирск</option>
                    <option value="sochi">Сочи</option>
                </select>
            </div>
        </header>
    );
}

export default AppHeader;
