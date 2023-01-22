import { useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { FaTwitter, FaYoutube } from 'react-icons/fa';

import useSite from 'hooks/use-site';
import useSearch from 'hooks/use-search';
import { postPathBySlug } from 'lib/posts';
import { getRouteByName } from 'lib/routes';
import { categoryPathBySlug } from 'lib/categories';

import Section from 'components/Section';
import Container from 'components/Container';
import Input from 'components/Input';
import SpaceJelly from 'components/SpaceJelly';

import styles from './Nav.module.scss';

const Nav = () => {
  const formRef = useRef();

  const { categories } = useSite();

  const { query, results, search, clearSearch } = useSearch({
    maxResults: 5,
  });

  const hasResults = results.length > 0;

  // When we have results, we want to add an event listener that allows us to
  // detect when someone clicks outside of the search box, allowing us to close the results
  // when focus is drawn away from search

  useEffect(() => {
    addDocumentOnClick();
    addResultsRoving();
    return () => {
      removeResultsRoving();
      removeDocumentOnClick();
    };
  }, [hasResults]);

  /**
   * addDocumentOnClick
   */

  function addDocumentOnClick() {
    document.body.addEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * removeDocumentOnClick
   */

  function removeDocumentOnClick() {
    document.body.removeEventListener('click', handleOnDocumentClick, true);
  }

  /**
   * handleOnDocumentClick
   */

  function handleOnDocumentClick(e) {
    if (!e.composedPath().includes(formRef.current)) {
      clearSearch();
    }
  }

  /**
   * handleOnSearch
   */

  function handleOnSearch({ currentTarget }) {
    search({
      query: currentTarget.value,
    });
  }

  /**
   * addResultsRoving
   */

  function addResultsRoving() {
    document.body.addEventListener('keydown', handleResultsRoving);
  }

  /**
   * removeResultsRoving
   */

  function removeResultsRoving() {
    document.body.removeEventListener('keydown', handleResultsRoving);
  }

  /**
   * handleResultsRoving
   */

  function handleResultsRoving(e) {
    const focusElement = document.activeElement;
    const { nodeName, nextSibling, parentElement } = focusElement || {};

    if (!hasResults) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (nodeName === 'INPUT' && nextSibling?.children[0].nodeName !== 'P') {
        nextSibling.children[0].firstChild.firstChild.focus();
      } else if (parentElement.nextSibling) {
        parentElement.nextSibling.firstChild.focus();
      } else {
        parentElement.parentElement.firstChild.firstChild.focus();
      }
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (nodeName === 'A' && parentElement.previousSibling) {
        parentElement.previousSibling.firstChild.focus();
      } else {
        parentElement.parentElement.lastChild.firstChild.focus();
      }
    }
  }

  /**
   * escFunction
   */

  // pressing esc while search is focused will close it

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      clearSearch();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <Section className={styles.navPrimary}>
        <Container>
          <div className={styles.navBar}>
            <div className={`${styles.navBarSection} ${styles.navBarSectionLogo}`}>
              <p className={styles.navName}>
                <Link href={getRouteByName('home')?.path}>
                  <SpaceJelly />
                  <span className="sr-only">Space Jelly</span>
                </Link>
              </p>
            </div>
            <div className={`${styles.navBarSection} ${styles.navBarSectionSearch}`}>
              <form className={styles.navSearch} ref={formRef} action="/search" data-search-is-active={!!query}>
                <label className="sr-only" htmlFor="search-query">
                  Search Query
                </label>
                <Input
                  id="search-query"
                  type="search"
                  name="q"
                  value={query || ''}
                  onChange={handleOnSearch}
                  autoComplete="off"
                  aria-label="Enter your search query"
                  placeholder="Search..."
                  required
                />
                <div className={styles.navSearchResults}>
                  {results.length > 0 && (
                    <ul>
                      {results.map(({ slug, title }, index) => {
                        return (
                          <li key={slug}>
                            <Link tabIndex={index} href={postPathBySlug(slug)}>
                              {title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {results.length === 0 && (
                    <p>
                      Sorry, not finding anything for <strong>{query}</strong>
                    </p>
                  )}
                </div>
              </form>
            </div>
            <div className={`${styles.navBarSection} ${styles.navBarSectionLinks}`}>
              <ul className={styles.navBarLinks}>
                <li>
                  <Link href={getRouteByName('courses')?.path}>Courses</Link>
                </li>
                <li>
                  <Link href={getRouteByName('books')?.path}>Books</Link>
                </li>
                <li>
                  <Link href={getRouteByName('store')?.path}>Store</Link>
                </li>
              </ul>
              <ul className={styles.navBarLinks}>
                <li>
                  <a href="https://www.youtube.com/colbyfayock" target="_blank" rel="noopener">
                    <FaYoutube />
                    <span className="sr-only">YouTube</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.twitter.com/colbyfayock" target="_blank" rel="noopener">
                    <FaTwitter />
                    <span className="sr-only">Twitter</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section className={styles.navSecondary}>
        <Container className={styles.navSecondaryContainer}>
          <div className={styles.navBarSection}>
            <ul className={styles.navBarLinks}>
              {categories.map(({ name, slug }) => {
                return (
                  <li key={name}>
                    <Link href={categoryPathBySlug(slug)}>{name}</Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </Section>
    </nav>
  );
};

export default Nav;
