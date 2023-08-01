import NextTopLoader from 'nextjs-toploader';

const NextProgress = () => {
  return (
    <>
      <NextTopLoader
        color="black"
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        easing="ease"
        speed={200}
        showSpinner={false}
      />
    </>
  );
};

export default NextProgress;
