'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsGoogle } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { toggleCart } from '@/redux/features/cartSlice';
import useCartTotals from '@/hooks/useCartTotals';
import Signup from '../Signup/Signup';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const dispatch = useAppDispatch();

  const { totalQuantity } = useCartTotals();

  const [isSignupFormOpen, setIsSignupFormOpen] = useState(false);

  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  // console.log(status, session);

  const toggleForm = () => {
    setIsSignupFormOpen(!isSignupFormOpen);
  };

  const signInHandler = async () => {
    try {
      await signIn();
    } catch (error) {
      console.log('SIGN IN', error);
    }
  };

  const buttonsCTA = (
    <>
      {session?.user && (
        <>
          <Link
            role="link"
            href="/orders"
            className="hover:bg-zinc-100 header-btn"
          >
            Orders
          </Link>
          <button
            onClick={() => signOut()}
            className="bg-red-700 hover:bg-red-600 text-white header-btn"
          >
            Logout
          </button>
        </>
      )}
      {!session?.user && (
        <>
          <button onClick={toggleForm} className="hover:bg-zinc-100 header-btn">
            Sign Up
          </button>
          <button
            onClick={signInHandler}
            className="hover:bg-zinc-100 header-btn"
          >
            SignIn
            <BsGoogle
              style={{
                color: 'black',
                fontSize: '25px',
                cursor: 'pointer',
                marginLeft: '5px',
              }}
            />
          </button>
        </>
      )}
    </>
  );

  return (
    <nav>
      <Signup isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />

      <header className={`border-b-2 border-black flex justify-between h-16`}>
        <Link className="header-btn" href="/">
          Logo
        </Link>
        <div className="flex">
          <button
            onClick={() => dispatch(toggleCart())}
            className="hover:bg-zinc-100 relative header-btn"
          >
            <span>
              Cart
              <AiOutlineShoppingCart className="inline-block text-3xl" />
            </span>
            <div className="absolute inline-flex items-center justify-center w-5 md:w-6 h-5 md:h-6 font-bold border-2 border-black rounded-full top-2 -right-0 md:right-2 text-xs md:text-sm">
              {' '}
              {totalQuantity}{' '}
            </div>
          </button>
          {buttonsCTA}
        </div>
      </header>
    </nav>
  );
};

export default Header;
