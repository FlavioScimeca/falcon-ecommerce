import { getGame } from '@/libs/apis';
import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const game = await getGame(slug);

  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: 'black',
          backgroundSize: '150px 150px',
          height: '100%',
          width: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          flexWrap: 'nowrap',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center',
          }}
        >
          <img
            src={`${game.images[0].imageUrl}`}
            alt={game.images[0].alt}
            height={400}
            width={400}
            style={{
              objectFit: 'contain',
            }}
          />
        </div>
        <div
          style={{
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            color: 'white',
            marginTop: 30,
            padding: '0 120px',
            lineHeight: 1.4,
            whiteSpace: 'pre-wrap',
          }}
        >
          {game.name}
        </div>
      </div>
    ),
    size
  );
}

/* <div
          style={{
            backgroundColor: 'black',
            backgroundSize: '150px 150px',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
        }}
        >
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
              justifyItems: 'center',
            }}
            >
            <img
            height={200}
              src={`${game.images[0].imageUrl}.png`}
              alt={game.images[0].alt}
              width={232}
              />
              </div>
              <div
              style={{
                  fontSize: 60,
                  fontStyle: 'normal',
                  letterSpacing: '-0.025em',
                  color: 'white',
                  marginTop: 30,
                  padding: '0 120px',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-wrap',
                }}
                >
                {game.name}
                </div>
                </div> */
