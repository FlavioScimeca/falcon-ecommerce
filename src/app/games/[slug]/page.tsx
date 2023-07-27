import CarouselSlider from '@/components/CarouselSlider/CarouselSlider';
import GameDetailsClient from '@/components/GameDetails/GameDetailsClient';
import GameDetailsServer from '@/components/GameDetails/GameDetailsServer';
import { getGame } from '@/libs/apis';
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
      canonical: `game/${game.slug.current}`,
      languages: {
        'it-IT': `it-IT/game/${game.slug.current}`,
      },
    },
  };
}

const GametemPage = async (props: { params: { slug: string } }) => {
  const {
    params: { slug },
  } = props;

  return (
    <>
      <GameDetailsClient slug={slug}>
        <GameDetailsServer slug={slug} />
      </GameDetailsClient>
    </>
  );
};

export default GametemPage;
