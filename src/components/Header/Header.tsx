'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import headerClassNames from './headerClassName';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
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
          <button onClick={toggleForm} className={`${signupBtn} ml-1`}>
            Sign Up
          </button>
          <button onClick={signInHandler} className={signinBtn}>
            SignIn
            <FcGoogle
              style={{
                fontSize: '25px',
                cursor: 'pointer',
                marginLeft: '12px',
              }}
              className={link}
            />
          </button>
        </>
      )}
    </>
  );

  return (
    <>
      <Signup isSignupFormOpen={isSignupFormOpen} toggleForm={toggleForm} />
      <header className={header}>
        <div className={container}>
          <Link className={logoContainer} href="/">
            Logo
          </Link>

          <nav className={nav}>
            <ul className={ul}>
              <li>
                <button onClick={() => dispatch(toggleCart())} className={link}>
                  <span>
                    Cart
                    <AiOutlineShoppingCart className="inline-block text-3xl" />
                  </span>
                  <div className={cart}> {totalQuantity} </div>
                </button>
              </li>

              <li className="flex items-center justify-center h-7">
                {buttonsCTA}
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
