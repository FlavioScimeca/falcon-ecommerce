import CarouselSlider from '@/components/CarouselSlider/CarouselSlider';
import GameDetailsClient from '@/components/GameDetails/GameDetailsClient';
import GameDetailsServer from '@/components/GameDetails/GameDetailsServer';
import { getGame } from '@/libs/apis';
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
