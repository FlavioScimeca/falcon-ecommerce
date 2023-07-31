import { getCategories, getGames } from '@/libs/apis';

export default async function sitemap() {
  const baseUrl = 'https://falcon-shop.site';

  const game = await getGames();
  const categories = await getCategories();

  const gameUrls = game.map((game) => ({
    url: `${baseUrl}/game/${game.slug.current}`,
    lastModified: game._updatedAt,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug.current}`,
    lastModified: category._updatedAt,
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    ...categoryUrls,
    ...gameUrls,
  ];
}
