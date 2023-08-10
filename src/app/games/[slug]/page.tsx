import GameDetailsClient from '@/components/GameDetails/GameDetailsClient';
import { getGame, getGames } from '@/libs/apis';
import { getBlurredImages } from '@/libs/getLocalBase64';
import { Metadata } from 'next';

export async function generateMetadata(props: {
  params: { slug: string };
}): Promise<Metadata> {
  const game = await getGame(props.params.slug);

  if (!game) {
    return {
      title: 'Not Found',
      description: 'Page Not Found',
    };
  }

  return {
    title: game.name,
    description: game.description,
    category: game.category.name,
    alternates: {
      canonical: `games/${game.slug.current}`,
      languages: {
        'it-IT': `it-IT/games/${game.slug.current}`,
      },
    },
  };
}

export async function generateStaticParams() {
  const games = await getGames();

  if (!games) return [];

  return games.map((game) => ({
    slug: game.slug.current,
  }));
}

const GametemPage = async (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  const game = await getGame(slug);
  const blurredImages = await getBlurredImages(game.images);

  return (
    <>
      <GameDetailsClient game={game} blurredImages={blurredImages} />
    </>
  );
};

export default GametemPage;
