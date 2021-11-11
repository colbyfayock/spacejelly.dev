import visit from 'unist-util-visit';
import unified from 'unified';
import parse from 'rehype-parse';
import stringify from 'rehype-stringify';
import parameterize from 'parameterize';

const CLOUDINARY_HOST = 'res.cloudinary.com';

/**
 * transformHtml
 * @example
 * transformHtml({
 *   html: content,
 *   transform: (node) => {
 *     console.log('node', node);
 *   },
 *   test: node => node.tagName === 'h2'
 * })
 */

export function transformHtml({ html, transform, test }) {
  return (
    unified()
      .use(parse, {
        fragment: true,
      })
      // Fix img srcset that collides with Cloudinary ,'s
      .use(() => {
        return (tree) => {
          visit(tree, testNodeIsImage(), (node) => {
            const { properties } = node;

            if (!properties.src.includes(CLOUDINARY_HOST)) return;

            let srcSet = properties.srcSet.join(',').split(`,https://${CLOUDINARY_HOST}`);

            srcSet[0] = srcSet[0].replace(`https://${CLOUDINARY_HOST}`, '');

            srcSet = srcSet.map((set) => `https://${CLOUDINARY_HOST}${set.replace(',', '%2C')}`);

            node.properties.srcSet = srcSet;
          });
          return;
        };
      })
      .use(() => {
        return (tree) => {
          visit(tree, test, transform);
          return;
        };
      })
      .use(stringify)
      .processSync(html)
      .toString()
  );
}

/**
 * addIdsToHeadersHtml
 * @example
 * addIdsToHeadersHtml({
 *   html: content,
 *   headers: ['h2', 'h3']
 * })
 */

export function addIdsToHeadersHtml({ html, headers = ['h1', 'h2'] }) {
  return transformHtml({
    html,
    transform: (node) => {
      if (node.children[0].type === 'text') {
        const id = parameterize(node.children[0].value);
        node.properties.id = id;
      }
    },
    test: testNodeInHeaders(headers),
  });
}

/**
 * asdf
 */

export function getHeadersAnchorsFromHtml({ html, headers = ['h2'] }) {
  const nodes = [];

  unified()
    .use(parse, {
      fragment: true,
    })
    .use(() => {
      return (tree) => {
        visit(tree, testNodeInHeaders(headers), function (node) {
          nodes.push(node);
        });
        return;
      };
    })
    .use(stringify)
    .processSync(html);

  return nodes.map((node) => {
    return {
      anchor: node.properties.id,
      title: node.children[0].value,
    };
  });
}

/**
 * testNodeInHeaders
 */

export function testNodeInHeaders(headers) {
  return (node) => headers.includes(node.tagName);
}

/**
 * testNodeIsImage
 */

export function testNodeIsImage() {
  return (node) => node.tagName === 'img';
}

/**
 * getUrlParamsFromString
 */

export function getUrlParamsFromString(string) {
  let url;

  try {
    url = new URL(string);
  } catch (e) {
    throw new Error(`Failed to get URL params from string: ${e.message}`);
  }

  const params = new URLSearchParams(url.search);

  return Array.from(params.keys()).map((key) => {
    return {
      key,
      value: params.get(key),
    };
  });
}
