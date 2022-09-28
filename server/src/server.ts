import express from 'express';
import cors from 'cors';

import { convertHourStringToMinuteString } from './utils/convert-hour-string-to-minutes';
import { convertMinutesToHourString } from './utils/convert-minutes-to-hour-string';
import { prisma } from './primicClient';

import { getGamesRequest } from './requests/getGamesRequest';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/games', getGamesRequest);

app.post('/games/:id/ads', async (req, res) => {
 const gameId = req.params.id;
 const body = req.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      discord: body.discord,
      hourEnd: convertHourStringToMinuteString(body.hourEnd),
      hourStart: convertHourStringToMinuteString(body.hourStart),
      useVoiceChannel: body.useVoiceChannel,
      weekDays: body.weekDays.join(","),
      yearsPlaying: body.yearsPlaying,
    }
  });

  return res.status(200).json(ad);
});

app.get('/games/:id/ads', async (req, res) => {
  try {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
      select: {
        id: true,
        name: true,
        weekDays: true,
        useVoiceChannel: true,
        yearsPlaying: true,
        hourEnd: true,
        hourStart: true,
        cretated: true,
      },
      where: {
        gameId,
      },
      orderBy: {
        cretated: 'desc'
      }
    });
  
    return res.status(200).json(ads.map(ad => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(','),
        hourStart: convertMinutesToHourString(ad.hourStart),
        hourEnd: convertMinutesToHourString(ad.hourEnd),
      }
    }));
  } catch (err) {
    return res.status(400).json('Error na requisição!')
  }
});

app.get('/ads/:id/discord', async (req, res) => {
  try {
    const AdId = req.params.id;

    const ad = await prisma.ad.findFirstOrThrow({
      select: {
        discord: true
      },
      where: {
        id: AdId
      }
    });

    return res.status(200).json({ discord: ad.discord });
  } catch(err) {
    return res.status(400).json('Error na requisição!')
  } 
});

app.listen(3333);
