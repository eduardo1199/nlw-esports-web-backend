import { useEffect, useState } from 'react';

import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css';

import Logo from './assets/logo.svg';

import { GameBanner } from './components/GameBanner';
import { CreatedAdBanner } from './components/CreatedAdBanner';
import { GameController } from 'phosphor-react';



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

      <Dialog.Root>
        <CreatedAdBanner />

        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-ld w-[480px] shadow-lg shadow-black-1/4">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <Dialog.Content className="">
              <form>
                <div>
                  <label htmlFor="game">Qual o game?</label>
                  <input placeholder="Selecione o game que deseja jogar" id="game" />
                </div>

                <div>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <input id="name" placeholder="Como te chamam dentro do game?" />
                </div>

                <div>
                  <div>
                    <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                    <input type="number" id="yearsPlaying" placeholder="Tudo bem ser ZERO"/>
                  </div>
                  <div>
                    <label htmlFor="discord">Joga há quantos anos?</label>
                    <input type="text" id="discord" placeholder="Usuario#0000"/>
                  </div>
                </div>

                <div>
                  <div>
                    <label htmlFor="weekDays">Quando costuma jogar?</label>
                  </div>
                  <div>
                    <label htmlFor="hourStart">Qual horário do dia?</label>
                    <div>
                      <input id="hourStart" type="time" placeholder="De" />
                      <input id="hourEnd" type="time" placeholder="De" />
                    </div>
                  </div>
                </div>

                <div>
                  <input type="checkbox" />
                  Costumo me conectar ao chat de voz
                </div>

                <footer>
                  <button type="button">Cancelar</button>
                  <button type="submit">
                    <GameController />
                    Encontrar duo
                  </button>
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
   </div>
  );
};

export default App;
