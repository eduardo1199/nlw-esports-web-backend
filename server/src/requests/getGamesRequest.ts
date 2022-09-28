import express, { Request, Response } from 'express';
import { prisma } from '../primicClient';

export async function getGamesRequest(req: Request, res: Response) {
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
}