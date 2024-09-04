import { useSelector } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import Spinner from '../spinner/Spinner.js';
import { ReactComponent as CloudyIcon } from '../../assets/icons/Cloudy.svg';
import { ReactComponent as SunIcon } from '../../assets/icons/sun.svg';
import { ReactComponent as RainyIcon } from '../../assets/icons/small_rain.svg';
import { ReactComponent as RainSunIcon } from '../../assets/icons/small_rain_sun.svg';

import './daysFilter.scss';

const BounceAnimation = keyframes`${fadeIn}`;

const BouncyDiv = styled.div`
  animation: 2s ${BounceAnimation};
`;

const DaysFilter = () => {
    const { weatherData, weatheLoadingStatus } = useSelector(state => state.weather || {});

    const iconMap = {
        'Преимущественно ясно': SunIcon,
        'Ясно': SunIcon,
        'Местами облачно': CloudyIcon,
        'Небольшой дождь': RainyIcon,
        'Облачно с прояснениями': RainSunIcon,
        'Ливень': RainyIcon,
        'Дождь с грозой': RainyIcon
    };

    const rendCards = (arr) => {
        return arr.map((item, i) => {
            const IconComponent = iconMap[item.weather.description];
            if (!IconComponent) {
                console.error(`Icon for description "${item.weather.description}" not found.`);
                return null;
            }
            return (
                <BouncyDiv key={i}>
                    <div key={i} className="cardscontainer__item">
                        <h2>{item.datetime}</h2>
                        <IconComponent />
                        <h1>{item.temp}°</h1>
                        <h2>{item.weather.description}</h2>
                    </div>
                </BouncyDiv>
            );
        });
    };

    if (weatheLoadingStatus === 'loading' || weatheLoadingStatus === 'error' || !weatherData || weatherData.length === 0) {
        return (
            <div className='weather-info'>
                <Spinner />
            </div>
        );
    }

    const render = rendCards(weatherData);
    return (
        <>
            <div className="btncontainer">
                <button className="btncontainer__btns">На неделю</button>
            </div>
            <div className="cardscontainer">
                {render}
            </div>
        </>
    );
};

export default DaysFilter;
