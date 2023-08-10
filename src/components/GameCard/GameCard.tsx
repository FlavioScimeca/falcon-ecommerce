import Link from 'next/link';
import { FC } from 'react';
import gameCardClassNames from './gameCardClassName';
import Image from 'next/image';

interface GameCardProps {
  gameName: string;
  imageURL: string;
  slug: string;
  price: number;
}

const GameCard: FC<GameCardProps> = ({ gameName, imageURL, slug, price }) => {
  return (
    <Link
      href={`/games/${slug}`}
      className="relative mx-auto w-40 h-52  md:w-64 md:h-64 overflow-hidden border-[1px] border-black"
    >
      <h3 className="absolute top-0 right-0 p-3 text-lg font-semibold z-10 border-b-[1px] border-l-[1px] bg-white border-black">
        {price} $
      </h3>

      <Image
        className="object-cover top-0 left-0"
        src={imageURL}
        alt={gameName}
        sizes="(min-width: 780px) 255px, 159px"
        fill
      />

      <div className={gameCardClassNames.gameName}> {gameName} </div>
    </Link>
  );
};

export default GameCard;
