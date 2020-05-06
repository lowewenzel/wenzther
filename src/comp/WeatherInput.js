import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import { Slide, Paper, Typography, ButtonBase } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    padding: 50,
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moods: {
    display: 'flex',
    flexFlow: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  mood: {
    display: 'flex',
    alignItems: 'center',
    flexFlow: 'column',
    width: 100,
    padding: 20,
    margin: 20,
    borderRadius: 5,
    transition: '0.3s',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-10px)',
    },
  },
});

function hexToRGB(h, a) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = '0x' + h[1] + h[1];
    g = '0x' + h[2] + h[2];
    b = '0x' + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = '0x' + h[1] + h[2];
    g = '0x' + h[3] + h[4];
    b = '0x' + h[5] + h[6];
  }

  return 'rgba(' + +r + ',' + +g + ',' + +b + ', ' + a + ')';
}

export const MOODS_LIST = [
  {
    name: 'Sad',
    icon: SentimentDissatisfiedIcon,
    color: '#ffaaa5',
  },
  {
    name: 'OK',
    icon: SentimentSatisfiedIcon,
    color: '#ffd3b6',
  },
  {
    name: 'Happy',
    icon: SentimentSatisfiedAltIcon,
    color: '#dcedc1',
  },
  {
    name: 'Great',
    icon: InsertEmoticonIcon,
    color: '#a8e6cf',
  },
];

const WeatherInput = ({ setJournal }) => {
  const classes = useStyles();

  const handleClick = useCallback(async (mood) => {}, []);

  return (
    <Slide in direction='up' timeout={1000} elevation={6}>
      <Paper className={classes.root}>
        <Typography variant='h4' color='textPrimary'>
          How are you feeling today?
        </Typography>
        <div className={classes.moods}>
          {MOODS_LIST.map((mood) => (
            <ButtonBase
              key={mood.name}
              className={classes.mood}
              component='div'
              style={{
                border: `1px solid ${mood.color}`,
                backgroundColor: hexToRGB(mood.color, 0.1),
              }}
              onClick={() => {
                setJournal(mood.name.toLowerCase());
              }}
            >
              <mood.icon style={{ color: mood.color }} />
              <Typography variant='subtitle2' style={{ color: '#444' }}>
                {mood.name}
              </Typography>
            </ButtonBase>
          ))}
        </div>
      </Paper>
    </Slide>
  );
};

export default WeatherInput;
