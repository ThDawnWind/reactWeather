import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherBoardSlice.js';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import Spinner from '../spinner/Spinner.js';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as TempIcon } from '../../assets/icons/temp.svg';
import { ReactComponent as PressureIcon } from '../../assets/icons/pressure.svg';
import { ReactComponent as RainIcon } from '../../assets/icons/Group.svg';
import { ReactComponent as WindIcon } from '../../assets/icons/wind.svg';
import { ReactComponent as CloudyIcon } from '../../assets/icons/Cloudy.svg';
import { ReactComponent as RainyIcon } from '../../assets/icons/rain.svg';
import { ReactComponent as RainSunIcon } from '../../assets/icons/small_rain_sun.svg';

import './weatherBoard.scss';

const BounceAnimation = keyframes`${fadeIn}`;

const FadeDiv = styled.div`
  animation: 2s ${BounceAnimation};
`;

const WeatherBoard = () => {
    const dispatch = useDispatch();

    const [currentTime, setCurrentTime] = useState('');
    const { city, temp, max_temp, pressure, wind, humidity, dscrWeather, weatheLoadingStatus, weatherData } = useSelector(state => state.weather || {});

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${hours}:${minutes}`);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        dispatch(fetchWeather({ lat: 55.7558, lon: 37.6176 }));
    }, [city, dispatch]);

    if (weatheLoadingStatus === 'loading' || weatheLoadingStatus === 'error' || !weatherData || weatherData.length === 0) {
        return (
            <>
                <div className='weather-info'>
                    <Spinner />
                </div>
                <div className='weather-details' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner />
                </div>
            </>
        )
    }

    const iconMap = {
        'Преимущественно ясно': SunIcon,
        'Ясно': SunIcon,
        'Местами облачно': CloudyIcon,
        'Неббольшой дождь': RainyIcon,
        'Облачно с прояснениями': RainSunIcon,
        'Ливень': RainyIcon,
        'Дождь с грозой': RainyIcon
    };

    const IconComponent = iconMap[dscrWeather] || CloudyIcon;

    return (
        <>
            <FadeDiv>
                <div className='weather-info'>
                    <div className="weather-info__grades-container">
                        <div>
                            <h1 className='weather-info__grades'>{temp}°</h1>
                            <h1 className="weather-info__date">Сегодня</h1>
                        </div>
                        <div className='weather-info__icon-container'>
                            <IconComponent className='weather-info__icon' />
                        </div>
                    </div>
                    <div className='weather-info__time'>
                        <h2>
                            Время: {currentTime}
                        </h2>
                        <h2>
                            Город: {city}
                        </h2>
                    </div>
                </div>
            </FadeDiv>
            <FadeDiv>
                <div className='weather-details'>
                    <div className='weather-details__container'>
                        <div className='weather-details__temp'>
                            <div className='weather-details__icon-bg'>
                                <TempIcon className='weather-details__icon' />
                            </div>
                            <h3 className='weather-details__temp-title'>Максимальная температура</h3>
                            <h3 className='weather-details__temp-descr'>{max_temp}</h3>
                        </div>
                        <div className='weather-details__temp'>
                            <div className='weather-details__icon-bg'>
                                <PressureIcon className='weather-details__icon' />
                            </div>
                            <h3 className='weather-details__temp-title'>Давление</h3>
                            <h3 className='weather-details__temp-descr'>{pressure} мм ртутного столба</h3>
                        </div>
                        <div className='weather-details__temp'>
                            <div className='weather-details__icon-bg'>
                                <RainIcon className='weather-details__icon' />
                            </div>
                            <h3 className='weather-details__temp-title'>Влажность:</h3>
                            <h3 className='weather-details__temp-descr'>{humidity}%</h3>
                        </div>
                        <div className='weather-details__temp'>
                            <div className='weather-details__icon-bg'>
                                <WindIcon className='weather-details__icon' />
                            </div>
                            <h3 className='weather-details__temp-title'>Ветер</h3>
                            <h3 className='weather-details__temp-descr'>{wind} м/с</h3>
                        </div>
                    </div>
                </div>
            </FadeDiv>

        </>
    )
}

export default WeatherBoard;
