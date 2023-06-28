// export default function Card() {
//   return (
//     <div>
//       <div className="relative rounded-xl  border-2 border-[#FD302E] ring-8 hover:-translate-y-5 transition-all ring-white ring-inset hover:shadow-xl w-[180px] h-[280px] bg-[#FD302E] bg-[url('/lg-red-logo.jpeg')] bg-contain bg-no-repeat bg-center"></div>
//     </div>
//   )
// }
'use client'

import { Card } from "@/app/game/page";
import Image from "next/image";

type CardProps = {
  card: Card,
  handleChoice: (card: Card) => void;
  flipped: boolean;
  disabled: boolean;
}

export default function Card({ card, handleChoice, flipped, disabled }: CardProps) {

  const handleClick = () => {
    handleChoice(card)
  }

  return (
    <div className="card">
      <div className={flipped ? 'flipped': "" }>
        <Image className="w-[180px] h-[280px] front" src={card.src} width={100} height={100} alt="front-face" />
        <Image className="w-[180px] h-[280px] back" src="/back.png" width={100} height={100} alt="back-face" onClick={handleClick} />
      </div>
    </div>
  );
}
