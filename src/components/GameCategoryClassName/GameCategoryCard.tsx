import React, { FC } from 'react';
import gameCategoryCardClassNames from './gameCategoryClassName';
import Link from 'next/link';
import { BiRightArrowAlt } from 'react-icons/bi';

interface GameCategoryCardProps {
  categoryName: string;
  slug: string;
}

const GameCategoryCard: FC<GameCategoryCardProps> = ({
  categoryName,
  slug,
}) => {
  const { name, container } = gameCategoryCardClassNames;

  return (
    <Link href={`categories/${slug}`} className={container}>
      <h3 className={name}> {categoryName} </h3>
      <BiRightArrowAlt className="text-primary-dark h-8 w-8 mx-auto hover:translate-x-3 transition-all ease-in-out" />
    </Link>
  );
};

export default GameCategoryCard;
