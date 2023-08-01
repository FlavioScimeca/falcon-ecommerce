import { Category } from '@/models/category';
import sanityClient from './sanity';
import { Game, GameSubset } from '@/models/game';
import axios from 'axios';

export const getCategories = async (): Promise<Category[]> => {
  const query = `*[_type == "category"] {
    _id,
    name,
    slug {current},
    subtitle,
    _updatedAt
}`;

  const categories: Category[] = await sanityClient.fetch({ query });

  return categories;
};

export const getGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"] {
    _id,
      name, 
      price,
      images[]{
        _key,
        alt,
      "imageUrl": image.asset->url,
      },
      isFeatured,
      isTrending,
      'category' : *[_id == ^.category._ref] [0] {
        name,
        slug {
            current
        }
      },
      slug,
      quantity,
      description,
      _updatedAt
  }`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getCategoryGames = async (slug: string): Promise<Game[]> => {
  const query = `*[_type == "game" && category->slug.current == "${slug}"] {
    _id,
    name,
    price,
    images[]{
      _key,
      alt,
    "imageUrl": image.asset->url,
    },
    isFeatured,
    isTrending,
    slug ,
    description,
    quantity,
    category->{
      name,
      subtitle
    }
}`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getCategory = async (slug: string): Promise<Category> => {
  const query = `*[_type == "category" && slug.current == "${slug}" ] [0]`;

  const category: Category = await sanityClient.fetch({ query });

  return category;
};

export const getRecentGames = async (): Promise<Game[]> => {
  const query = `*[_type == "game"] | order(_createdAt desc) [0...4] {
    _id,
      name, 
      price,
      images[]{
        _key,
        alt,
      "imageUrl": image.asset->url,
      },
      isFeatured,
      isTrending,
      'category' : *[_id == ^.category._ref] [0] {
        name,
        slug {
            current
        }
      },
      slug,
      quantity,
      description
  }`;

  const games: Game[] = await sanityClient.fetch({ query });

  return games;
};

export const getGame = async (slug: string): Promise<Game> => {
  const query = `*[_type == "game" && slug.current == "${slug}" ] [0] {
      _id,
      name, 
      price,
      images[]{
        _key,
        alt,
      "imageUrl": image.asset->url,
      },
      isFeatured,
      isTrending,
      'category' : *[_id == ^.category._ref] [0] {
        name,
        slug {
            current
        }
      },
      slug,
      quantity,
      description
  }`;

  const game: Game = await sanityClient.fetch({ query });

  return game;
};

export const getGameSlug = async (
  slug: string
): Promise<{ _id: string; slug: string }> => {
  const query = `*[_type == "game" && slug.current == "${slug}" ] [0] {
      _id,
      slug,
  }`;

  const gameSlug: { _id: string; slug: string } = await sanityClient.fetch({
    query,
  });

  return gameSlug;
};

export const getGamesByIds = async (
  games_slugs_quantities: { item_id: string; quantity: number }[]
) => {
  const games: GameSubset[] = [];

  const gamesPromises = games_slugs_quantities.map(
    async ({ item_id, quantity }) => {
      const query = `*[_type == "game" && _id == "${item_id}" ] [0] {
      _id,
      name, 
      price,
      images[]{
        _key,
        alt,
      "imageUrl": image.asset->url,
      },
      quantity,
      description,
  }`;

      const gameFound: GameSubset = await sanityClient.fetch({
        query,
      });
      const updatedGame: GameSubset = {
        ...gameFound,
        quantity: quantity,
        maxQuantity: gameFound.quantity,
      };
      games.push(updatedGame);
    }
  );

  await Promise.all(gamesPromises);

  return games;
};

export const updateGameQuantity = async (games: GameSubset[]) => {
  const mutation = {
    mutations: games.map(({ _id, maxQuantity, quantity }: GameSubset) => {
      return {
        patch: {
          id: _id,
          set: {
            quantity: maxQuantity - quantity,
          },
        },
      };
    }),
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
};

export const createOrder = async (games: GameSubset[], userEmail: string) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: 'order',
          items: games.map((game, idx) => ({
            _key: `productId-${game._id}`,
            game: {
              _key: idx,
              _type: 'reference',
              _ref: game._id,
            },
            quantity: game.quantity,
          })),
          userEmail,
          orderStatus: 'pending',
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_STUDIO_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_STUDIO_DATASET}`,
    mutation,
    { headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` } }
  );

  return data;
};

export async function fetchOrder(userEmail: string) {
  const query = `*[_type == "order" && userEmail == $userEmail] {
    _id,
    items[] {
      _key,
      quantity,
      game -> {
        _id,
        name,
        price,
        images,
        slug {
          current
        },
        description
      }
    },
    orderStatus,
    createdAt
  }`;

  const params = { userEmail };
  const result: any = await sanityClient.fetch({ query, params });

  return result;
}
