import ClassName from 'models/classname';

import PostCard from 'components/PostCard';

import styles from './Posts.module.scss';

const Posts = ({ children, className, posts = [], ...rest }) => {
  const postsClassName = new ClassName(styles.posts);

  postsClassName.addIf(className, className);

  return (
    <ul className={postsClassName.toString()} {...rest}>
      {posts.map((post) => {
        return (
          <li key={post.slug}>
            <PostCard post={post} />
          </li>
        );
      })}
    </ul>
  );
};

export default Posts;
