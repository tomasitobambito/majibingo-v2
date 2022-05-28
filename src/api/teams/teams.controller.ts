import { Request, Response } from 'express';

const teams = [
  { id: 1, name: 'Real Madrid', league: 'La Liga' },
  { id: 2, name: 'Barcelona', league: 'La Liga' },
  { id: 3, name: 'Manchester United', league: 'Premier League' },
  { id: 4, name: 'Liverpool', league: 'Premier League' },
  { id: 5, name: 'Arsenal', league: 'Premier League' },
  { id: 6, name: 'Inter', league: 'Serie A' },
  { id: 7, name: 'Milan', league: 'Serie A' },
  { id: 8, name: 'Juventus', league: 'Serie A' },
];

export const getTeams = (_req: Request, res: Response) => {
  res.send(teams);
};