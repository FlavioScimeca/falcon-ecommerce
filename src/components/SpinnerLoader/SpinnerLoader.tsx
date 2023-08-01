'use client';

import ClipLoader from 'react-spinners/ClipLoader';

const SpinnerLoader = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <ClipLoader
        color="black"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default SpinnerLoader;
