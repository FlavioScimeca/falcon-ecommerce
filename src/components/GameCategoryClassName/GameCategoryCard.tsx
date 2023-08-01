import React, { FC } from 'react';
import gameCategoryCardClassNames from './gameCategoryClassName';
import Link from 'next/link';
import Image from 'next/image';
import { BiRightArrowAlt } from 'react-icons/bi';

interface GameCategoryCardProps {
  categoryName: string;
  slug: string;
}

const GameCategoryCard: FC<GameCategoryCardProps> = ({
  categoryName,
  slug,
}) => {
  const { name, container, arrow } = gameCategoryCardClassNames;

  return (
    <Link href={`categories/${slug}`} className={container}>
      <h3 className={name}> {categoryName} </h3>
      <BiRightArrowAlt className={arrow} />
    </Link>
  );
};

export default GameCategoryCard;
