'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col space-y-5 h-[90vh] justify-center items-center">
      <h2 className="text-3xl">Not Found</h2>
      <p>Could not find requested resource</p>
      <Link className="p-3 m-3 bg-black text-white rounded-xl" href="/">
        Return Home
      </Link>
    </div>
  );
}
