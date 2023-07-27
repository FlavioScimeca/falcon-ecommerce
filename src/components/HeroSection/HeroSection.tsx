import { FC } from 'react';
import heroSectionClassNames from './heroSectionClassName';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection: FC<{ showLink?: boolean }> = ({ showLink }) => {
  return (
    <section className={heroSectionClassNames.hero}>
      <div className={heroSectionClassNames.grid}>
        <div className={heroSectionClassNames.content}>
          <h1 className={heroSectionClassNames.heading}>Gaming</h1>
          <h1 className={heroSectionClassNames.ctaText}>
            Lorem ipsum dolor sit amet.
          </h1>
          <p className={heroSectionClassNames.paragraph}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            magni delectus quam.
          </p>
          {showLink && (
            <div className="mt-8 sm:mt-10 rounded">
              <Link
                href="#recent-games"
                className={heroSectionClassNames.button}
              >
                Find Games
              </Link>
            </div>
          )}
        </div>

        <div className={heroSectionClassNames.imageContainer}>
          <Image
            src="/images/blackSofa-img-1.jpg"
            alt="Black classic sofa"
            width={400}
            height={400}
            style={{
              objectFit: 'contain',
            }}
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
