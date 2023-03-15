import { getAllCourses, getPlatformById } from 'lib/courses';
import { sortByKey } from 'lib/util';

import TemplateProductListing from 'templates/product-listing';

export default function Courses({ courses }) {
  const coursesSorted = sortByKey(courses, 'title');

  const products = coursesSorted.map((course) => {
    const platform = getPlatformById(course.platformid);

    const product = {
      id: course.id,
      image: {
        url: course.featuredImage.sourceUrl,
        width: course.featuredImage.mediaDetails.width,
        height: course.featuredImage.mediaDetails.height,
      },
      title: course.title,
      link: course.courseLink,
      action: {
        text: `Watch on ${platform.name}`,
        type: 'button',
      },
    };

    if (platform.type === 'email') {
      product.action.text = `Sign Up Free`;
    }

    return product;
  });

  return (
    <TemplateProductListing
      title="Courses"
      metaDescription={`
        Learn Next.js, Stripe, and other web development tools
        with video courses and newsletters from Space Jelly.
      `}
      description={`
        Video and newsletter courses to help you on your
        journey to being productive with the tools
        of the web.
      `}
      products={products}
      slug="courses"
      columns={2}
    />
  );
}

export async function getStaticProps() {
  const { courses } = await getAllCourses();
  return {
    props: {
      courses,
    },
  };
}
