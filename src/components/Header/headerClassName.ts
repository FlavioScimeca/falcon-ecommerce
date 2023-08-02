const headerClassNames = {
  header:
    'fixed w-full top-0 left-0 z-20 border-b-[2px] border-black text-black',
  container: 'mx-auto flex items-center justify-between',
  logoContainer: 'flex items-center',
  logo: 'font-bold text-xl hover:text-primary-light',
  nav: '',
  ul: '',
  li: '',
  link: 'hover:bg-zinc-100 relative font-bold w-20 md:w-28 h-full border-r-[1px] border-l-[1px] border-black flex items-center justify-center text-xs md:text-sm',
  cart: 'absolute inline-flex items-center justify-center w-5 md:w-6 h-5 md:h-6 md:text-xs font-bold border-2 border-black rounded-full top-2 -right-0 md:right-2 text-xs md:text-sm',
  contactUs: 'px-6 rounded-md bg-primary hover:bg-primary-dark',
  orders:
    'hover:bg-zinc-100 border-black h-full font-bold w-20 md:w-28 text-xs md:text-sm flex items-center justify-center',
  signupBtn:
    'hover:bg-zinc-100 font-bold border-black h-full w-20 md:w-28 text-xs md:text-sm',
  signinBtn:
    'hover:bg-zinc-100 font-bold border-r-[1px] border-l-[1px] border-black h-full w-20 md:w-28 flex items-center justify-center text-xs md:text-sm',
  logoutBtn:
    'bg-red-600 hover:bg-red-500 font-bold border-r-[1px] border-l-[1px] border-black h-full w-20 md:w-28 text-xs md:text-sm',
};

export default headerClassNames;
