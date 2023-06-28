'use client'

import Card from "@/components/Card";
import { Howl } from 'howler';
import Image from "next/image";
import { useEffect, useState } from "react";

export type Card = {
  id: number;
  src: string;
  matched: boolean;
  title: string;
  description: string;
}

const cardImages = [
  { "title": "AI Brightness", "description": "Um sensor de luz mede a luz ambiente ao redor e, em seguida, o processador ajusta com precisão o mapeamento de tons para otimizar o brilho da tela. O conteúdo HDR é refinado com ajustes de brilho que transformam cenas mais escuras em cenas com contraste, detalhes e profundidade de cor impressionantes.", "src": '/ai-brightness.png', matched: false  },
  { "title": "WebOS", "description": "O webOS é o sistema operacional exclusivo das Smart TVs da LG. Conta com navegador próprio, lojas de aplicativos e interface simples", "src": '/webos.png', matched: false  },
  { "title": "AI Upscaler", "description": "O LG AI Upscaler é um recurso presente nos televisores LG que utiliza inteligência artificial para aprimorar a qualidade de imagem de conteúdos de baixa resolução, realizando um upscaling (aumento de escala) para uma resolução mais alta. Isso resulta em uma imagem mais nítida, com detalhes aprimorados e uma experiência visual aprimorada para o espectador.", "src": '/upscaler.png', matched: false  },
  { "title": "Processador", "description": "O processador Alpha gen5 das TVs LG utiliza inteligência artificial para otimizar cores, contraste e nitidez, proporcionando uma experiência visual realista. Ele também oferece recursos avançados de processamento de imagem e suporte a tecnologias HDR, resultando em uma qualidade de imagem excepcional e imersiva.", "src": '/processador.png', matched: false  },
  { "title": "AI Sound", "description": "A tecnologia AI Sound da LG é um recurso que utiliza inteligência artificial para aprimorar a qualidade do som em TVs. Ela analisa o conteúdo reproduzido e aplica ajustes automáticos para oferecer um áudio mais claro, imersivo e balanceado, adaptado às diferentes cenas e tipos de conteúdo.", "src": '/ai-sound.png', matched: false  },
  { "title": "Filmaker", "description": "A tecnologia Filmaker das TVs LG é um recurso que busca fornecer uma experiência de visualização mais próxima da intenção original do diretor de filmes. Ela ajusta automaticamente as configurações de imagem para reproduzir cores precisas, contraste aprimorado e preservar os detalhes cinematográficos, proporcionando uma qualidade de imagem próxima à do cinema.", "src": '/filmaker.png', matched: false  },
];

export default function Game() {

  const [cards, setCards] = useState<Card[]>([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState<Card | null>(null)
  const [choiceTwo, setChoiceTwo] = useState<Card | null>(null)
  const [disabled, setDisabled] = useState(false)
  const [modalContent, setModalContent] = useState<Card | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({
      ...card,
      id: Math.random()
    }));
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffleCards)
    setTurns(0)
  }

  const backgroundSound = new Howl({
    src: ['/background-sound.mp3'],
    volume: 0.2,
    loop: true,
  });
  
  const matchSound = new Howl({
    src: ['/match-sound.mp3'],
  });

  const failureSound = new Howl({
    src: ['/failure-sound.mp3'],
  });

  const handleChoice = (card: Card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  useEffect(() => {
    setDisabled(true)
    if(choiceOne && choiceTwo) {
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              return {
                ...card,
                matched: true
              }
            } else {
              return card
            }
          })
        })
        resetTurns()
      } else {
        failureSound.play()
        setTimeout(() => {
          resetTurns()
        }, 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurns = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo && choiceOne.src === choiceTwo.src) {
      matchSound.play();
      setTimeout(() => {
        setModalContent(choiceOne);
      }, 750)
    }
  }, [choiceOne, choiceTwo]);

  const closeModal = () => {
    setModalContent(null);
  };

  useEffect(() => {
    backgroundSound.play();

    return () => {
      backgroundSound.stop();
    };
  }, []);

  return (
    <main className="w-full h-screen bg-white relative flex flex-col items-center justify-start p-6">
      <h1 className="text-3xl font-game uppercase text-lg-red mb-5">jogo da memória</h1>
      <div className="mb-5 flex items-center justify-center gap-10">
        <button onClick={shuffleCards} className="uppercase text-lg-red border-2 border-lg-red hover:bg-lg-red hover:text-white shrink-0 py-2 px-8 transition-all">Resetar</button>
        <h2 className="w-full max-w-4xl text-right mt-2">Jogadas: <span className="text-2xl">{ turns }</span></h2>
      </div>
      <section className="grid gap-3 grid-cols-4 h-auto">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </section>
      { modalContent && (
        <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
          <div className="bg-white p-10 w-full max-w-6xl">
              <div>
                <h3 className="text-2xl mb-5">{modalContent.title}</h3>
                <p className="text-xl uppercase">{modalContent.description}</p>
              </div>
            <button className="mt-10 bg-lg-red text-white w-full py-5 px-10 flex items-center justify-center text-xl rounded-2xl uppercase border border-lg-red ring-0 hover:ring-white hover:ring-4 ring-inset transition-all" onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
      <Image className="absolute bottom-10 right-10" width={144} height={50} src="/logo_spot.png" alt="SPOT Promo" />
    </main>
  );
};
