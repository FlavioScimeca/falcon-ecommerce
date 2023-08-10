export interface Game {
  _id: string;
  name: string;
  price: number;
  images: Array<{
    _key: string;
    alt: string;
    imageUrl: string;
    photoBlurredData?: string;
  }>;
  isFeatured: boolean;
  isTrending: boolean;
  category: { name: string; slug: { current: string } };
  slug: { current: string };
  quantity: number;
  description: string;
  _updatedAt: string;
}

export type GameSubset = Pick<
  Game,
  '_id' | 'price' | 'quantity' | 'images' | 'name' | 'description'
> & { maxQuantity: number };
