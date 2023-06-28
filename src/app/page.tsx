import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-screen bg-white relative flex flex-col items-center justify-center p-10">
      <div className="text-center">
        <h1 className="text-5xl font-game uppercase text-lg-red mb-10">Bem-vindo(a)</h1>
        <h3 className="text-5xl font-game uppercase text-lg-red mb-10">ao</h3>
        <h2 className="text-5xl font-game uppercase text-lg-red mb-10">jogo da memória</h2>
      </div>
      <Link href="/game" className="mt-12 bg-lg-red text-white w-full max-w-lg py-10 px-10 flex items-center justify-center text-4xl rounded-2xl uppercase border border-lg-red ring-0 hover:ring-white hover:ring-8 ring-inset transition-all">
        jogar
      </Link>
      <Image className="absolute bottom-10 right-10" width={144} height={50} src="/logo_spot.png" alt="SPOT Promo" />
    </main>
  )
}
