import { Helmet } from 'react-helmet';
import { FaShoppingCart, FaExternalLinkSquareAlt } from 'react-icons/fa';

import { getAllCourses, getPlatformById } from 'lib/courses';
import { sortByKey } from 'lib/util';
import { getRouteByName } from 'lib/routes';
import { getSpaceJellyOgPageUrl } from 'lib/cloudinary';
import { WebsiteJsonLd } from 'lib/json-ld';

import Layout from 'components/Layout';
import Header from 'components/Header';
import Section from 'components/Section';
import Container from 'components/Container';
import Posts from 'components/Posts';
import Image from 'components/Image';
import Button from 'components/Button';

import styles from 'styles/pages/Courses.module.scss';

export default function Store({ courses }) {
  const title = 'Courses';
  const metaDescription = 'Learn web tech from the Space Jelly Commander himself, Colby Fayock.';

  const ogImage = getSpaceJellyOgPageUrl({
    headline: title,
  });

  const coursesSorted = sortByKey(courses, 'title');

  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:width" content="2024" />
        <meta property="og:image:height" content="1012" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={ogImage} />
      </Helmet>

      <Header className={styles.header}>
        <h1>{title}</h1>
      </Header>

      <Section>
        <Container>
          <h2 className="sr-only">Courses</h2>
          <ul className={styles.courses}>
            {coursesSorted.map((course) => {
              const { courseLink, title, id, featuredImage = {}, platformid } = course;
              const platform = getPlatformById(platformid);
              return (
                <li key={id}>
                  <a href={courseLink} className={styles.course} rel="noreferrer">
                    {featuredImage && (
                      <Image className={styles.courseImage} {...featuredImage} src={featuredImage.sourceUrl} />
                    )}
                    <div className={styles.courseDetails}>
                      <h3 className={styles.courseTitle}>{title}</h3>
                      {platform && <p className={styles.courseAvailableOn}>Available via {platform.name}</p>}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <WebsiteJsonLd siteTitle={title} />
    </Layout>
  );
}

export async function getStaticProps({ params = {} } = {}) {
  const { courses } = await getAllCourses();

  return {
    props: {
      courses,
    },
  };
}
