import GameCard from '@/components/GameCard/GameCard';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import { getCategories, getCategory, getCategoryGames } from '@/libs/apis';
import { Game } from '@/models/game';
import { Metadata } from 'next';
import React from 'react';

interface GameCategoryProps {
  params: { slug: string };
}

export async function generateMetadata({
  params: { slug },
}: GameCategoryProps): Promise<Metadata> {
  const category = await getCategory(slug);

  if (!category) {
    return {
      title: 'Not Found',
      description: 'Page Not Found',
    };
  }

  return {
    title: {
      absolute: category.name,
    },
    description: category.subtitle,
    category: category.name,
    alternates: {
      canonical: `category/${category.slug.current}`,
      languages: {
        'it-IT': `it-IT/category/${category.slug.current}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();

  if (!categories) return [];

  return categories.map((category) => ({
    slug: category.slug.current,
  }));
}

const GameCategory = async ({ params: { slug } }: GameCategoryProps) => {
  const games = await getCategoryGames(slug);
  const category = await getCategory(slug);

  // console.log(slug);
  // console.log({ GAMES: games });

  return (
    <>
      <section className={classNames.hero}>
        <div className={classNames.heroContent}>
          <div className="text-center">
            <h1 className={classNames.title}> {slug.toUpperCase()} Games </h1>
            <p className="">{category.subtitle}</p>
          </div>
        </div>
      </section>

      <section className={classNames.section}>
        <h2 className={classNames.heading}>{slug.toUpperCase()} Games</h2>

        <div className="flex rounded gap-7 flex-wrap py-10">
          {/* Collection Games */}
          {games.map(({ _id, name, images, slug, price }: Game) => (
            <GameCard
              key={_id}
              gameName={name}
              slug={slug.current}
              price={price}
              imageURL={images[0].imageUrl}
            />
          ))}
        </div>
      </section>

      <NewsLetter />
    </>
  );
};

export default GameCategory;

const classNames = {
  hero: 'relative py-16 md:py-20 bg-cover',
  heroContent:
    'relative bg-primary-gradient px-4 py-4 md:py-12 lg:px-8 lg:py-12',
  title: 'text-2xl md:text-4xl lg:text-5xl font-extrabold tracking-tight',
  subtitle: 'mt-2 md:mt-4 max-w-3xl text-sm md:text-xl',
  author: 'mt-4 md:mt-6 flex items-center',
  authorAvatar:
    'flex-shrink-0 object-cover h-8 md:h-10 w-8 md:w-10 rounded-full',
  authorName: 'ml-2 md:ml-3 text-sm md:text-xl font-medium ',
  blogContentWrapper:
    'flex flex-col justify-between max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:flex-row lg:px-8',
  blogImageWrapper: 'w-full lg:w-1/3',
  blogImage:
    'w-full h-full object-cover rounded-lg hover:translate-y-2 transition-all duration-500',
  blogMainContent: 'w-full lg:w-2/3 mt-6 lg:mt-0 lg:pl-8',
  blogTitle: 'text-3xl font-bold text-gray-300',
  blogDate: 'mt-2 text-gray-200 text-sm',
  blogText: 'mt-4 text-gray-200 leading-7',
  section: 'py-16 lg:py-36 px-4 lg:px-36  text-center',
  heading: 'text-3xl lg:text-4xl font-bold mb-3',
  subHeading: 'text-gray-400 max-w-xl mx-auto lg:text-lg',
  latestButton:
    'mt-4 sm:mt-0 px-6 py-2 rounded-md bg-primary-gradient border-2 border-primary-dark',
};
