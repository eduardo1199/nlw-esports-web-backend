import express from 'express';
import { PrismaClient, Game, Ad } from '@prisma/client';

const app = express();
const prisma = new PrismaClient({
  log: ['query']
});

app.get('/games', async (req, res) => {
  try {
    const games = await prisma.game.findMany({
      include: {
        _count: {
          select: {
            ads: true
          }
        }
      }
    });

    return res.status(200).json(games);
  } catch (err) {
    return res.status(400).json('Error na requisição!')
  }
});

app.post('/ads', (req, res) => {
  return res.status(201).json();
});

app.get('/games/:id/ads', (req, res) => {
  return res.json([]);
});

app.get('/ads/:id/discord', (req, res) => {
  return res.json([
    {
      id: 1,
      name: 'published 1'
    },
    {
      id: 2,
      name: 'published 2'
    },
    {
      id: 3,
      name: 'published 3'
    },
  ]);
});

app.listen(3333);
