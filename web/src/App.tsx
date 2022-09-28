import './styles/main.css';

import Logo from './assets/logo.svg';

import { GameBanner } from './components/GameBanner';
import { CreatedAdBanner } from './components/CreatedAdBanner';
import { useEffect, useState } from 'react';

type Game = {
  bannerUrl: string;
  id: string;
  title: string;
  _count: {
    ads: number;
  }
}

function App() {
  const [games, setGamer] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/games/')
      .then((response) => response.json())
      .then((games => setGamer(games)));
  }, [])

  return (
   <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img 
        src={Logo} 
        alt="logo"
      />

      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-16">

        {games.map(game => {
          return (
            <GameBanner 
              key={game.id}
              adsCount={game._count.ads}
              bannerUrl={game.bannerUrl}
              title={game.title}
            />
          )
        })}

      </div>

      <CreatedAdBanner />
   </div>
  );
};

export default App;
