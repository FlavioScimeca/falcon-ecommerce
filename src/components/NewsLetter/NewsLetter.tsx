const NewsLetter = () => {
  return (
    <section className={newsletterSectionClasses.container}>
      <h2 className={newsletterSectionClasses.heading}>Stay in the Loop</h2>
      <p className={newsletterSectionClasses.subHeading}>
        Subscribe to Our Newsletter for Exclusive Game Updates, Offers, and
        Tips.
      </p>

      <div className={newsletterSectionClasses.cardContainer}>
        <div className={newsletterSectionClasses.cardLeft}>
          <h3 className={newsletterSectionClasses.cardHeading}>
            Sign Up for Our Newsletter
          </h3>
          <p className={newsletterSectionClasses.cardSubHeading}>
            Get the latest news and updates delivered straight to your inbox.
          </p>
        </div>
        <form className={newsletterSectionClasses.formContainer}>
          <input
            type="email"
            placeholder="Enter your email"
            className={newsletterSectionClasses.inputField}
          />
          <button type="button" className={newsletterSectionClasses.button}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;

const newsletterSectionClasses = {
  container: 'px-4 py-[150px] md:px-36 ',
  heading: 'text-2xl md:text-4xl font-bold mb-3 md:mb-5',
  subHeading: 'text-base md:text-lg mb-6 md:mb-10',
  cardContainer:
    'py-8 px-6 md:py-10 md:px-14 bg-zinc-700 mx-auto flex flex-col md:flex-row justify-between items-center',
  cardLeft: 'flex-1 md:mr-8 mb-6 md:mb-0',
  cardHeading: 'text-lg md:text-2xl font-bold mb-2 text-white',
  cardSubHeading: 'text-sm md:text-base text-gray-300 mb-4',
  formContainer:
    'w-full md:w-1/2 flex flex-col md:flex-row items-center overflow-hidden',
  inputField: 'w-full md:w-3/4 py-3 px-4 text-gray-700',
  button:
    'border border-white bg-green-700 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 md:ml-4 mt-4 md:mt-0',
};
