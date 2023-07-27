import Link from 'next/link';
import footerClassNames from './footerClassName';

const Footer = () => {
  const {
    footer,
    container,
    section,
    sectionLink,
    section1,
    section1Heading,
    section1Content,
    section2,
    section2Heading,
    section2Content,
    section2ul,
    section3,
    section3Heading,
    section3Content,
  } = footerClassNames;

  return (
    <footer className={footer}>
      <div className={container}>
        <div className={section}>
          {/* section1 */}
          <div className={section1}>
            <h2 className={section1Heading}>LOGO</h2>
            <p className={section1Content}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              repudiandae.
            </p>
          </div>
          {/* section2 */}
          <div className={section2}>
            <h2 className={section2Heading}>About Us</h2>
            <ul className={section2ul}>
              <li>
                <Link className={sectionLink} href="#">
                  Careers
                </Link>
              </li>
              <li>
                <Link className={sectionLink} href="#">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          {/* section3 */}
          <div className={section3}>
            <h2 className={section3Heading}>LOGO</h2>
            <p className={section3Content}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
              repudiandae.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
