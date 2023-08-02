'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import headerClassNames from './headerClassName';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { BsGoogle } from 'react-icons/bs';
import { useAppDispatch, useAppSelector } from '@/hooks/storeHook';
import { toggleCart } from '@/redux/features/cartSlice';
import useCartTotals from '@/hooks/useCartTotals';
import Signup from '../Signup/Signup';
import { signIn, signOut, useSession } from 'next-auth/react';

const Header = () => {
  const {
    header,
    container,
    logoContainer,
    logo,
    nav,
    ul,
    li,
    link,
    cart,
    contactUs,
    orders,
    signupBtn,
    signinBtn,
    logoutBtn,
  } = headerClassNames;

  //-------
  const [colorChange, setColorchange] = useState(false);

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

  /* change color on scroll */
  const changeNavbarColor = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY >= 90) {
        setColorchange(true);
      } else {
        setColorchange(false);
      }
    }
  };
  window.addEventListener('scroll', changeNavbarColor);

  useEffect(() => {}, [session?.user]);

  const buttonsCTA = (
    <>
      {session?.user && (
        <>
          <Link href="/orders" className={orders}>
            Orders
          </Link>
          <button onClick={() => signOut()} className={logoutBtn}>
            Logout
          </button>
        </>
      )}
      {!session?.user && (
        <>
          <button onClick={toggleForm} className={`${signupBtn}`}>
            Sign Up
          </button>
          <button onClick={signInHandler} className={signinBtn}>
            SignIn
            <BsGoogle
              style={{
                color: 'black',
                fontSize: '25px',
                cursor: 'pointer',
                marginLeft: '8px',
              }}
            />
          </button>
        </>
      )}
    </>
  );

  return (
    <>
      <Signup isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
      <header
        className={`${header} ${
          colorChange ? 'bg-white' : ''
        } transition-all duration-300`}
      >
        <div className={container}>
          <Link className={logoContainer} href="/">
            Logo
          </Link>

          <nav>
            <ul className="h-16 flex">
              <li>
                <button onClick={() => dispatch(toggleCart())} className={link}>
                  <span>
                    Cart
                    <AiOutlineShoppingCart className="inline-block text-3xl" />
                  </span>
                  <div className={cart}> {totalQuantity} </div>
                </button>
              </li>

              <li className="flex justify-center h-full">{buttonsCTA}</li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
