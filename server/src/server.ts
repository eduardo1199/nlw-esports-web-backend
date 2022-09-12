import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  return response.json([
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
    {
      id: 4,
      name: 'published 4'
    }
  ]);
});

app.listen(3333);
