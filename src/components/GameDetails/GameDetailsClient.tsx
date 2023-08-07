'use client';

import { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import toast from 'react-hot-toast';
import { Game } from '@/models/game';
import { useAppDispatch } from '@/hooks/storeHook';
import { addItemToCart } from '@/redux/features/cartSlice';
import Carousel from '../Carousel/Carousel';

const GameDetailsClient = (props: { game: Game }) => {
  const { game } = props;

  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);

  const dispatch = useAppDispatch();

  const handleDecrease = () => {
    if (!game) return;
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setPrice(Number(((quantity - 1) * game.price).toFixed(2)));
    }
  };

  const handleIncrease = () => {
    if (!game) return;
    if (quantity < game.quantity) {
      setQuantity(quantity + 1);
      setPrice(Number(((quantity + 1) * game.price).toFixed(2)));
    }
  };

  const handleAddToCart = () => {
    if (!game) return;
    dispatch(addItemToCart({ ...game, quantity }));

    toast.success(`${game.name} added to cart`, {
      style: {
        border: '1px solid black',
        padding: '16px',
        color: 'black',
        borderRadius: '0px',
      },
      iconTheme: {
        primary: 'black',
        secondary: 'white',
      },
    });
  };

  return (
    <div>
      <Carousel images={game.images} />

      <div className="flex justify-around items-center border-black border-t">
        <div>
          <h2 className="text-xl md:text-3xl py-3 font-bold">{game.name}</h2>
          <p className={classNames.price}>{game.price} $</p>
        </div>

        <div className="flex flex-col justify-around mt-10">
          <div className="flex">
            <button
              onClick={handleDecrease}
              className={`px-4 py-2 rounded-s-full border border-black font-extrabold ${
                quantity === 0 && 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={quantity === 0}
            >
              -
            </button>
            <input
              type="text"
              className="border-y w-16  md:w-32 text-center  border-black"
              value={quantity}
              readOnly
            />
            {game && (
              <button
                onClick={handleIncrease}
                className={`px-4 py-2 rounded-r-full border border-black font-extrabold ${
                  quantity === game.quantity && 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={quantity === game.quantity}
              >
                +
              </button>
            )}
          </div>

          <div className="flex justify-center items-center space-x-5 mt-5">
            <div className="text-xl text-primary-light font-semibold">
              $ {price}
            </div>
            <button
              onClick={handleAddToCart}
              className={`p-4 rounded-full bg-black text-white hover:bg-emerald-600 transition-all ${
                quantity === 0 && 'bg-gray-300 cursor-not-allowed'
              }`}
              disabled={quantity === 0}
            >
              <FaShoppingCart />
            </button>
          </div>
        </div>
      </div>

      <div className="lg:w-[calc(100dvw-29rem)] px-4 lg:px-0 lg:ms-28 pt-5">
        <h2 className={classNames.description}>{game.description}</h2>
      </div>
    </div>
  );
};

export default GameDetailsClient;

const classNames = {
  carousel: 'relative w-full h-64 mb-4',
  previousButton:
    'absolute top-1/2 left-2 transform -translate-y-1/2 px-4 py-2 bg-gray-500 text-white rounded-l',
  nextButton:
    'absolute top-1/2 right-2 transform -translate-y-1/2 px-4 py-2 bg-gray-500 text-white rounded-r',

  description: 'text-lg mb-2',
  name: 'text-4xl pt-5 text-gray-300 font-bold mb-2',
  price: 'text-2xl text-primary font-bold',
  cartPrice: 'text-xl text-primary-light',
  addToCartButton: 'px-4 py-2 mt-4 bg-blue-500 text-white rounded',
  cartContainer: 'flex justify-center items-center space-x-4',
  quantityInput:
    'border outline-none border-gray-300 rounded px-2 py-1 text-center w-12',
  button: 'px-4 py-2 rounded bg-blue-500 text-white',
  disabledButton: 'bg-gray-300 cursor-not-allowed',
};
