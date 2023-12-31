'use client'; // Error components must be Client Components

import Link from 'next/link';

export default function Error() {
  return (
    <div className="flex flex-col space-y-5 h-[90vh] justify-center items-center">
      <h2 className="text-3xl">Error!</h2>
      <p>Something went wrong try later</p>
      <Link className="p-3 m-3 bg-black text-white rounded-xl" href="/">
        Return Home
      </Link>
    </div>
  );
}
