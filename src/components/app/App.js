import React from 'react';
import CloudBg from '../../assets/bg/cloudBg.png';

import AppHeader from '../appHeader/AppHeader.js';
import WeatherBoard from '../weatherBoard/WeatherBoard.js';
import DaysFilter from '../daysFilter/DaysFilter.js';

import './app.scss';

function App() {
  return (
    <div className="app">
      <img src={CloudBg} alt="Cloud" className="cloud_bg" />
      <div className='content'>
        <AppHeader />
        <div className='weather-content'>
          <WeatherBoard />
        </div>
        <div className="forecast-content">
          <DaysFilter />
        </div>
      </div>
    </div>
  );
}

export default App;
