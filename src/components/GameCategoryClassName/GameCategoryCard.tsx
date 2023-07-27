import React, { FC } from 'react';
import gameCategoryCardClassNames from './gameCategoryClassName';
import Link from 'next/link';
import Image from 'next/image';
import { BiRightArrowAlt } from 'react-icons/bi';

interface GameCategoryCardProps {
  categoryImage: string;
  categoryName: string;
  slug: string;
}

const GameCategoryCard: FC<GameCategoryCardProps> = ({
  categoryImage,
  categoryName,
  slug,
}) => {
  const { image, name, container, arrow } = gameCategoryCardClassNames;

  return (
    <Link href={`categories/${slug}`} className={container}>
      <Image
        src={categoryImage}
        alt={categoryName}
        width={200}
        height={200}
        className={image}
      />
      <h3 className={name}> {categoryName} </h3>
      <BiRightArrowAlt className={arrow} />
    </Link>
  );
};

export default GameCategoryCard;
