import React, { useCallback } from 'react';
import './App.css';
import WeatherInput from './comp/WeatherInput';
import { Typography, Fade } from '@material-ui/core';
import WeatherJournal from './comp/WeatherJournal';
import { useLocalStorage } from './util';
import moment from 'moment';

const today = moment();

const getWeatherForDay = async () => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=${process.env.REACT_APP_WEATHER_KEY}`
  );

  const jsonWeather = await res.json();

  return jsonWeather.weather[0];
};

function App() {
  const [journalStr, setJournalStr] = useLocalStorage('journal', '');

  const journal = journalStr ? JSON.parse(journalStr) : {};

  const setJournal = useCallback(
    async (entry) => {
      const newJournal = Object.assign({}, journal);

      const weatherJson = await getWeatherForDay();

      newJournal[today.format('YYYYMMDD')] = {
        mood: entry,
        weather: weatherJson.main,
        icon: weatherJson.icon,
      };

      setJournalStr(JSON.stringify(newJournal));
    },
    [journal, setJournalStr]
  );

  return (
    <div className='App'>
      <Fade in>
        <Typography
          variant='h3'
          style={{ color: '#fff', marginBottom: 20, fontWeight: 200 }}
        >
          SF Mood Journal
        </Typography>
      </Fade>
      <WeatherInput setJournal={setJournal} />
      <WeatherJournal journal={journal} />
    </div>
  );
}

export default App;
