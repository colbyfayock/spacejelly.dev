import { getAllBooks } from 'lib/books';
import { sortByKey } from 'lib/util';

import TemplateProductListing from 'templates/product-listing';

export default function Books({ books }) {
  const booksSorted = sortByKey(books, 'title');

  const products = booksSorted.map((book) => {
    const product = {
      id: book.id,
      image: {
        url: book.featuredImage.sourceUrl,
        width: book.featuredImage.mediaDetails.width,
        height: book.featuredImage.mediaDetails.height,
      },
      title: book.title,
      link: book.booklink,
      action: {
        text: `Start Learning`,
        type: 'button',
      },
    };

    return product;
  });

  return (
    <TemplateProductListing
      title="Books"
      metaDescription={`
        Start building with React and learn everything you
        need to know about the Jamstack with these books
        from Space Jelly.
      `}
      description={`
        Short books to help you learn about the tools of the
        web including the Jamstack and building with React.
      `}
      products={products}
      slug="books"
      columns={2}
    />
  );
}

export async function getStaticProps() {
  const { books } = await getAllBooks();
  return {
    props: {
      books,
    },
  };
}
