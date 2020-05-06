import React from 'react';
import moment from 'moment';
import { Typography, Slide } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    marginTop: 20,
  },
  entry: {
    borderRadius: 5,
    border: '1px solid #fff',
    width: 150,
  },
});

const WeatherJournal = ({ journal }) => {
  const classes = useStyles();

  return (
    <Slide in timeout={1300} direction='up'>
      <div className={classes.root}>
        {Object.keys(journal).map((entry) => (
          <div className={classes.entry}>
            <img
              alt={journal[entry].weather}
              src={`http://openweathermap.org/img/wn/${journal[entry].icon}@2x.png`}
            />
            <Typography variant='body2' style={{ color: '#fff' }}>
              {journal[entry].mood}
            </Typography>
            <Typography variant='caption' style={{ color: '#fff' }}>
              {moment(entry, 'YYYYMMDD').format('L')}
            </Typography>
          </div>
        ))}
      </div>
    </Slide>
  );
};

export default WeatherJournal;
